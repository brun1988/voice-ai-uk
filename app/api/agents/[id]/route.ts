/**
 * Single Agent API Routes
 * 
 * GET, PATCH, DELETE for specific agent
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/agents/[id]
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const tenantId = (session.user as any).tenantId
  
  const agent = await prisma.agent.findFirst({
    where: {
      id: params.id,
      tenantId,
    },
    include: {
      knowledgeBase: true,
      phoneNumbers: true,
      _count: {
        select: { calls: true }
      },
    },
  })
  
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }
  
  return NextResponse.json({ agent })
}

/**
 * PATCH /api/agents/[id]
 * 
 * Update an agent
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const tenantId = (session.user as any).tenantId
  const body = await request.json()
  
  // Verify ownership
  const existing = await prisma.agent.findFirst({
    where: { id: params.id, tenantId },
  })
  
  if (!existing) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }
  
  const agent = await prisma.agent.update({
    where: { id: params.id },
    data: {
      name: body.name,
      description: body.description,
      greeting: body.greeting,
      voiceId: body.voiceId,
      flowData: body.flowData,
      status: body.status,
    },
  })
  
  return NextResponse.json({ agent })
}

/**
 * DELETE /api/agents/[id]
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const tenantId = (session.user as any).tenantId
  
  // Verify ownership
  const existing = await prisma.agent.findFirst({
    where: { id: params.id, tenantId },
  })
  
  if (!existing) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }
  
  await prisma.agent.delete({
    where: { id: params.id },
  })
  
  return NextResponse.json({ message: 'Agent deleted' })
}
