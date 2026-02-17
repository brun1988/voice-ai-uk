/**
 * Webhook System
 * 
 * Send call data to external systems:
 * - CRMs (HubSpot, Pipedrive)
 * - Marketing (Mailchimp)
 * - Custom webhooks
 * 
 * @module lib/webhooks
 */

interface WebhookPayload {
  event: 'call.started' | 'call.ended' | 'lead.qualified' | 'booking.created'
  timestamp: string
  data: Record<string, any>
}

/**
 * Send webhook to URL
 */
async function sendWebhook(url: string, payload: WebhookPayload) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VoiceAI-UK/1.0',
      },
      body: JSON.stringify(payload),
    })

    return {
      success: response.ok,
      status: response.status,
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return {
      success: false,
      error: String(error),
    }
  }
}

/**
 * CRM Integrations
 */

export class HubSpot {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Create contact from lead
   */
  async createContact(data: {
    email: string
    firstName: string
    lastName?: string
    phone?: string
    properties?: Record<string, string>
  }) {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: data.firstName,
          lastname: data.lastName || '',
          phone: data.phone || '',
          ...data.properties,
        },
      }),
    })

    return response.json()
  }

  /**
   * Create deal from qualified lead
   */
  async createDeal(data: {
    name: string
    amount?: number
    stage?: string
    contactId?: string
  }) {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          dealname: data.name,
          amount: data.amount?.toString() || '',
          dealstage: data.stage || 'appointmentscheduled',
          pipeline: 'default',
        },
        associations: data.contactId
          ? [
              {
                to: { id: data.contactId },
                types: [
                  {
                    associationCategory: 'HUBSPOT_DEFINED',
                    associationTypeId: 3, // Contact to Deal
                  },
                ],
              },
            ]
          : undefined,
      }),
    })

    return response.json()
  }

  /**
   * Log call activity
   */
  async logCall(contactId: string, callData: {
    outcome?: string
    notes?: string
    duration?: number
  }) {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/calls', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          hs_call_body: callData.notes || '',
          hs_call_outcome: callData.outcome || '',
          hs_call_duration_ms: (callData.duration || 0) * 1000,
          hs_timestamp: new Date().toISOString(),
        },
        associations: [
          {
            to: { id: contactId },
            types: [
              {
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: 44, // Contact to Call
              },
            ],
          },
        ],
      }),
    })

    return response.json()
  }
}

export class Pipedrive {
  private apiToken: string

  constructor(apiToken: string) {
    this.apiToken = apiToken
  }

  /**
   * Create person
   */
  async createPerson(data: {
    name: string
    email?: string
    phone?: string
  }) {
    const response = await fetch('https://api.pipedrive.com/v1/persons', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  /**
   * Create deal
   */
  async createDeal(data: {
    title: string
    value?: number
    currency?: string
    personId?: number
    stageId?: string
  }) {
    const response = await fetch('https://api.pipedrive.com/v1/deals', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        pipeline: 'default',
      }),
    })

    return response.json()
  }

  /**
   * Add note to deal
   */
  async addNote(dealId: number, content: string) {
    const response = await fetch('https://api.pipedrive.com/v1/notes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deal_id: dealId,
        content,
      }),
    })

    return response.json()
  }
}

/**
 * Process webhook events from voice calls
 */
export async function processWebhookEvents(
  webhooks: { url: string; events: string[] }[],
  event: WebhookPayload
) {
  const results = await Promise.all(
    webhooks
      .filter((w) => w.events.includes(event.event))
      .map((w) => sendWebhook(w.url, event))
  )

  return results
}

/**
 * Send lead to CRM
 */
export async function sendLeadToCRM(
  crmType: 'hubspot' | 'pipedrive' | 'webhook',
  config: any,
  leadData: {
    name: string
    email?: string
    phone: string
    source?: string
    notes?: string
    qualification?: Record<string, any>
  }
) {
  switch (crmType) {
    case 'hubspot': {
      const hubspot = new HubSpot(config.apiKey)
      const contact = await hubspot.createContact({
        firstName: leadData.name,
        email: leadData.email || '',
        phone: leadData.phone,
      })

      if (leadData.qualification) {
        await hubspot.createDeal({
          name: `${leadData.name} - ${leadData.source || 'Voice AI'}`,
          contactId: contact.id,
        })
      }

      return contact
    }

    case 'pipedrive': {
      const pipedrive = new Pipedrive(config.apiToken)
      const person = await pipedrive.createPerson({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
      })

      if (leadData.qualification) {
        await pipedrive.createDeal({
          title: `${leadData.name} - ${leadData.source || 'Voice AI'}`,
          personId: person.data.id,
        })
      }

      return person
    }

    case 'webhook':
      return sendWebhook(config.url, {
        event: 'lead.qualified',
        timestamp: new Date().toISOString(),
        data: leadData,
      })

    default:
      throw new Error(`Unknown CRM type: ${crmType}`)
  }
}
