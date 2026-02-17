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
│   ├── auth/           # Auth pages
│   ├── builder/        # Agent builder
│   └── api/            # API routes
├── components/         # React components
├── lib/               # Utilities (auth, prisma, twilio)
├── prisma/            # Database schema
└── public/            # Static assets
```

## Features (MVP)

### Completed ✅
- [x] User authentication (login/register)
- [x] Tenant (business) management
- [x] AI Agent creation with templates
- [x] Visual flow builder
- [x] Knowledge base (file upload)
- [x] Call logging & analytics
- [x] Settings management

### In Progress 🚧
- [ ] Test center
- [ ] UK phone numbers (+44)
- [ ] Calendar integration (Google, Cal.com)
- [ ] Email notifications

## Environment Variables

```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Vapi
VAPI_API_KEY=
VAPI_PRIVATE_KEY=
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/voice-ai-uk.git
   git push -u origin master
   ```

2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy!

### Manual Build

```bash
npm run build
# Output in .next folder
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/[...nextauth]` | Authentication |
| GET/POST | `/api/agents` | List/Create agents |
| GET/PUT/DELETE | `/api/agents/[id]` | Agent CRUD |
| GET | `/api/calls` | Call logs |
| GET | `/api/analytics` | Analytics data |
| GET/PUT | `/api/settings` | User settings |
| POST | `/api/voice/webhook` | Voice webhook handler |

## License

MIT
