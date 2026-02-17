# Voice AI UK

AI Voice Receptionist Service for UK Businesses - MVP

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your credentials

# 3. Set up database
npx prisma generate
npx prisma db push

# 4. Run development server
npm run dev
```

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** NextAuth.js
- **Voice:** Vapi.ai
- **Phone:** Twilio UK

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── page.tsx        # Landing page
│   ├── dashboard/      # User dashboard
│   └── api/            # API routes
├── components/         # React components
├── lib/               # Utilities
├── prisma/            # Database schema
└── public/            # Static assets
```

## Features (MVP)

- [ ] User authentication
- [ ] Tenant (business) management
- [ ] AI Agent creation with templates
- [ ] Visual flow builder
- [ ] Knowledge base (file upload)
- [ ] Test center
- [ ] UK phone numbers (+44)
- [ ] Call logging & analytics
- [ ] Calendar integration (Google, Cal.com)
- [ ] Email notifications

## Deployment

Deploy to Vercel:

```bash
npm run build
# Deploy via Vercel CLI or GitHub integration
```

## License

MIT
