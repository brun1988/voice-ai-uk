# Domain & SSL Setup Guide

This guide covers setting up a custom domain with free SSL for your Voice AI UK deployment.

---

## Quick Overview

| Step | Action | Time |
|------|--------|------|
| 1 | Buy a domain | 5 min |
| 2 | Add domain to Vercel | 2 min |
| 3 | Update DNS records | 1-24 hrs |
| 4 | SSL auto-enabled | Automatic |

---

## Step 1: Buy a Domain

### Recommended UK Registrars

| Registrar | Price | Notes |
|-----------|-------|-------|
| **Namecheap** | ~£8/year | Best for .co.uk, .uk |
| **GoDaddy** | ~£10/year | Popular, easy UI |
| **Cloudflare Registrar** | ~£7/year | Cheapest, excellent DNS |

### Recommended Domain Names

For a UK AI voice receptionist business:

```
voiceai.uk           # If available
ai-receptionist.co.uk
voice-receptionist.co.uk
smartcalls.uk
aivoice.co.uk
```

### Why .co.uk?

- Trust signal for UK businesses
- Cheaper than .com
- Local SEO benefit
- Professional appearance

---

## Step 2: Add Domain to Vercel

### Option A: Via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your domain (e.g., `voiceai.co.uk`)
6. Click **Add**

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add domain to project
vercel domain add voiceai.co.uk
```

---

## Step 3: Configure DNS Records

After adding domain, Vercel will show DNS records to create:

### For Root Domain (apex)

Add these records at your domain registrar:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | cname.vercel-dns.com | Auto |
| ALIAS | @ | cname.vercel-dns.com | Auto |

> **Note:** Some registrars call ALIAS "ANAME" or "URL Redirect"

### For Subdomains

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | api | cname.vercel-dns.com | Auto |
| CNAME | app | cname.vercel-dns.com | Auto |

### DNS Provider Specific

#### Cloudflare (Recommended)

1. Go to DNS settings
2. Add CNAME record:
   - **Name:** www
   - **Content:** cname.vercel-dns.com
   - **Proxy status:** Proxied (orange cloud)

#### Namecheap

1. Go to Domain List → Manage → DNS
2. Add CNAME record:
   - **Host:** www
   - **Value:** cname.vercel-dns.com
   - **Type:** CNAME

#### GoDaddy

1. Go to DNS Management
2. Add CNAME:
   - **Name:** www
   - **Value:** cname.vercel-dns.com

---

## Step 4: SSL Certificate (Automatic)

**Vercel provides free SSL automatically!**

### How It Works

1. After DNS propagates (1min - 24hrs)
2. Vercel detects your domain
3. Issues free Let's Encrypt certificate
4. Auto-renews every 90 days

### Verify SSL

Visit `https://your-domain.com` - should show lock icon 🔒

### Check Certificate

```bash
# Using openssl
openssl s_client -connect voiceai.co.uk:443 -servername voiceai.co.uk
```

Look for:
```
Verify return code: 0 (ok)
```

---

## DNS Propagation

### What is Propagation?

When you update DNS records, it takes time for all servers worldwide to see the change.

### Typical Times

| Provider | Time |
|----------|------|
| Cloudflare | 1-5 minutes |
| Namecheap | 5-30 minutes |
| GoDaddy | 15-60 minutes |
| Other | Up to 24 hours |

### Check Propagation

```bash
# Check DNS
dig voiceai.co.uk

# Check with specific DNS
dig voiceai.co.uk @1.1.1.1   # Cloudflare
dig voiceai.co.uk @8.8.8.8   # Google
```

### Force Refresh

If DNS seems stuck:
1. Clear local DNS cache:
   ```bash
   # Mac
   sudo dscacheutil -flushcache
   
   # Windows
   ipconfig /flushdns
   ```

---

## Troubleshooting

### Domain Not Working

#### Problem: "Domain not configured"

**Cause:** DNS not pointing to Vercel

**Solution:**
1. Check DNS records are correct
2. Wait for propagation (up to 24hrs)
3. Verify with: `dig yourdomain.com`

#### Problem: "SSL certificate not issued"

**Cause:** DNS not pointing to Vercel yet

**Solution:**
1. Wait for DNS propagation
2. Add domain again in Vercel
3. Check domain is using correct nameservers

#### Problem: "Too many redirects"

**Cause:** Mixed HTTP/HTTPS in Next.js config

**Solution:**
Ensure `NEXTAUTH_URL` uses https:
```env
NEXTAUTH_URL=https://your-domain.co.uk
```

### Common DNS Mistakes

| Mistake | Fix |
|---------|-----|
| Using A record for root | Use CNAME or ALIAS |
| Missing www record | Add www CNAME |
| Wrong TTL | Use "Auto" or 300 |
| Trailing dots | Don't add trailing . in values |

---

## Environment Variables Update

After setting up domain, update environment:

```env
# Update these
NEXTAUTH_URL=https://your-domain.co.uk
APP_URL=https://your-domain.co.uk
```

Redeploy to apply changes:
```bash
vercel --prod
```

---

## Multi-Domain Setup

### Add Multiple Domains

1. Go to Vercel → Settings → Domains
2. Add each domain
3. Set one as primary

### Redirects

Add to `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "destination": "https://primary-domain.co.uk/:path*",
      "statusCode": 301
    }
  ]
}
```

---

## UK Phone Number DNS Considerations

### For Twilio Webhooks

When configuring Twilio voice webhooks:

```
https://your-domain.co.uk/api/voice/webhook
```

This URL must be publicly accessible - your custom domain works perfectly!

### Testing Webhooks

Use https://requestInspector.com or similar to debug.

---

## Security Headers

Vercel automatically adds security headers. To customize, add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## Performance Tips

### CDN

Vercel automatically serves from edge locations worldwide.

### Caching

Add caching headers in API routes:

```typescript
export async function GET(request: Request) {
  return new Response(data, {
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate'
    }
  })
}
```

---

## Costs

| Item | Cost |
|------|------|
| Domain (.co.uk) | ~£8/year |
| Vercel Pro | £20/month (optional) |
| SSL Certificate | FREE |
| CDN | FREE |

---

## Checklist

- [ ] Buy domain from registrar
- [ ] Add domain in Vercel dashboard
- [ ] Create CNAME record for www
- [ ] Create ALIAS/ANAME for root domain
- [ ] Wait for DNS propagation
- [ ] Verify SSL works (https://)
- [ ] Update NEXTAUTH_URL env var
- [ ] Redeploy application

---

## Support

- Vercel Docs: https://vercel.com/docs/concepts/dns
- Let's Encrypt: https://letsencrypt.org/docs/
- DNS Checker: https://dnschecker.org/

---

*Last updated: 2026-02-17*
