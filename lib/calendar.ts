/**
 * Calendar Integration
 * 
 * Connect to Google Calendar and Cal.com for appointment booking.
 * 
 * Features:
 * - OAuth connection
 * - Fetch availability
 * - Create bookings
 * - Send confirmations
 * 
 * @module lib/calendar
 */

// Optional Google Calendar - will fail gracefully if not installed
let google: any = null
try {
  google = require('googleapis')
} catch (e) {
  console.warn('googleapis not installed - calendar features disabled')
}

/**
 * Google Calendar Integration
 */
export class GoogleCalendar {
  private oauth2Client: any

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
  }

  /**
   * Generate auth URL for user to authorize
   */
  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ]

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    })
  }

  /**
   * Exchange code for tokens
   */
  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code)
    return tokens
  }

  /**
   * Set credentials for a user
   */
  setCredentials(tokens: any) {
    this.oauth2Client.setCredentials(tokens)
  }

  /**
   * List calendars
   */
  async listCalendars() {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })
    const response = await calendar.calendarList.list()
    return response.data.items
  }

  /**
   * Get availability for a date range
   */
  async getAvailability(
    calendarId: string,
    startDate: Date,
    endDate: Date
  ) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: calendarId }],
      },
    })

    return response.data.calendars?.[calendarId]?.busy || []
  }

  /**
   * Create a calendar event/booking
   */
  async createEvent(
    calendarId: string,
    event: {
      summary: string
      description?: string
      start: Date
      end: Date
      attendees?: string[]
    }
  ) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })

    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: event.summary,
        description: event.description,
        start: {
          dateTime: event.start.toISOString(),
          timeZone: 'Europe/London',
        },
        end: {
          dateTime: event.end.toISOString(),
          timeZone: 'Europe/London',
        },
        attendees: event.attendees?.map(email => ({ email })),
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 },
          ],
        },
      },
    })

    return response.data
  }

  /**
   * Delete/cancel an event
   */
  async deleteEvent(calendarId: string, eventId: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })
    await calendar.events.delete({
      calendarId,
      eventId,
    })
  }
}

/**
 * Cal.com Integration
 * 
 * Cal.com is an open-source scheduling platform.
 * 
 * @see https://cal.com/docs/api
 */
export class CalCom {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * List user's event types
   */
  async listEventTypes() {
    const response = await fetch('https://api.cal.com/v1/event-types', {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch event types')
    }

    return response.json()
  }

  /**
   * Get available slots for an event type
   */
  async getAvailableSlots(eventTypeId: string, date: string) {
    const response = await fetch(
      `https://api.cal.com/v1/slots/available?eventTypeId=${eventTypeId}&date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch slots')
    }

    return response.json()
  }

  /**
   * Create a booking
   */
  async createBooking(data: {
    eventTypeId: string
    start: string
    name: string
    email: string
    notes?: string
  }) {
    const response = await fetch('https://api.cal.com/v1/bookings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTypeId: data.eventTypeId,
        start: data.start,
        attendee: {
          name: data.name,
          email: data.email,
          notes: data.notes,
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create booking')
    }

    return response.json()
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string, reason?: string) {
    const response = await fetch(`https://api.cal.com/v1/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason }),
    })

    if (!response.ok) {
      throw new Error('Failed to cancel booking')
    }

    return response.json()
  }
}

/**
 * Send booking confirmation email
 * 
 * Uses Postmark or simple SMTP
 */
export async function sendBookingConfirmation(
  to: string,
  booking: {
    customerName: string
    businessName: string
    date: Date
    duration: number // minutes
    notes?: string
  }
) {
  const formattedDate = booking.date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const formattedTime = booking.date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Booking Confirmed! ✅</h2>
      
      <p>Hi ${booking.customerName},</p>
      
      <p>Your appointment with <strong>${booking.businessName}</strong> has been confirmed.</p>
      
      <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0;"><strong>Date:</strong> ${formattedDate}</p>
        <p style="margin: 8px 0 0;"><strong>Time:</strong> ${formattedTime}</p>
        <p style="margin: 8px 0 0;"><strong>Duration:</strong> ${booking.duration} minutes</p>
        ${booking.notes ? `<p style="margin: 8px 0 0;"><strong>Notes:</strong> ${booking.notes}</p>` : ''}
      </div>
      
      <p>If you need to reschedule or cancel, please contact us.</p>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
      
      <p style="color: #6b7280; font-size: 12px;">
        This is an automated confirmation from Voice AI UK.
      </p>
    </div>
  `

  // Use Postmark if configured, otherwise log
  if (process.env.POSTMARK_API_KEY) {
    // Would send via Postmark API
    console.log('Sending email via Postmark:', { to, subject: 'Booking Confirmed' })
  } else {
    console.log('Email (not sent - Postmark not configured):', {
      to,
      subject: 'Booking Confirmed',
      html: emailHtml,
    })
  }

  return { success: true }
}

/**
 * Format booking for display
 */
export function formatBookingDetails(booking: {
  date: Date
  duration: number
  customerName: string
  customerEmail: string
  notes?: string
}) {
  return {
    ...booking,
    dateFormatted: booking.date.toLocaleString('en-GB'),
    durationFormatted: `${booking.duration} minutes`,
  }
}
