# Backend README

## Setup

```bash
npm install
cp .env.example .env.local
```

## Environment Variables

Required:
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `REDIS_URL` - Upstash Redis URL
- `JWT_SECRET` - Secret key for JWT tokens
- `R2_*` - Cloudflare R2 credentials
- `CLERK_SECRET_KEY` - Clerk backend key

## Running

```bash
npm run dev      # Development with watch
npm run build    # TypeScript compilation
npm run start    # Production
```

## API Endpoints

### Health
- `GET /api/health` - Server status

### Gold Items
- `GET /api/gold-items` - List user's items
- `POST /api/gold-items` - Create item
- `PUT /api/gold-items/:id` - Update item
- `DELETE /api/gold-items/:id` - Delete item

### Gold Rates
- `GET /api/gold-rates` - Current rates (cached)

### Upload
- `POST /api/upload` - Upload image to R2

## Database

Run schema from `src/db/schema.sql` in Supabase SQL editor.

## Caching

Uses Upstash Redis for:
- Gold rate caching (5 min TTL)
- User session caching
- Rate limiting
