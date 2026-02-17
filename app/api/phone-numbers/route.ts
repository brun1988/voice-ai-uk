/**
 * Phone Numbers API
 * 
 * Endpoints for managing UK phone numbers:
 * - GET /api/phone-numbers - List purchased numbers
 * - GET /api/phone-numbers/search - Search available numbers
 * - POST /api/phone-numbers - Purchase a new number
 * - DELETE /api/phone-numbers/[sid] - Release a number
 * 
 * @route /api/phone-numbers
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth"
import { searchUKNumbers, purchaseNumber, getAllNumbers, releaseNumber } from '@/lib/twilio'

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
    
    return NextResponse.json({ numbers })
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
 * Body: { phoneNumber: string }
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

    // Purchase the number via Twilio
    const purchased = await purchaseNumber(phoneNumber)

    // TODO: Store in database linked to user/agent
    // const prisma = (await import('@/lib/prisma')).default
    // await prisma.phoneNumber.create({
    //   data: {
    //     sid: purchased.sid,
    //     phoneNumber: purchased.phoneNumber,
    //     userId: session.user.id,
    //     agentId,
    //     voiceUrl: purchased.voiceUrl,
    //   }
    // })

    return NextResponse.json({
      success: true,
      number: purchased,
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
 * DELETE /api/phone-numbers/[sid]
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

    if (!sid) {
      return NextResponse.json(
        { error: 'Phone number SID is required' },
        { status: 400 }
      )
    }

    // Release the number via Twilio
    await releaseNumber(sid)

    // TODO: Update database
    // const prisma = (await import('@/lib/prisma')).default
    // await prisma.phoneNumber.update({
    //   where: { sid },
    //   data: { status: 'released' }
    // })

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
