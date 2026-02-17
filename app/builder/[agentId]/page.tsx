/**
 * Agent Builder Page
 * 
 * Create and configure AI voice agents.
 * 
 * Features:
 * - Create new agent from template
 * - Configure voice settings
 * - Build conversation flow
 * - Upload knowledge base
 * - Test agent
 * 
 * @module app/builder/[agentId]/page
 */

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import AgentBuilderClient from './AgentBuilderClient'

/**
 * Server Component - Fetches agent data
 * 
 * @param params.agentId - Agent ID from URL
 */
export default async function AgentBuilderPage({ 
  params 
}: { 
  params: { agentId: string } 
}) {
  // Check auth
  const session = await getServerSession()
  if (!session?.user) {
    redirect('/auth/login')
  }

  // Get agent from database
  const agent = await prisma.agent.findFirst({
    where: {
      id: params.agentId,
      tenantId: (session.user as any).tenantId,
    },
    include: {
      knowledgeBase: true,
      phoneNumbers: true,
    },
  })

  if (!agent) {
    redirect('/dashboard')
  }

  return <AgentBuilderClient agent={agent} />
}
