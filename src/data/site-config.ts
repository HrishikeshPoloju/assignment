/**
 * Central site, brand, contact, and service-area configuration for AquaShine Facility Care.
 *
 * IMPORTANT BUSINESS CONFIGURATION NOTE:
 * Do not fabricate telephone numbers, email addresses, social handles, or street addresses.
 * Set `phone` and `whatsappNumber` below once approved by the business owner.
 * Until configured, the website gracefully presents a structured enquiry review and
 * allows customers to copy their formatted enquiry or submit via the enquiry form.
 */

export interface ServiceAreaItem {
  name: string;
  slug: string;
  tier: "primary" | "nearby";
  statusLabel: string;
  description: string;
  commonRequests: string[];
}

export interface SiteConfig {
  brandName: string;
  legalOrFullName: string;
  tagline: string;
  eyebrow: string;
  shortDescription: string;
  domainUrl: string;
  primaryArea: string;
  city: string;
  state: string;
  country: string;
  contact: {
    /**
     * Set to the verified 10-digit Indian mobile number with country code (e.g., "919876543210")
     * once confirmed by AquaShine management. Leave empty ("") until verified.
     */
    whatsappNumber: string;
    /**
     * Set to the verified display phone number (e.g., "+91 98765 43210") once confirmed.
     */
    phoneDisplay: string;
    /**
     * Set to the verified business email once confirmed (e.g., "care@aquashinepune.in").
     */
    email: string;
    /**
     * Operational response window description.
     */
    workingHours: string;
    /**
     * Base locality without fabricating a private residential address.
     */
    baseLocationLabel: string;
  };
  pricingPolicy: {
    showIndicativeStartingPrices: boolean;
    currencySymbol: string;
    disclaimer: string;
  };
  serviceAreas: ServiceAreaItem[];
}

export const siteConfig: SiteConfig = {
  brandName: "AquaShine",
  legalOrFullName: "AquaShine Facility Care",
  tagline: "A Cleaner Space. A Better Everyday.",
  eyebrow: "PREMIUM CLEANING & HOME CARE",
  shortDescription:
    "Thoughtful residential and commercial cleaning, water tank care, upholstery renewal and coordinated property maintenance serving Viman Nagar and nearby Pune neighbourhoods.",
  domainUrl: "https://aquashinecare.in",
  primaryArea: "Viman Nagar",
  city: "Pune",
  state: "Maharashtra",
  country: "India",
  contact: {
    // Configurable WhatsApp & phone contact. Set your verified number (digits only, with 91 prefix) here:
    whatsappNumber: process.env.NEXT_PUBLIC_AQUASHINE_WHATSAPP || "",
    phoneDisplay: process.env.NEXT_PUBLIC_AQUASHINE_PHONE || "",
    email: process.env.NEXT_PUBLIC_AQUASHINE_EMAIL || "",
    workingHours: "Monday – Sunday, 8:30 AM – 7:30 PM IST (By prior appointment)",
    baseLocationLabel: "Viman Nagar, Pune, Maharashtra, India",
  },
  pricingPolicy: {
    // Until final fixed rates are approved by the business owner, indicative prices are clearly labelled
    // or shown as "Get a Quote" where scope inspection is required.
    showIndicativeStartingPrices: true,
    currencySymbol: "₹",
    disclaimer:
      "Final quotations depend on property size, tank capacity, surface condition, access requirements and selected add-ons. All bookings are confirmed only after scope and schedule verification.",
  },
  serviceAreas: [
    {
      name: "Viman Nagar",
      slug: "viman-nagar",
      tier: "primary",
      statusLabel: "Primary Service Hub",
      description:
        "Priority scheduling for apartments, independent homes, PGs, clinics, cafés and offices across Viman Nagar.",
      commonRequests: [
        "Sofa & mattress deep cleaning",
        "Overhead water tank & TDS checks",
        "Bathroom & kitchen deep cleaning",
        "Move-in / move-out flat cleaning",
      ],
    },
    {
      name: "Kharadi",
      slug: "kharadi",
      tier: "nearby",
      statusLabel: "Available on Schedule Confirmation",
      description:
        "Serving residential societies, IT-corridor apartments, rental turnovers and commercial offices subject to slot availability.",
      commonRequests: [
        "Complete home move-in cleaning",
        "Bathroom hard-water scale removal",
        "Office & coworking space cleaning",
      ],
    },
    {
      name: "Wadgaon Sheri",
      slug: "wadgaon-sheri",
      tier: "nearby",
      statusLabel: "Available on Schedule Confirmation",
      description:
        "Home, upholstery, kitchen and water tank cleaning for apartments and independent houses near Viman Nagar.",
      commonRequests: [
        "Water tank & sump cleaning",
        "Kitchen chimney & grease removal",
        "Sofa & upholstery care",
      ],
    },
    {
      name: "Dhanori",
      slug: "dhanori",
      tier: "nearby",
      statusLabel: "Available on Schedule Confirmation",
      description:
        "Coordinated residential deep cleaning, tank maintenance and balcony/window care for societies in Dhanori.",
      commonRequests: [
        "Empty-flat move-in cleaning",
        "Overhead water tank cleaning",
        "Balcony & pigeon-net referrals",
      ],
    },
    {
      name: "Lohegaon",
      slug: "lohegaon",
      tier: "nearby",
      statusLabel: "Available on Schedule Confirmation",
      description:
        "Scheduled home refresh, water storage care and floor scrubbing for homes and housing societies in Lohegaon.",
      commonRequests: [
        "Overhead tank & float valve care",
        "Floor scrubbing & tile care",
        "Bathroom & kitchen bundles",
      ],
    },
    {
      name: "Yerawada",
      slug: "yerawada",
      tier: "nearby",
      statusLabel: "Available on Schedule Confirmation",
      description:
        "Residential and small commercial facility care, office chair cleaning and periodic maintenance in Yerawada.",
      commonRequests: [
        "Office & clinic cleaning",
        "Office chair & sofa upholstery cleaning",
        "Bathroom deep cleaning",
      ],
    },
  ],
};

