/**
 * Voice AI UK - NextAuth Type Declarations
 * 
 * Extends NextAuth types to include custom fields
 * 
 * @module next-auth.d
 */

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  /**
   * Extended session interface
   */
  interface Session {
    user: {
      id: string;
      tenantId: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  /**
   * Extended user interface
   */
  interface User extends DefaultUser {
    tenantId: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extended JWT interface
   */
  interface JWT extends DefaultJWT {
    id: string;
    tenantId: string;
    role: UserRole;
  }
}
