# 🏡 Property Consultant Website  
**Built with Next.js + Tailwind + Supabase**

A production-ready, full-stack web application for property consultants.  
Includes a client-facing website, admin dashboard, CRM-lite backend, and CMS integration for listings.

---

## 🚀 Features

- **Next.js 14 (App Router, SSR, SEO)**
  - Server-Side Rendering (SSR) and Static Site Generation (SSG)
  - Dynamic suburb pages (`/suburbs/[slug]`)
  - Automatic sitemap (`/sitemap.xml`)  

- **Frontend**
  - Tailwind CSS styling
  - Next/Image for optimized, responsive images
  - Conversion-focused landing page (hero, services, testimonials, listings, contact form)

- **Backend**
  - Supabase (Postgres) for storing leads
  - API routes (`/api/lead`, `/api/leads`, `/api/leads/export`, `/api/leads/[id]`)
  - Lead capture validation & persistence

- **CRM-Lite & Admin Dashboard**
  - `/admin` dashboard with Basic Auth protection
  - View, search, filter, and update leads
  - Pipeline stages (New → Qualified → In Progress → Won/Lost)
  - Tags, notes, follow-up scheduling
  - CSV export of leads

- **CMS Integration for Listings**
  - Provider switch via `CMS_PROVIDER` env var  
  - Supports:
    - **LOCAL** JSON (`content/listings.json`)
    - **Airtable**
    - **Notion**
    - **Sanity.io**
    - **Supabase**

- **Email Notifications**
  - Nodemailer integration
  - Sends alerts on new leads to `LEAD_TO`
  - Weekly digest endpoint (`/api/cron/digest`) for summaries

- **Client-Facing Enhancements**
  - Virtual tour support in listings
  - Newsletter subscription form
  - Google Maps embed placeholder
  - Ready for i18n (multilingual expansion)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS  
- **Backend:** Next.js API routes, Supabase (Postgres)  
- **Auth:** HTTP Basic Auth (for admin and API routes)  
- **Email:** Nodemailer  
- **CMS Options:** Local JSON, Airtable, Notion, Sanity  
- **Deployment:** Vercel, Render, or Docker + Supabase  

---

## ⚡ Quick Start

> Requires Node.js 20+ (use `nvm use` to match the `.nvmrc` file).

### 1. Clone & Install
```bash
git clone <your-repo-url> property-consultant
cd property-consultant
cp .env.example .env
npm install
```

### 2. Configure `.env`
Update your environment variables:
```ini
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=changeme

# Email notifications (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=you@example.com
SMTP_PASS=your_app_password
LEAD_TO=you@example.com

# CMS provider: LOCAL | AIRTABLE | NOTION | SANITY | SUPABASE
CMS_PROVIDER=LOCAL
```

### 3. Run Development Server
```bash
npm run dev
```
Visit: [http://localhost:3000](http://localhost:3000)

Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)  
(Login with `BASIC_AUTH_USER` / `BASIC_AUTH_PASS`)

---

## 📦 Production Deployment

1. **Supabase** – create a project and run the SQL in `supabase/migrations/*_create_leads.sql` and `supabase/migrations/*_create_listings.sql` (or `supabase db push`) to provision the tables.  
2. Seed property listings by running `npm run sync:listings` (reads `content/listings.json`, upserts into `public.listings`).  
3. Grab the project URL and **Service Role** key and place them in your environment variables.  
4. **Vercel/Render/Netlify** – deploy the Next.js app and copy the env vars.  
5. Optional: use **Docker** with your preferred cloud host.  

### 📥 Seeding listings into Supabase

If you switch `CMS_PROVIDER=SUPABASE`, run:

```bash
npm run sync:listings
```

This script loads `content/listings.json` and upserts each record into the `public.listings` table (matching on `slug`). Re-run anytime you update the JSON file.

---

## 🔮 Future Extensions

- Advanced CRM (drag-drop pipelines, reminders, Zapier integration)  
- Advanced client features (filters, booking, multilingual)  
- Real-time notifications (WebSockets, push)  
- Marketing automation (Mailchimp/HubSpot sync, follow-up sequences)
