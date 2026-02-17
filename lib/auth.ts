/**
 * Voice AI UK - NextAuth Configuration
 * 
 * Centralized NextAuth.js configuration options.
 * Used by both the API route handler and any server-side auth checks.
 * 
 * @module lib/auth
 */

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * NextAuth configuration for Voice AI UK
 * 
 * Features:
 * - Email/password credentials authentication
 * - JWT-based sessions (30 days)
 * - Custom user fields (tenantId, role)
 * - Custom sign-in pages
 */
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { tenant: true }
        });

        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return user data for session
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          tenantId: user.tenantId,
          role: user.role
        };
      }
    })
  ],
  
  callbacks: {
    /**
     * Add custom fields to JWT token
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        (token as any).tenantId = (user as any).tenantId;
        (token as any).role = (user as any).role;
      }
      return token;
    },

    /**
     * Add custom fields to session
     */
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).tenantId = (token as any).tenantId;
        (session.user as any).role = (token as any).role;
      }
      return session;
    }
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Create a new user with associated tenant
 * 
 * Used during registration to create both the user record
 * and their organization/tenant in a single transaction.
 * 
 * @param email - User's email address
 * @param password - Plain text password (will be hashed)
 * @param name - User's display name
 * @returns Object containing created user and tenant
 */
export async function createUserWithTenant(
  email: string,
  password: string,
  name: string
) {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Generate tenant slug from email
  const tenantSlug = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Create user and tenant in transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create tenant
    const tenant = await tx.tenant.create({
      data: {
        name: `${name}'s Organization`,
        slug: tenantSlug,
        plan: "free",
        status: "active",
      },
    });
    
    // Create user
    const user = await tx.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "owner",
        tenantId: tenant.id,
      },
    });
    
    return { user, tenant };
  });
  
  return result;
}
