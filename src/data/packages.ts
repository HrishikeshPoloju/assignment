import { siteConfig } from "./site-config";

export interface ServicePackage {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  badge?: string;
  idealFor: string;
  description: string;
  includedHighlights: string[];
  optionalAddOns: string[];
  defaultCategoryId: string;
  defaultServiceId: string;
  defaultAddOnIds: string[];
  priceApproved: boolean;
  indicativeStartingPrice?: number;
  priceUnitNote: string;
}

export const servicePackages: ServicePackage[] = [
  {
    id: "home-refresh",
    slug: "home-refresh",
    name: "Home Refresh",
    subtitle: "Periodic care for occupied homes & apartments",
    badge: "Most Requested for Occupied Flats",
    idealFor: "Families and working professionals in occupied 1, 2 or 3 BHK homes",
    description:
      "Designed for lived-in homes that don't need full empty-flat scrubbing, focusing instead on the highest-impact hygiene and comfort zones in a single coordinated day.",
    includedHighlights: [
      "Complete Bathroom Deep Cleaning & hard-water descaling for all bathrooms",
      "Kitchen Deep Cleaning (countertop, backsplash tiles, sink & cabinet exteriors)",
      "Living Room Sofa Deep Cleaning (dry vacuum, shampoo & wet extraction)",
      "Accessible window glass & balcony floor cleaning",
    ],
    optionalAddOns: [
      "Focused stove & cooking zone grease removal",
      "Bedroom mattress deep cleaning",
      "Optional TDS measurement & water checks",
    ],
    defaultCategoryId: "complete-home-cleaning",
    defaultServiceId: "kitchen-and-bathroom-bundle",
    defaultAddOnIds: ["sofa-deep-cleaning"],
    priceApproved: true,
    indicativeStartingPrice: 3499,
    priceUnitNote: "Custom quotation based on BHK size, bathroom count & sofa seating",
  },
  {
    id: "move-in-move-out",
    slug: "move-in-move-out",
    name: "Move-In / Move-Out",
    subtitle: "Complete reset before unpacking or tenancy handover",
    badge: "Ideal for Relocations",
    idealFor: "Incoming residents, outgoing tenants & new flat owners",
    description:
      "Thorough edge-to-edge deep cleaning when a property is vacant or transitioning between occupants—covering inside-out cabinet cleaning, wet areas, floors and windows.",
    includedHighlights: [
      "Inside-and-out wiping of empty kitchen cabinets, trolleys and bedroom wardrobes",
      "Full Kitchen & Bathroom deep cleaning and fixture descaling",
      "Ceiling fans, light fixtures, switchboards, doors and window track vacuuming",
      "Machine & manual floor scrubbing across all rooms and balconies",
    ],
    optionalAddOns: [
      "Combined sofa & mattress sanitization (for furnished flats)",
      "Tank overflow alarm supply & installation",
      "Balcony deep scrubbing & wash down",
    ],
    defaultCategoryId: "complete-home-cleaning",
    defaultServiceId: "move-in-cleaning",
    defaultAddOnIds: [],
    priceApproved: true,
    indicativeStartingPrice: 3999,
    priceUnitNote: "Custom quotation based on BHK size, furnishing state & paint-stain scope",
  },
  {
    id: "property-maintenance",
    slug: "property-maintenance",
    name: "Property Maintenance",
    subtitle: "Coordinated water, tank & facility care",
    badge: "For Villas, Societies & Commercial Spaces",
    idealFor: "Independent bungalows, landlords, PGs, clinics, offices & housing societies",
    description:
      "Combines essential water storage hygiene, plumbing checks and surface care into one structured maintenance schedule for residential or commercial properties.",
    includedHighlights: [
      "Overhead water tank cleaning & sludge extraction (plus sump assessment)",
      "On-site TDS measurement & water checks",
      "Overflow alarm setup & monitoring",
      "Corridor, balcony or common-area floor scrubbing",
    ],
    optionalAddOns: [
      "Tank overflow alarm supply & installation",
      "Underground sump deep cleaning",
      "Periodic office chair, washroom or glass partition care",
    ],
    defaultCategoryId: "water-tank-and-water-care",
    defaultServiceId: "overhead-water-tank-cleaning",
    defaultAddOnIds: ["tds-measurement"],
    priceApproved: true,
    priceUnitNote: "Tailored quotation after reviewing tank capacity & property requirements",
  },
];

export function formatPackagePriceLabel(pkg: ServicePackage): string {
  if (
    siteConfig.pricingPolicy.showIndicativeStartingPrices &&
    pkg.priceApproved &&
    typeof pkg.indicativeStartingPrice === "number"
  ) {
    return `Starting from ${siteConfig.pricingPolicy.currencySymbol}${pkg.indicativeStartingPrice.toLocaleString("en-IN")}`;
  }
  return "Get a Quote";
}

