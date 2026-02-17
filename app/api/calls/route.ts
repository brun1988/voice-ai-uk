// Call Logs API
// Fetches call logs for the authenticated user's tenant

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

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

    // Parse query params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const agentId = searchParams.get('agentId')
    const status = searchParams.get('status')

    // Build where clause
    const where: any = {
      tenantId: user.tenantId
    }

    if (agentId) {
      where.agentId = agentId
    }

    if (status) {
      where.status = status
    }

    // Fetch call logs with related data
    const calls = await prisma.callLog.findMany({
      where,
      include: {
        agent: {
          select: {
            id: true,
            name: true
          }
        },
        phoneNumber: {
          select: {
            id: true,
            number: true
          }
        }
      },
      orderBy: {
        startedAt: 'desc'
      },
      take: limit,
      skip: offset
    })

    // Get total count
    const total = await prisma.callLog.count({ where })

    return NextResponse.json({
      calls,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + calls.length < total
      }
    })

  } catch (error) {
    console.error('Error fetching call logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch call logs' },
      { status: 500 }
    )
  }
}
