/**
 * Voice AI UK - NextAuth API Route
 * 
 * Handles all NextAuth.js authentication endpoints.
 * Mounted at /api/auth/[...nextauth]
 * 
 * @module app/api/auth/[...nextauth]/route
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

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
