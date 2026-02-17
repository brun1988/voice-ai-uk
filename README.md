# Voice AI UK 🤖📞

> AI Voice Receptionist for UK Businesses

Automate your phone lines with AI. Never miss a call again.

---

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| [INDEX.md](docs/INDEX.md) | Code navigation - find anything fast |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Step-by-step deployment to Vercel |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env

# 3. Set up database
npx prisma generate
npx prisma db push

# 4. Run development server
npm run dev
```

Visit http://localhost:3000

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      USER LAYER                          │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌─────────┐ │
│  │ Landing │  │Dashboard │  │ Builder │  │  Auth  │ │
│  └─────────┘  └──────────┘  └─────────┘  └─────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                             │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Agents │  │  Calls  │  │ Analytics│  │ Settings│  │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  │
└───────┼─────────────┼─────────────┼─────────────┼────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────┐
│                   SERVICES LAYER                          │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Twilio │  │  Vapi   │  │Calendar │  │  SMS   │  │
│  │ (Phone)│  │(Voice AI)│ │(Booking)│  │(Notify)│  │
│  └─────────┘  └──────────┘  └─────────┘  └─────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                           │
│                 PostgreSQL (Supabase)                     │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Tenant │  │   User   │  │  Agent  │  │  Call  │  │
│  └─────────┘  └──────────┘  └─────────┘  └─────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
voice-ai-uk/
├── app/                     # Next.js App Router
│   ├── page.tsx            # Landing page
│   ├── dashboard/          # User dashboard
│   │   ├── page.tsx       # Main dashboard
│   │   ├── calls/         # Call logs
│   │   ├── analytics/    # Stats & charts
│   │   ├── settings/      # User settings
│   │   └── new/          # Create agent
│   ├── auth/              # Login/Register
│   ├── builder/           # Agent builder
│   │   └── [agentId]/    # Edit specific agent
│   └── api/              # API routes
│       ├── auth/          # NextAuth
│       ├── agents/        # Agent CRUD
│       ├── calls/         # Call logs
│       ├── analytics/     # Stats
│       └── voice/         # Twilio webhook
│
├── components/            # React components
│   └── builder/          # Builder UI
│
├── lib/                   # Backend utilities (ALPHABETICAL)
│   ├── auth.ts           # Authentication helpers
│   ├── calendar.ts       # Google/Cal.com
│   ├── prisma.ts        # Database client
│   ├── sms.ts           # Twilio SMS
│   ├── twilio.ts       # Phone numbers
│   ├── vapi.ts         # Voice AI
│   └── webhooks.ts     # CRM integrations
│
├── prisma/               # Database
│   └── schema.prisma    # All tables
│
└── docs/                 # Documentation
    ├── INDEX.md         # Code navigation
    └── DEPLOYMENT.md   # Deploy guide
```

---

## 🔧 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 14, React | UI |
| Styling | Tailwind CSS | Design |
| Backend | Next.js API | Server logic |
| Database | PostgreSQL (Supabase) | Storage |
| ORM | Prisma | DB access |
| Auth | NextAuth.js | Sessions |
| Voice | Vapi.ai | AI calls |
| STT | Deepgram | Speech-to-text |
| TTS | ElevenLabs | Text-to-speech |
| Phone | Twilio | UK numbers |
| Hosting | Vercel | Deployment |

---

## ✅ Features

### Complete
- User registration & login
- Tenant (business) management
- AI Agent creation (4 templates)
- Dashboard with stats
- Call logging
- Analytics charts

### Ready to Use
- Phone number purchase
- Voice webhook
- Calendar booking
- SMS notifications
- CRM webhooks

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/[...nextauth]` | Login/logout |
| GET/POST | `/api/agents` | List/Create agents |
| GET/PATCH/DELETE | `/api/agents/[id]` | Manage agent |
| GET | `/api/calls` | Call history |
| GET | `/api/analytics` | Stats |
| GET/PUT | `/api/settings` | User settings |
| POST | `/api/voice/webhook` | Handle calls |

---

## 🔐 Environment Variables

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="random-string"

# Voice AI
VAPI_API_KEY="xxx"

# Phone
TWILIO_ACCOUNT_SID="xxx"
TWILIO_AUTH_TOKEN="xxx"
TWILIO_PHONE_NUMBER="+447xxx"

# Calendar (optional)
GOOGLE_CLIENT_ID="xxx"
GOOGLE_CLIENT_SECRET="xxx"
```

---

## 🚢 Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed steps.

TL;DR:
1. Push to GitHub
2. Import to Vercel
3. Add env vars
4. Deploy!

---

## 📖 Finding Things

**Use `docs/INDEX.md`** - It's a map of the entire codebase!

```bash
# Search for something specific
grep -r "functionName" --include="*.ts"
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Make changes
4. Test locally
5. Push & PR

---

## 📄 License

MIT
