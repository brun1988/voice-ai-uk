# Voice AI UK - Deployment Guide

## GitHub Setup

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Name: `voice-ai-uk`
3. Description: AI Voice Receptionist for UK Businesses - MVP
4. Public or Private (your choice)
5. Don't add README (we have one)
6. Click "Create repository"

### 2. Push Code

```bash
cd /home/jon/voice-ai-uk

# Initialize git (if not already)
git init
git add .
git commit -m "MVP - Voice AI UK

- Landing page with features
- User authentication (NextAuth)
- Agent builder with templates
- Dashboard with stats
- Call logs & analytics
- Twilio + Vapi integration
- Vercel deployment ready"

# Add your repo (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/voice-ai-uk.git

# Push
git branch -M main
git push -u origin main
```

## Vercel Setup

### 1. Import Project

1. Go to https://vercel.com
2. "Add New..." → Project
3. Import from GitHub
4. Select `voice-ai-uk` repository
5. Click "Import"

### 2. Configure Environment

Add these environment variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Supabase PostgreSQL connection string |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Production URL |
| `NEXTAUTH_SECRET` | Generate random string | For JWT encryption |
| `GITHUB_ID` | Your GitHub OAuth App ID | Optional |
| `GITHUB_SECRET` | Your GitHub OAuth App Secret | Optional |
| `VAPI_API_KEY` | Your Vapi API key | From vapi.ai |
| `TWILIO_ACCOUNT_SID` | Your Twilio SID | From twilio.com |
| `TWILIO_AUTH_TOKEN` | Your Twilio Token | From twilio.com |

### 3. Deploy

1. Click "Deploy"
2. Wait for build (2-3 minutes)
3. Your app is live at `https://voice-ai-uk.vercel.app`

## Database Setup (Supabase)

### 1. Create Project

1. Go to https://supabase.com
2. "New Project"
3. Name: `voice-ai-uk`
4. Set password
5. Wait for setup

### 2. Get Connection String

1. Settings → Database
2. Copy "Connection String"
3. Use in `DATABASE_URL` env var

### 3. Run Migrations

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

## Twilio Setup

### 1. Get Credentials

1. Go to https://console.twilio.com
2. Create account
3. Get Account SID and Auth Token

### 2. Buy UK Number

1. Phone Numbers → Browse Numbers
2. Search for UK area code (e.g., "20" for London)
3. Buy a number
4. Configure voice webhook to: `https://your-app.vercel.app/api/voice/webhook`

## Vapi Setup

### 1. Get API Key

1. Go to https://vapi.ai
2. Sign up
3. Copy API key
4. Add to Vercel env vars

### 2. Configure Voice

The app comes with built-in templates:
- Real Estate (lead qualification)
- Restaurant (reservations)
- Healthcare (appointments)
- Custom

## First-Time Setup

After deployment:

1. Visit your app
2. Sign up with email/password
3. Create your first agent
4. Select template
5. Add a phone number
6. Deploy agent
7. Test!

## Troubleshooting

### Build Fails
- Check environment variables are set
- Ensure `npm install` works locally first

### Database Connection Error
- Verify DATABASE_URL is correct
- Check Supabase project is active

### Calls Not Working
- Verify Twilio webhook URL is correct
- Check Vapi API key is valid

### Auth Issues
- Ensure NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain

## Custom Domain

1. Go to Vercel → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. See [DOMAIN_SSL.md](DOMAIN_SSL.md) for detailed step-by-step guide

---

**Deployed! 🎉**
