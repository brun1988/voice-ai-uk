/**
 * Voice AI UK - NextAuth API Route
 * 
 * Handles all NextAuth.js authentication endpoints.
 * Mounted at /api/auth/[...nextauth]
 * 
 * @module app/api/auth/[...nextauth]/route
 */

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * NextAuth configuration
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
 * NextAuth route handler
 * 
 * Creates GET and POST handlers for:
 * - GET /api/auth/signin - Sign in page
 * - POST /api/auth/callback - Credential provider callback
 * - GET /api/auth/session - Get current session
 * - GET /api/auth/logout - Sign out
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
