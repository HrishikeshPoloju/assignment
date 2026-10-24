# AquaShine Facility Care — Website

Premium residential and commercial cleaning and home-care website for **AquaShine Facility Care**, serving Viman Nagar and nearby areas in Pune, Maharashtra, India.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Icons**: Lucide React (`lucide-react`)

## Key Features

- **Complete 8-Category, 54-Service Catalogue**:
  1. Water Tank & Water Care (including explicit TDS vs. laboratory water-quality testing guidance)
  2. Sofa & Upholstery Care
  3. Bathroom Care
  4. Kitchen Care
  5. Floor & Surface Care
  6. Window & Outdoor Care
  7. Complete Home Cleaning
  8. Commercial Cleaning
- **Transparent Fulfillment Classification**: Every service clearly badges whether it is delivered **Direct by AquaShine**, through the **Specialist Partner Network**, or as **Supply & Installation**.
- **Curated Add-On Engine**: Structured related-service recommendations (`complementary`, `follow_up`, `preventive`, `specialist_referral`, `bundle_upgrade`) capped at a maximum of 3 relevant add-ons per service.
- **Interactive Booking & Enquiry Flow**:
  - URL query pre-selection (`/contact?service=overhead-water-tank-cleaning&addons=tds-measurement`)
  - Client and server validation (`POST /api/enquiries`)
  - Dynamic prefilled WhatsApp message generation (`src/lib/whatsapp.ts`)
- **Configurable Pricing & Business Details**:
  - Update WhatsApp number, phone, email, and operational hours in `src/data/site-config.ts`.
  - Update package pricing in `src/data/packages.ts` and individual service pricing in `src/data/services-part1.ts` / `src/data/services-part2.ts`.

## Getting Started

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

