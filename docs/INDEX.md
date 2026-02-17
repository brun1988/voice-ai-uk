# Code Navigation Index

## Purpose
This file maps every feature to its location. Use it to quickly find and navigate the codebase.

---

## 📁 Project Structure

```
voice-ai-uk/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── dashboard/         # User dashboard
│   ├── auth/             # Authentication pages
│   ├── builder/          # Agent builder
│   └── api/              # API routes
├── components/            # React components
├── lib/                  # Backend utilities
├── prisma/               # Database schema
└── docs/                 # Documentation
```

---

## 🎯 Quick Reference

| What you need | File | Line |
|--------------|------|------|
| **Auth setup** | `lib/auth.ts` | 1 |
| **Database schema** | `prisma/schema.prisma` | 1 |
| **API routes** | `app/api/*/route.ts` | - |
| **Frontend components** | `components/*` | - |

---

## 🔐 Authentication

| Feature | File | Description |
|---------|------|-------------|
| NextAuth config | `app/api/auth/[...nextauth]/route.ts` | Main auth handler |
| Login page | `app/auth/login/page.tsx` | User login UI |
| Register page | `app/auth/register/page.tsx` | Sign up flow |
| Auth utilities | `lib/auth.ts` | Password hashing, user creation |

---

## 🤖 Agent Builder

| Feature | File | Description |
|---------|------|-------------|
| Builder UI | `components/builder/AgentBuilderClient.tsx` | Main builder interface |
| Builder page | `app/builder/[agentId]/page.tsx` | Server component |
| New agent | `app/dashboard/new/page.tsx` | Create agent form |
| Templates | `lib/templates.ts` | Agent template configs |

---

## 📊 Dashboard

| Feature | File | Description |
|---------|------|-------------|
| Main dashboard | `app/dashboard/page.tsx` | Stats overview |
| Call logs | `app/dashboard/calls/page.tsx` | View all calls |
| Analytics | `app/dashboard/analytics/page.tsx` | Charts/stats |
| Settings | `app/dashboard/settings/page.tsx` | User settings |

---

## 🔌 Integrations

| Service | File | Purpose |
|---------|------|---------|
| Twilio | `lib/twilio.ts` | Phone numbers |
| Vapi | `lib/vapi.ts` | Voice AI |
| Calendar | `lib/calendar.ts` | Booking |
| SMS | `lib/sms.ts` | Notifications |
| Webhooks | `lib/webhooks.ts` | CRM sync |

---

## 🗄️ Database

| Table | File | Description |
|-------|------|-------------|
| Tenant | `prisma/schema.prisma` | Business accounts |
| User | `prisma/schema.prisma` | Team members |
| Agent | `prisma/schema.prisma` | AI agents |
| CallLog | `prisma/schema.prisma` | Call history |
| PhoneNumber | `prisma/schema.prisma` | Purchased numbers |
| KnowledgeBase | `prisma/schema.prisma` | Agent knowledge |

---

## 🚀 API Routes

| Endpoint | File | Method |
|----------|------|--------|
| `/api/auth/*` | `app/api/auth/*/route.ts` | Auth handlers |
| `/api/agents` | `app/api/agents/route.ts` | CRUD agents |
| `/api/calls` | `app/api/calls/route.ts` | Call logs |
| `/api/analytics` | `app/api/analytics/route.ts` | Stats |
| `/api/phone-numbers` | `app/api/phone-numbers/route.ts` | Phone mgmt + routing |
| `/api/settings` | `app/api/settings/route.ts` | User settings |
| `/api/voice/webhook` | `app/api/voice/webhook/route.ts` | Twilio webhook |

---

## 📖 Documentation

| Doc | File | Description |
|-----|------|-------------|
| README | `README.md` | Project overview |
| Deployment | `docs/DEPLOYMENT.md` | Step-by-step deploy |
| Domain & SSL | `docs/DOMAIN_SSL.md` | Custom domain setup |
| This index | `docs/INDEX.md` | Code navigation |

---

## 🔍 Search Tips

### Find a function
```bash
grep -r "functionName" --include="*.ts"
```

### Find a component
```bash
grep -r "export default" --include="*.tsx" components/
```

### Find API route
```bash
grep -r "GET\|POST\|PATCH\|DELETE" --include="*.ts" app/api/
```

---

## 🐛 Debugging

### Check API errors
- Look in terminal where `npm run dev` is running
- Check Vercel function logs in dashboard

### Database issues
- Run `npx prisma studio` to visualize DB
- Check schema in `prisma/schema.prisma`

### Auth issues
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches domain

---

## 📝 Adding New Features

### 1. Create component
```
components/feature/FeatureName.tsx
```

### 2. Add API route
```
app/api/feature/route.ts
```

### 3. Add to navigation (this file)
```
## Feature Name
| Feature | `components/feature/FeatureName.tsx` | Description |
```

### 4. Update docs
```
docs/FEATURE.md
```

---

*Last updated: 2026-02-17*
