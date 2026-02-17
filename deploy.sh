#!/bin/bash
# Voice AI UK - Quick Deploy Script
# Run this from the voice-ai-uk directory

set -e

echo "🚀 Voice AI UK - Deploy Script"
echo "================================"

# Check if git remote exists
if ! git remote get-url origin &>/dev/null; then
    echo ""
    echo "❌ No GitHub remote configured."
    echo ""
    echo "To set up GitHub deployment:"
    echo "1. Create a repo at https://github.com/new"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/voice-ai-uk.git"
    echo "3. Run: git branch -M main && git push -u origin main"
    echo "4. Import in Vercel: https://vercel.com"
    exit 1
fi

echo "✅ Git remote configured: $(git remote get-url origin)"
echo ""
echo "Next steps:"
echo "1. Push to GitHub:     git push -u origin main"
echo "2. Import in Vercel:   https://vercel.com"
echo "3. Add env vars in Vercel dashboard"
echo ""
echo "Required env vars:"
echo "  - DATABASE_URL"
echo "  - NEXTAUTH_URL"
echo "  - NEXTAUTH_SECRET"
echo "  - TWILIO_ACCOUNT_SID"
echo "  - TWILIO_AUTH_TOKEN"
echo "  - VAPI_API_KEY"
echo ""
echo "See docs/DEPLOYMENT.md for full guide"
