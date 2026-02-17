/**
 * Voice Webhook API
 * 
 * Handles incoming calls from Twilio and connects to Vapi for AI voice.
 * 
 * This is the endpoint Twilio calls when:
 * 1. An incoming call is received on your UK number
 * 2. The call needs to be connected to the AI agent
 * 
 * Flow:
 * 1. Twilio receives call to your +44 number
 * 2. Twilio makes POST to this webhook
 * 3. This endpoint returns TwiML to connect to Vapi
 * 4. Vapi handles the AI conversation
 * 5. Call events are logged to database
 * 
 * @route POST /api/voice/webhook
 */

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/voice/webhook
 * 
 * Twilio sends:
 * - CallSid: Unique call ID
 * - From: Caller's phone number
 * - To: Your phone number
 * 
 * Returns TwiML to connect to Vapi
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    const callSid = formData.get('CallSid') as string
    const from = formData.get('From') as string
    const to = formData.get('To') as string

    console.log(`Incoming call: ${callSid} from ${from} to ${to}`)

    // Find the phone number in our database
    const phoneNumber = await prisma.phoneNumber.findFirst({
      where: { number: to },
      include: {
        agent: true,
        tenant: true,
      },
    })

    if (!phoneNumber || !phoneNumber.agentId) {
      // No agent configured - play a message
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Sorry, no one is available to take your call. Please try again later.</Say>
</Response>`,
        { headers: { 'Content-Type': 'text/xml' } }
      )
    }

    // Get the agent's greeting
    const greeting = phoneNumber.agent.greeting || 'Hello, how can I help you today?'

    // Get Vapi configuration
    const vapiEndpoint = process.env.VAPI_WEBHOOK_URL || 'https://api.vapi.ai'
    const vapiToken = process.env.VAPI_API_KEY

    // Store the call in database
    const call = await prisma.callLog.create({
      data: {
        callSid,
        tenantId: phoneNumber.tenantId,
        agentId: phoneNumber.agentId,
        phoneNumberId: phoneNumber.id,
        callerNumber: from,
        direction: 'inbound',
        status: 'ringing',
        startedAt: new Date(),
      },
    })

    console.log(`Call logged: ${call.id}`)

    // Return TwiML to connect to Vapi
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>${greeting}</Say>
  <Connect>
    <Agent
      url="${vapiEndpoint}/call"
      generator-credentials="${vapiToken}"
    />
  </Connect>
</Response>`

    return new NextResponse(twiml, {
      headers: { 'Content-Type': 'text/xml' },
    })

  } catch (error) {
    console.error('Voice webhook error:', error)
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>An error occurred. Please try again later.</Say>
</Response>`,
      { headers: { 'Content-Type': 'text/xml' } }
    )
  }
}

/**
 * GET /api/voice/webhook
 * 
 * Twilio verifies the webhook URL on initial setup
 */
export async function GET() {
  return new NextResponse('Voice webhook OK', { status: 200 })
}
