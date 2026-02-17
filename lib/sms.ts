/**
 * SMS Notifications
 * 
 * Send SMS via Twilio to:
 * - Confirm bookings
 * - Send reminders
 * - Notify of new leads
 * 
 * @module lib/sms
 */

import twilio from 'twilio'

const client = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null

/**
 * Send SMS message
 * 
 * @param to - Recipient phone number (UK format: +447xxx)
 * @param message - Message body
 */
export async function sendSMS(to: string, message: string) {
  if (!client) {
    console.log('SMS (not sent - Twilio not configured):', { to, message })
    return { success: false, error: 'Twilio not configured' }
  }

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })

    return {
      success: true,
      sid: result.sid,
      status: result.status,
    }
  } catch (error) {
    console.error('SMS error:', error)
    return {
      success: false,
      error: String(error),
    }
  }
}

/**
 * Send booking confirmation SMS
 */
export async function sendBookingSMS(
  to: string,
  customerName: string,
  businessName: string,
  date: Date
) {
  const formatted = date.toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  const message = `Hi ${customerName}, your ${businessName} appointment is confirmed for ${formatted}. Reply CANCEL to cancel.`

  return sendSMS(to, message)
}

/**
 * Send reminder SMS (24h before)
 */
export async function sendReminderSMS(
  to: string,
  customerName: string,
  businessName: string,
  date: Date
) {
  const formatted = date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  const message = `Reminder: ${businessName} tomorrow at ${formatted}. Reply CONFIRM to confirm or CANCEL to cancel.`

  return sendSMS(to, message)
}

/**
 * Send new lead notification to business
 */
export async function sendLeadNotification(
  to: string,
  businessName: string,
  leadName: string,
  leadPhone: string,
  details: string
) {
  const message = `🔔 New lead for ${businessName}: ${leadName} (${leadPhone}) - ${details}`

  return sendSMS(to, message)
}
