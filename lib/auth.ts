/**
 * Voice AI UK - Authentication Utilities
 * 
 * Helper functions for authentication:
 * - Create new user with tenant
 * - Validate credentials
 * 
 * @module lib/auth
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Create a new user with tenant
 * Used during registration
 * 
 * @param email - User's email
 * @param password - Plain text password (will be hashed)
 * @param name - User's name
 * @returns Created user and tenant
 */
export async function createUserWithTenant(
  email: string, 
  password: string, 
  name: string
) {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    const error = new Error("User already exists");
    (error as any).code = "P2002";
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create tenant and user in transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create tenant
    const tenant = await tx.tenant.create({
      data: {
        name: `${name}'s Company`,
        slug: email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "") + "-" + Date.now(),
      }
    });

    // Create user
    const user = await tx.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        tenantId: tenant.id,
        role: "owner",
      }
    });

    return { user, tenant };
  });

  return result;
}

/**
 * Validate user credentials
 * 
 * @param email - User's email
 * @param password - Plain text password
 * @returns User if valid, null if invalid
 */
export async function validateCredentials(
  email: string, 
  password: string
) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  if (!user || !user.password) {
    return null;
  }
  
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    return null;
  }
  
  return user;
}

/**
 * Check if email is already taken
 * 
 * @param email - Email to check
 * @returns Boolean
 */
export async function isEmailTaken(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return !!user;
}
