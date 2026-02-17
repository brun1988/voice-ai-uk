/**
 * Twilio Phone Integration
 * 
 * Manages UK phone numbers for AI agents:
 * - Purchase new numbers
 * - Configure for incoming calls
 * - Forward to Vapi for voice AI
 * 
 * UK Numbers: +44 (geographic & toll-free)
 * 
 * @module lib/twilio
 */

import twilio from 'twilio'

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const phoneNumber = process.env.TWILIO_PHONE_NUMBER

// Client instance
const client = accountSid && authToken ? twilio(accountSid, authToken) : null

/**
 * Get available UK phone numbers
 * 
 * @param areaCode - UK area code (e.g., "20" for London)
 * @param limit - Number of results
 * @returns Available phone numbers
 */
export async function searchUKNumbers(areaCode: string = '20', limit: number = 10) {
  if (!client) {
    throw new Error('Twilio not configured')
  }

  try {
    const numbers = await client.availablePhoneNumbers('GB')
      .local.list({
        areaCode: parseInt(areaCode),
        limit,
        smsEnabled: true,
        voiceEnabled: true,
      })

    return numbers.map((num: any) => ({
      phoneNumber: num.phoneNumber,
      locality: num.locality,
      region: num.region,
      postalCode: num.postalCode,
      price: num.monthlyRecurringCost,
    }))
  } catch (error) {
    console.error('Error searching numbers:', error)
    throw error
  }
}

/**
 * Purchase a phone number
 * 
 * @param phoneNumber - The number to purchase (e.g., "+447xxx")
 * @returns Purchased phone number details
 */
export async function purchaseNumber(phoneNumber: string) {
  if (!client) {
    throw new Error('Twilio not configured')
  }

  try {
    const purchased = await client.incomingPhoneNumbers.create({
      phoneNumber,
      voiceUrl: process.env.TWILIO_VOICE_URL || 'https://your-domain.com/api/voice',
      voiceMethod: 'POST',
    })

    return {
      sid: purchased.sid,
      phoneNumber: purchased.phoneNumber,
      voiceUrl: purchased.voiceUrl,
    }
  } catch (error) {
    console.error('Error purchasing number:', error)
    throw error
  }
}

/**
 * Configure webhook URL for incoming calls
 * 
 * @param phoneSid - SID of the phone number
 * @param voiceUrl - URL to handle voice calls
 */
export async function configureWebhook(phoneSid: string, voiceUrl: string) {
  if (!client) {
    throw new Error('Twilio not configured')
  }

  try {
    await client.incomingPhoneNumbers(phoneSid).update({
      voiceUrl,
      voiceMethod: 'POST',
    })
  } catch (error) {
    console.error('Error configuring webhook:', error)
    throw error
  }
}

/**
 * Get all purchased numbers for account
 * 
 * @returns Array of phone numbers
 */
export async function getAllNumbers() {
  if (!client) {
    throw new Error('Twilio not configured')
  }

  try {
    const numbers = await client.incomingPhoneNumbers.list({ limit: 100 })
    return numbers.map((num: any) => ({
      sid: num.sid,
      phoneNumber: num.phoneNumber,
      voiceUrl: num.voiceUrl,
      status: num.status,
    }))
  } catch (error) {
    console.error('Error getting numbers:', error)
    throw error
  }
}

/**
 * Release (delete) a phone number
 * 
 * @param phoneSid - SID of the phone number to release
 */
export async function releaseNumber(phoneSid: string) {
  if (!client) {
    throw new Error('Twilio not configured')
  }

  try {
    await client.incomingPhoneNumbers(phoneSid).remove()
  } catch (error) {
    console.error('Error releasing number:', error)
    throw error
  }
}

/**
 * Handle incoming voice call
 * 
 * This is the webhook endpoint that Twilio calls when:
 * 1. An incoming call is received
 * 2. The call is forwarded to our voice AI (Vapi)
 * 
 * Returns TwiML instructions to transfer to Vapi
 * 
 * @param callSid - Twilio call SID
 * @param to - Phone number being called
 * @param from - Caller's number
 */
export function handleIncomingCall(callSid: string, to: string, from: string) {
  // Vapi configuration
  const vapiEndpoint = process.env.VAPI_WEBHOOK_URL || 'https://api.vapi.ai/call'
  const vapiToken = process.env.VAPI_API_KEY

  // Return TwiML to connect to Vapi
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Agent
      url="${vapiEndpoint}"
      generator-credentials="${vapiToken}"
    />
  </Connect>
</Response>`

  return twiml
}
