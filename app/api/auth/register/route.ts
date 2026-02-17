/**
 * Voice AI UK - User Registration API
 * 
 * POST /api/auth/register
 * Creates a new user account with tenant
 * 
 * Body:
 * {
 *   email: string,
 *   password: string (min 8 chars),
 *   name: string
 * }
 * 
 * @module app/api/auth/register/route
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createUserWithTenant } from "@/lib/auth";
import { signIn } from "next-auth/react";

// Validation schema
const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required").max(100),
});

/**
 * POST /api/auth/register
 * 
 * Creates a new user account with an associated tenant.
 * The tenant is automatically created with a slug derived from the email.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validated = registerSchema.parse(body);

    // Create user with tenant
    const result = await createUserWithTenant(
      validated.email,
      validated.password,
      validated.name
    );

    // Sign in the user to create a session
    await signIn("credentials", {
      email: validated.email,
      password: validated.password,
      redirect: false,
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      },
      tenant: {
        id: result.tenant.id,
        name: result.tenant.name,
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle validation errors
    if (error.name === "ZodError") {
      return NextResponse.json({
        success: false,
        error: "Validation failed",
        details: error.errors
      }, { status: 400 });
    }

    // Handle duplicate email
    if (error.code === "P2002") {
      return NextResponse.json({
        success: false,
        error: "An account with this email already exists"
      }, { status: 409 });
    }

    // Generic error
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to create account"
    }, { status: 500 });
  }
}
