# AuruVal - Gold Portfolio Management App

A modern, secure web application for managing and validating gold jewelry portfolios. Built with Next.js, Express, and free cloud services.

## 💰 Cost: $0/Month

### Tech Stack

**Frontend:**
- Next.js 14
- TypeScript
- Tailwind CSS
- Clerk Authentication

**Backend:**
- Express.js
- TypeScript
- PostgreSQL (Supabase)
- Redis (Upstash)

**Infrastructure:**
- Vercel (Frontend Hosting - Free)
- Railway (Backend API - 500 hrs/month free)
- Supabase (PostgreSQL - 500MB free)
- Upstash (Redis - 10k commands/day free)
- Cloudflare R2 (Storage - 10GB free)
- Clerk (Auth - 10k MAU free)
- Resend (Email - 3,000/month free)

## 📋 Features

- ✅ User authentication (Clerk)
- ✅ KYC verification with document upload
- ✅ Gold portfolio management
- ✅ Real-time gold rates
- ✅ Loan management
- ✅ Image compression & CDN delivery
- ✅ Audit logs
- ✅ Responsive design
- ✅ Production-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git

### Installation

```bash
# Clone & install
git clone <your-repo>
cd auruval
npm install

# Setup environment
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env.local

# Run development
npm run dev
```

### Access

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 📚 Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions for free-tier deployment.

## 📂 Project Structure

```
auruval/
├── apps/
│   ├── frontend/          # Next.js app
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── backend/           # Express API
│       ├── src/
│       ├── db/
│       └── railway.json
├── .gitignore
├── package.json           # Monorepo root
└── README.md
```

## 🔧 Available Commands

```bash
npm run dev      # Start dev servers
npm run build    # Build both apps
npm run start    # Start production
npm run lint     # Lint all code
```

## 📖 Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./apps/backend/README.md)
- [Frontend Setup](./apps/frontend/README.md)

## 📄 License

MIT
