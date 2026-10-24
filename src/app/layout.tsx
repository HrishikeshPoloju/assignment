import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domainUrl),
  title: {
    default: `${siteConfig.brandName} Facility Care | Premium Cleaning & Home Care in Viman Nagar, Pune`,
    template: `%s | ${siteConfig.brandName} Facility Care`,
  },
  description:
    "Thoughtful residential and commercial cleaning, overhead water tank care, sofa and mattress deep cleaning, bathroom descaling and kitchen degreasing in Viman Nagar and nearby Pune areas.",
  keywords: [
    "Water tank cleaning in Viman Nagar",
    "Sofa cleaning in Viman Nagar",
    "Mattress deep cleaning in Pune",
    "Bathroom deep cleaning in Kharadi",
    "Move-in cleaning near Viman Nagar",
    "Commercial cleaning services in Pune",
    "Kitchen deep cleaning Viman Nagar",
    "AquaShine Facility Care Pune",
  ],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.domainUrl,
    siteName: siteConfig.legalOrFullName,
    title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: [
      {
        url: "/images/hero-living-room.webp",
        width: 1200,
        height: 900,
        alt: `${siteConfig.brandName} — ${siteConfig.tagline}`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Verified LocalBusiness structured data (strictly without fabricated ratings, phone numbers or street addresses)
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalOrFullName,
    alternateName: siteConfig.brandName,
    slogan: siteConfig.tagline,
    description: siteConfig.shortDescription,
    url: siteConfig.domainUrl,
    image: `${siteConfig.domainUrl}/images/hero-living-room.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: `${siteConfig.primaryArea}, ${siteConfig.city}`,
      addressRegion: siteConfig.state,
      addressCountry: "IN",
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "Place",
      name: `${area.name}, ${siteConfig.city}`,
    })),
    ...(siteConfig.contact.phoneDisplay
      ? { telephone: siteConfig.contact.phoneDisplay }
      : {}),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#F8FAF9] text-[#172A30] antialiased">
        <Navbar />
        <main id="content" tabIndex={-1} className="flex-1 outline-none pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}

