// Settings API
// Handles tenant and user settings

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// GET: Fetch settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { tenant: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return non-sensitive data
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role
      },
      tenant: {
        id: user.tenant.id,
        name: user.tenant.name,
        slug: user.tenant.slug
      }
    })

  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// PATCH: Update settings
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { user: userUpdates, tenant: tenantUpdates, currentPassword, newPassword } = body

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { tenant: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user profile
    if (userUpdates) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: userUpdates.name ?? user.name,
          image: userUpdates.image ?? user.image
        }
      })
    }

    // Update password if provided
    if (newPassword && currentPassword) {
      // Verify current password
      if (!user.password) {
        return NextResponse.json(
          { error: 'No password set for this account' },
          { status: 400 }
        )
      }

      const isValid = await bcrypt.compare(currentPassword, user.password)
      if (!isValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        )
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12)
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      })
    }

    // Update tenant (business) settings
    if (tenantUpdates && user.role === 'owner') {
      await prisma.tenant.update({
        where: { id: user.tenantId },
        data: {
          name: tenantUpdates.name ?? user.tenant.name
        }
      })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
