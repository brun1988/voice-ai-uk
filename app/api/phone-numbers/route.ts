/**
 * Phone Numbers API
 * 
 * Endpoints for managing UK phone numbers:
 * - GET /api/phone-numbers - List purchased numbers
 * - GET /api/phone-numbers/search - Search available numbers
 * - POST /api/phone-numbers - Purchase a new number
 * - DELETE /api/phone-numbers/[sid] - Release a number
 * - PATCH /api/phone-numbers - Update number routing (link to agent)
 * 
 * @route /api/phone-numbers
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { searchUKNumbers, purchaseNumber, getAllNumbers, releaseNumber, configureWebhook } from '@/lib/twilio'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

/**
 * GET /api/phone-numbers
 * 
 * Returns all purchased phone numbers for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    // Search available numbers
    if (action === 'search') {
      const areaCode = searchParams.get('areaCode') || '20'
      const limit = parseInt(searchParams.get('limit') || '10')
      
      const numbers = await searchUKNumbers(areaCode, limit)
      
      return NextResponse.json({ numbers })
    }

    // Get all purchased numbers
    const numbers = await getAllNumbers()
    
    // Get phone numbers from our database with agent info
    const dbNumbers = await prisma.phoneNumber.findMany({
      where: { tenantId: session.user.tenantId },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            status: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    // Merge Twilio data with database data
    const mergedNumbers = numbers.map((num: any) => {
      const dbNum = dbNumbers.find(d => d.sid === num.sid)
      return {
        ...num,
        // Database fields
        id: dbNum?.id,
        tenantId: dbNum?.tenantId,
        agentId: dbNum?.agentId,
        agent: dbNum?.agent,
        createdAt: dbNum?.createdAt,
      }
    })
    
    return NextResponse.json({ numbers: mergedNumbers })
  } catch (error: any) {
    console.error('Error in phone-numbers GET:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch phone numbers' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/phone-numbers
 * 
 * Purchase a new phone number
 * Body: { phoneNumber: string, agentId?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { phoneNumber, agentId } = body

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Get the voice webhook URL
    const baseUrl = process.env.NEXTAUTH_URL || 'https://your-domain.com'
    const voiceWebhookUrl = `${baseUrl}/api/voice/webhook`

    // Purchase the number via Twilio with webhook configured
    const purchased = await purchaseNumber(phoneNumber)

    // Configure the webhook URL so calls route to our voice handler
    if (purchased.sid) {
      await configureWebhook(purchased.sid, voiceWebhookUrl)
    }

    // Store in database linked to user/tenant and optionally to an agent
    const tenantId = session.user.tenantId
    
    // If agentId is provided, verify it belongs to this tenant
    let validAgentId = null
    if (agentId) {
      const agent = await prisma.agent.findFirst({
        where: { id: agentId, tenantId }
      })
      if (agent) {
        validAgentId = agentId
      }
    }

    const dbNumber = await prisma.phoneNumber.create({
      data: {
        number: purchased.phoneNumber,
        sid: purchased.sid,
        tenantId,
        agentId: validAgentId,
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            status: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      number: {
        ...purchased,
        id: dbNumber.id,
        agentId: dbNumber.agentId,
        agent: dbNumber.agent,
      },
    })
  } catch (error: any) {
    console.error('Error in phone-numbers POST:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to purchase phone number' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/phone-numbers
 * 
 * Release a phone number
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const sid = searchParams.get('sid')
    const id = searchParams.get('id') // Our database ID

    if (!sid) {
      return NextResponse.json(
        { error: 'Phone number SID is required' },
        { status: 400 }
      )
    }

    // Release the number via Twilio
    await releaseNumber(sid)

    // Remove from our database
    if (id) {
      await prisma.phoneNumber.delete({
        where: { id }
      }).catch(() => {
        // Ignore if not found in our DB
      })
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error('Error in phone-numbers DELETE:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to release phone number' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/phone-numbers
 * 
 * Update phone number routing (link/unlink agent)
 * Body: { id: string, agentId: string | null }
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, agentId } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Phone number ID is required' },
        { status: 400 }
      )
    }

    const tenantId = session.user.tenantId

    // Verify the phone number belongs to this tenant
    const existingNumber = await prisma.phoneNumber.findFirst({
      where: { id, tenantId }
    })

    if (!existingNumber) {
      return NextResponse.json(
        { error: 'Phone number not found' },
        { status: 404 }
      )
    }

    // If agentId is provided, verify it belongs to this tenant
    let validAgentId: string | null = null
    if (agentId) {
      const agent = await prisma.agent.findFirst({
        where: { id: agentId, tenantId }
      })
      if (agent) {
        validAgentId = agentId
      } else {
        return NextResponse.json(
          { error: 'Agent not found or does not belong to your account' },
          { status: 400 }
        )
      }
    }

    // Update the phone number with the new agent routing
    const updated = await prisma.phoneNumber.update({
      where: { id },
      data: { agentId: validAgentId },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            status: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      number: updated,
    })
  } catch (error: any) {
    console.error('Error in phone-numbers PATCH:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update phone number routing' },
      { status: 500 }
    )
  }
}
