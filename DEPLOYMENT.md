# AuruVal Free Tier Deployment Guide

Deploy AuruVal for $0/month using free cloud services.

## Step 1: Supabase Setup (PostgreSQL)

1. **Sign up:** https://supabase.com
2. **Create Project:**
   - Name: auruval
   - Database Password: (save it!)
   - Region: ap-south-1 (Mumbai)
3. **Get Connection String:**
   - Settings → Database → Connection String → URI
   - Format: `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres`
4. **Run Schema:**
   - SQL Editor → Copy from `apps/backend/src/db/schema.sql`
   - Execute all SQL

## Step 2: Upstash Redis

1. **Sign up:** https://upstash.com
2. **Create Database:**
   - Name: auruval-cache
   - Region: ap-south-1
3. **Get Credentials:**
   - Details → REST API → Copy URL
   - Format: `https://default:token@region.upstash.io`

## Step 3: Cloudflare R2

1. **Sign up:** https://cloudflare.com
2. **Create Bucket:**
   - Storage → R2 → Create Bucket
   - Name: auruval-uploads
3. **API Token:**
   - R2 → Manage R2 API Tokens
   - Create token with all permissions
4. **Get URL:**
   - Bucket → Settings → Public URL

## Step 4: Railway (Backend)

1. **Sign up:** https://railway.app (GitHub)
2. **Create Project** → Connect GitHub
3. **Add Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=[from Supabase]
   REDIS_URL=[from Upstash]
   JWT_SECRET=[generate 32-char random]
   R2_*=[from Cloudflare]
   CLERK_SECRET_KEY=[from Clerk]
   ALLOWED_ORIGINS=https://auruval.vercel.app
   ```
4. **Deploy:** Auto-deploys on git push
5. **Get API URL:** From Railway dashboard

## Step 5: Vercel (Frontend)

1. **Sign up:** https://vercel.com (GitHub)
2. **Import Project:** Select your GitHub repo
3. **Add Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=[from Supabase]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[from Supabase]
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=[from Clerk]
   NEXT_PUBLIC_API_URL=[Railway API URL]
   NEXT_PUBLIC_CDN_URL=[from Cloudflare R2]
   ```
4. **Deploy:** Auto-deploys on git push

## Step 6: Clerk Authentication

1. **Sign up:** https://clerk.com
2. **Create App:**
   - Enable: Email, Google OAuth
3. **Get Keys:**
   - Backend: `CLERK_SECRET_KEY` (sk_live_xxx)
   - Frontend: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (pk_live_xxx)
4. **Configure URLs:**
   - Production: `https://auruval.vercel.app`

## Step 7: Resend Email

1. **Sign up:** https://resend.com
2. **Get API Key:** API Keys → Create
3. **Add Variable:**
   - `RESEND_API_KEY` (Backend)
   - `FROM_EMAIL=noreply@yourdomain.tk`

## ✅ Deployment Checklist

- [ ] Supabase PostgreSQL setup & schema
- [ ] Upstash Redis created
- [ ] Cloudflare R2 bucket ready
- [ ] Railway backend deployed
- [ ] Vercel frontend deployed
- [ ] Clerk authentication configured
- [ ] Resend email API key added
- [ ] Environment variables set
- [ ] Test: https://auruval.vercel.app
- [ ] Check health: [API]/api/health

## 🎯 Production URLs

```
Frontend:  https://auruval.vercel.app
API:       https://auruval.up.railway.app
Database:  PostgreSQL on Supabase
Cache:     Redis on Upstash
Storage:   Cloudflare R2
```

## 📊 Free Tier Limits

| Service | Limit | Notes |
|---------|-------|-------|
| Railway | 500 hrs/month | ~20 days running 24/7 |
| Supabase | 500MB DB | ~50k gold items |
| Upstash | 10k commands/day | Cache gold rates |
| R2 | 10GB storage | ~50k images |
| Resend | 3,000 emails/month | OTP + notifications |
| Vercel | Unlimited | Auto-scaling |
| Clerk | 10k MAU | Users/month |

## 🔄 Monitoring

1. **Railway:** Check logs for errors
2. **Vercel:** Monitor deployments
3. **Supabase:** Check database size
4. **Upstash:** Monitor commands/day
5. **Clerk:** Check MAU usage

## 💡 Cost Optimization Tips

1. **Railway sleeps after 10 min idle** → First request slow
2. **Supabase pauses after 7 days** → Keep active
3. **Cache with Redis** → Reduce DB queries
4. **Compress images** → Save R2 space
5. **Archive old logs** → Keep DB lean

## 🚀 Upgrade Path

When traffic grows:
- Railway Pro: $20/month
- Supabase Pro: $25/month (8GB)
- Upstash Pro: $10/month
- Total: ~$55/month for 10k+ DAU

---

**Estimated Capacity:**
- 500-1,000 concurrent users
- 5,000-10,000 daily active users
- 3M+ API requests/month
