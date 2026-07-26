# L'Arôme Bistro

Next.js website and admin panel for L'Arôme Bistro, backed by **Prisma + Neon (PostgreSQL)** for Vercel deployment.

## Stack

- Next.js 16 (App Router) + TypeScript
- Prisma 7 + Neon serverless adapter
- Admin panel for menu & reservations

## Environment

Copy `.env.example` to `.env` and fill in Neon credentials from the Neon Console → **Connect**:

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon **pooled** URL (`-pooler` hostname) — runtime queries |
| `DIRECT_URL` | Neon **direct** URL — Prisma migrate / seed |
| `ADMIN_PASSWORD` | Admin panel password |
| `ADMIN_SESSION_SECRET` | Cookie session secret |

## Local setup

```bash
npm install
npx prisma migrate deploy   # apply migrations
npx prisma db seed          # seed menu + sample reservations
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin) (default password `admin123`)

### Database scripts

```bash
npm run db:generate   # prisma generate
npm run db:migrate    # prisma migrate deploy
npm run db:push       # prisma db push (dev prototyping)
npm run db:seed       # seed data
npm run db:studio     # Prisma Studio
```

## Vercel + Neon deploy

1. Create a Neon project and copy both connection strings.
2. Import the repo into Vercel.
3. Add environment variables in Vercel Project Settings:

   - `DATABASE_URL` (pooled)
   - `DIRECT_URL` (direct)
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`

4. Deploy. The build script runs:

   ```bash
   prisma generate && prisma migrate deploy && next build
   ```

5. After the first successful deploy, seed production once:

   ```bash
   # with production env loaded locally, or via Neon SQL / one-off job
   npx prisma db seed
   ```

Neon Integration on Vercel can inject `DATABASE_URL` automatically; still add `DIRECT_URL` for migrations.

## Models

- `MenuItem` — name, description, price, category, tags, featured, available
- `Reservation` — guest details, date/time, guests, status (`pending` | `confirmed` | `cancelled` | `completed`)
