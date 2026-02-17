/**
 * Voice AI UK - Main Entry Point
 * 
 * Project: AI Voice Receptionist for UK Businesses
 * Version: 1.0.0
 * 
 * ARCHITECTURE:
 * ┌─────────────────────────────────────────────────────────┐
 * │                    FRONTEND                           │
 │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
 │  │ Landing  │  │Dashboard │  │ Builder  │          │
 │  │   Page   │  │   Page   │  │   Page   │          │
 │  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
 └───────┼──────────────┼──────────────┼────────────────┘
         │              │              │
         ▼              ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                    API LAYER                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  Auth    │  │ Agents   │  │  Calls   │          │
│  │  Routes  │  │  Routes  │  │  Routes  │          │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
 └───────┼──────────────┼──────────────┼────────────────┘
         │              │              │
         ▼              ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                   SERVICES LAYER                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Twilio   │  │  Vapi    │  │ Calendar │          │
│  │  Phone   │  │ Voice AI │  │  Book    │          │
│  └──────────┘  └──────────┘  └──────────┘          │
 └─────────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                        │
│              PostgreSQL (Supabase)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Tenants  │  │  Agents  │  │  Calls   │          │
│  └──────────┘  └──────────┘  └──────────┘          │
 └─────────────────────────────────────────────────────────┘
 * 
 * FLOW: User → Dashboard → Create Agent → Add Phone → AI Answers Calls
 * 
 * Tech Stack:
 * - Frontend: Next.js 14, React, Tailwind CSS
 * - Backend: Next.js API Routes
 * - Database: PostgreSQL via Prisma
 * - Auth: NextAuth.js (JWT)
 * - Voice: Vapi.ai + Deepgram + ElevenLabs
 * - Phone: Twilio (UK numbers)
 * - Hosting: Vercel
 * 
 * Getting Started:
 * 1. Install: npm install
 * 2. Setup: Copy .env.example to .env
 * 3. Database: npx prisma db push
 * 4. Run: npm run dev
 * 
 * @module
 */

import './globals.css'

export const metadata = {
  title: 'Voice AI UK - AI Receptionist for UK Businesses',
  description: 'Automate your phone lines with AI. Never miss a call again.',
}

/**
 * Root Layout
 * 
 * Wraps all pages with:
 * - HTML structure
 * - Global styles
 * - Auth provider (for protected routes)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
