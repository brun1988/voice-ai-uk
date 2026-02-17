/**
 * Agent API Routes
 * 
 * CRUD operations for AI agents
 * 
 * GET    /api/agents         - List all agents
 * POST   /api/agents         - Create new agent
 * GET    /api/agents/[id]    - Get single agent
 * PATCH  /api/agents/[id]    - Update agent
 * DELETE /api/agents/[id]     - Delete agent
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/agents
 * 
 * List all agents for the current tenant
 */
export async function GET() {
  const session = await getServerSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const tenantId = (session.user as any).tenantId
  
  const agents = await prisma.agent.findMany({
    where: { tenantId },
    include: {
      _count: {
        select: { calls: true }
      },
      phoneNumbers: true,
    },
    orderBy: { createdAt: 'desc' },
  })
  
  return NextResponse.json({ agents })
}

/**
 * POST /api/agents
 * 
 * Create a new agent
 * 
 * Request body:
 * {
 *   name: string,
 *   description?: string,
 *   template?: string (real_estate, restaurant, healthcare, custom)
 * }
 */
export async function POST(request: Request) {
  const session = await getServerSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const tenantId = (session.user as any).tenantId
  const body = await request.json()
  
  const { name, description, template } = body
  
  if (!name) {
    return NextResponse.json(
      { error: 'Agent name is required' },
      { status: 400 }
    )
  }
  
  // Get default greeting based on template
  const greetings: Record<string, string> = {
    real_estate: "Hello, thank you for calling. This is your AI assistant. How may I help you today?",
    restaurant: "Hello, thank you for calling. You've reached [Restaurant Name]. How can I assist you?",
    healthcare: "Hello, thank you for calling. You've reached [Practice Name]. How may I help you today?",
    custom: "Hello, thank you for calling. How may I help you today?",
  }
  
  const agent = await prisma.agent.create({
    data: {
      name,
      description,
      template: template || 'custom',
      greeting: greetings[template || 'custom'],
      tenantId,
    },
  })
  
  return NextResponse.json({ agent }, { status: 201 })
}
