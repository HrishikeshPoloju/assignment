# Neon Serverless PostgreSQL Setup Guide for AquaShine

AquaShine uses **Neon Serverless PostgreSQL** via `@neondatabase/serverless` to store all customer bookings, location coordinates, service add-ons, and admin statuses permanently in the cloud.

---

## 1. Do we need a separate backend or extra APIs?
**No!** 
Next.js is already a **full-stack framework** that includes its own secure backend:
- `src/app/api/enquiries/route.ts` handles customer booking requests.
- `src/app/api/admin/bookings/route.ts` handles the admin dashboard and status updates.

Because these routes execute **on the server** (e.g., in Vercel Serverless Functions), your database password and connection string (`DATABASE_URL`) are completely hidden from the public and securely protected.

---

## 2. Get Your Free Neon Database in 60 Seconds

1. Go to **[https://neon.tech](https://neon.tech)** and sign up for free (you can use your GitHub account).
2. Click **"Create Project"**:
   - **Project name**: `aquashine-db`
   - **Region**: Choose **Asia (Singapore - ap-southeast-1)** or **AWS (Mumbai / ap-south-1)** for the fastest speeds in Pune.
   - Click **Create Project**.
3. On the project dashboard, you will immediately see a **Connection string**:
   ```
   postgresql://neondb_owner:npg_xxxxxx@ep-cool-fog-12345.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Copy that string.

---

## 3. Connect Locally (for Local Development)

1. Open your `.env.local` file in the root folder:
   ```env
   DATABASE_URL="postgresql://neondb_owner:npg_xxxxxx@ep-cool-fog-12345.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. That's it! AquaShine will **automatically create all necessary tables (`bookings` and `business_settings`)** on the first request. You do not even have to write manual SQL migrations.

---

## 4. Connect on Vercel (for Live Production)

When you deploy to Vercel:
1. Go to your project on **[vercel.com](https://vercel.com)**.
2. Click **Settings** → **Environment Variables**.
3. Add a new variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Your Neon connection string from Step 2.
4. Click **Save**.
5. Redeploy your project (or push a new commit).

Your live website and `/admin` portal will now permanently store and retrieve all customer bookings directly from Neon Postgres!

---

## 5. Built-in Graceful Fallback
If `DATABASE_URL` is ever missing, AquaShine automatically falls back to local file storage (`data/bookings.json`), ensuring your application **never crashes or goes down**.

