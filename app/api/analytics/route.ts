// Analytics API
// Provides aggregated analytics data for the dashboard

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Get authenticated session
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's tenant
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { tenant: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // days

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    // Get call statistics
    const [
      totalCalls,
      completedCalls,
      failedCalls,
      voicemails,
      avgDuration,
      callsByDay,
      callsByAgent,
      callsByOutcome
    ] = await Promise.all([
      // Total calls in period
      prisma.callLog.count({
        where: {
          tenantId: user.tenantId,
          startedAt: { gte: startDate }
        }
      }),

      // Completed calls
      prisma.callLog.count({
        where: {
          tenantId: user.tenantId,
          status: 'completed',
          startedAt: { gte: startDate }
        }
      }),

      // Failed calls
      prisma.callLog.count({
        where: {
          tenantId: user.tenantId,
          status: 'failed',
          startedAt: { gte: startDate }
        }
      }),

      // Voicemails
      prisma.callLog.count({
        where: {
          tenantId: user.tenantId,
          status: 'voicemail',
          startedAt: { gte: startDate }
        }
      }),

      // Average call duration
      prisma.callLog.aggregate({
        where: {
          tenantId: user.tenantId,
          status: 'completed',
          startedAt: { gte: startDate },
          duration: { not: null }
        },
        _avg: {
          duration: true
        }
      }),

      // Calls by day (last N days)
      prisma.$queryRaw`
        SELECT DATE(startedAt) as date, COUNT(*) as count
        FROM "CallLog"
        WHERE "tenantId" = ${user.tenantId}
        AND "startedAt" >= ${startDate}
        GROUP BY DATE("startedAt")
        ORDER BY date ASC
      ` as Promise<{ date: Date; count: BigInt }[]>,

      // Calls by agent
      prisma.callLog.groupBy({
        by: ['agentId'],
        where: {
          tenantId: user.tenantId,
          startedAt: { gte: startDate }
        },
        _count: {
          id: true
        }
      }),

      // Calls by outcome
      prisma.callLog.groupBy({
        by: ['outcome'],
        where: {
          tenantId: user.tenantId,
          startedAt: { gte: startDate },
          outcome: { not: null }
        },
        _count: {
          id: true
        }
      })
    ])

    // Get agent names for the by-agent stats
    const agentIds = callsByAgent.map((c: any) => c.agentId)
    const agents = await prisma.agent.findMany({
      where: { id: { in: agentIds } },
      select: { id: true, name: true }
    })
    const agentMap = new Map(agents.map((a: any) => [a.id, a.name]))

    // Format response
    const answerRate = totalCalls > 0 
      ? Math.round(((completedCalls + voicemails) / totalCalls) * 100) 
      : 0

    const analytics = {
      summary: {
        totalCalls,
        completedCalls,
        failedCalls,
        voicemails,
        answerRate,
        avgDurationSeconds: avgDuration._avg.duration || 0
      },
      callsByDay: callsByDay.map((d: any) => ({
        date: d.date.toISOString().split('T')[0],
        count: Number(d.count)
      })),
      callsByAgent: callsByAgent.map((c: any) => ({
        agentId: c.agentId,
        agentName: agentMap.get(c.agentId) || 'Unknown',
        count: c._count.id
      })),
      callsByOutcome: callsByOutcome.map((c: any) => ({
        outcome: c.outcome,
        count: c._count.id
      }))
    }

    return NextResponse.json(analytics)

  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
