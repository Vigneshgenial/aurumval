# Frontend README

## Setup

```bash
npm install
cp .env.example .env.local
```

## Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk frontend key
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Running

```bash
npm run dev      # Development (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
```

## Project Structure

```
app/
├── layout.tsx           # Root layout with Clerk
├── page.tsx             # Landing page
├── (auth)/
│   ├── sign-in/
│   └── sign-up/
├── (dashboard)/
│   ├── portfolio/       # Gold items list
│   ├── add-item/        # Add new item
│   └── loans/           # Loan management
└── api/
    └── auth/            # Auth API routes
```

## Key Libraries

- **Supabase** - Database & auth integration
- **Clerk** - Authentication
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client

## Deployment

Deploy to Vercel:
1. Push to GitHub
2. Go to vercel.com/import
3. Select repo
4. Add environment variables
5. Deploy

Auto-deploys on push to main branch.
