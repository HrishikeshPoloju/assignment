import {
  CategoryId,
  RelatedServiceRelation,
  ServiceCategory,
  ServiceItem,
} from "./service-types";
import { servicesPart1 } from "./services-part1";
import { servicesPart2 } from "./services-part2";
import { siteConfig } from "./site-config";

export * from "./service-types";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "water-tank-and-water-care",
    slug: "water-tank-and-water-care",
    name: "Water Tank & Water Care",
    homepageTitle: "Water Tank & Water Care",
    shortDescription:
      "Overhead water tank and sump cleaning, optional TDS checks and overflow prevention.",
    fullDescription:
      "Complete hygienic care for your property's water storage—from overhead tank and underground sump deep cleaning to optional TDS measurement and tank overflow alarms.",
    featuredOnHomepage: true,
    homepageOrder: 1,
    primaryServiceSlug: "overhead-water-tank-cleaning",
    image: {
      src: "/images/water-tank.webp",
      alt: "Clean white residential overhead water storage tanks and piping on a sunlit terrace",
      width: 900,
      height: 600,
    },
    safetyOrScopeNote:
      "Note: Handheld TDS measurement checks dissolved mineral content and is offered as an optional check during tank cleaning.",
  },
  {
    id: "sofa-and-upholstery-care",
    slug: "sofa-and-upholstery-care",
    name: "Sofa & Upholstery Care",
    homepageTitle: "Sofa & Upholstery Care",
    shortDescription:
      "Deep vacuuming, fabric-safe shampooing and wet extraction for sofas, mattresses and office chairs.",
    fullDescription:
      "Revitalize the soft furnishings your family and guests use every day. We combine high-suction dry dust extraction with fabric-appropriate shampooing and moisture extraction for sofas, mattresses and office chairs.",
    featuredOnHomepage: true,
    homepageOrder: 2,
    primaryServiceSlug: "sofa-deep-cleaning",
    image: {
      src: "/images/sofa-cleaning.webp",
      alt: "Pristine light-beige fabric sectional sofa and cushions in a sunlit modern living room",
      width: 900,
      height: 600,
    },
  },
  {
    id: "bathroom-care",
    slug: "bathroom-care",
    name: "Bathroom Care",
    homepageTitle: "Bathroom Deep Cleaning",
    shortDescription:
      "Tile and grout scrubbing, hard-water scale removal, glass partition descaling and fixture sanitization.",
    fullDescription:
      "Restore hygiene and shine to your bathrooms without harsh acids that damage chrome or tile glaze. Includes hard-water descaling, grout detailing, and fixture polishing.",
    featuredOnHomepage: true,
    homepageOrder: 3,
    primaryServiceSlug: "bathroom-deep-cleaning",
    image: {
      src: "/images/bathroom-cleaning.webp",
      alt: "Sparkling clean modern walk-in bathroom with clear glass partition, porcelain tiles and wooden vanity",
      width: 900,
      height: 600,
    },
  },
  {
    id: "kitchen-care",
    slug: "kitchen-care",
    name: "Kitchen Care",
    homepageTitle: "Kitchen Deep Cleaning",
    shortDescription:
      "Thorough kitchen degreasing, backsplash care, countertop sanitization and sink maintenance.",
    fullDescription:
      "Cut through stubborn cooking oil, spice film and grease across countertops, backsplashes, modular cabinet exteriors, stovetops and sinks.",
    featuredOnHomepage: true,
    homepageOrder: 4,
    primaryServiceSlug: "kitchen-deep-cleaning",
    image: {
      src: "/images/kitchen-cleaning.webp",
      alt: "Spotless contemporary modular kitchen with gleaming white quartz countertop, stainless steel chimney and sink",
      width: 900,
      height: 600,
    },
  },
  {
    id: "floor-and-surface-care",
    slug: "floor-and-surface-care",
    name: "Floor & Surface Care",
    homepageTitle: "Floor & Surface Care",
    shortDescription:
      "Rotary machine scrubbing, tile and grout deep cleaning, and balcony floor maintenance.",
    fullDescription:
      "Deep machine floor scrubbing, tile and grout restoration, and balcony floor cleaning for residential and commercial spaces.",
    featuredOnHomepage: true,
    homepageOrder: 5,
    primaryServiceSlug: "floor-scrubbing",
    image: {
      src: "/images/floor-scrubbing.webp",
      alt: "Gleaming polished floor reflecting natural sunlight in a spacious modern apartment hallway",
      width: 900,
      height: 600,
    },
  },
  {
    id: "window-and-outdoor-care",
    slug: "window-and-outdoor-care",
    name: "Window & Outdoor Care",
    homepageTitle: "Window & Outdoor Care",
    shortDescription:
      "Accessible window and track cleaning, glass partitions, and balcony deep cleaning.",
    fullDescription:
      "Clear sliding tracks, streak-free interior and reachable balcony glass, and thorough balcony floor and railing scrubbing.",
    featuredOnHomepage: false,
    primaryServiceSlug: "accessible-window-cleaning",
    image: {
      src: "/images/window-cleaning.webp",
      alt: "Floor-to-ceiling streak-free sliding glass windows opening onto a sunlit apartment balcony",
      width: 900,
      height: 600,
    },
    safetyOrScopeNote:
      "Safety Note: Window cleaning covers interior glass and exterior glass safely reachable from inside or a balcony. High-rise rope-access exterior glass cleaning is not offered as an in-house service.",
  },
  {
    id: "complete-home-cleaning",
    slug: "complete-home-cleaning",
    name: "Complete Home Cleaning",
    homepageTitle: "Complete Home Cleaning",
    shortDescription:
      "Move-in, move-out and empty-flat deep cleaning, plus practical kitchen-bathroom and sofa-mattress bundles.",
    fullDescription:
      "Room-by-room deep cleaning for move-ins, end-of-tenancy handovers, vacant apartments and high-impact home hygiene bundles.",
    featuredOnHomepage: true,
    homepageOrder: 6,
    primaryServiceSlug: "move-in-cleaning",
    image: {
      src: "/images/complete-home.webp",
      alt: "Bright, spotless modern apartment living room ready for move-in with gleaming floors and clean glass doors",
      width: 900,
      height: 600,
    },
  },
  {
    id: "commercial-cleaning",
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    homepageTitle: "Commercial Cleaning",
    shortDescription:
      "Dedicated cleaning for offices, coworking spaces, PGs, hostels, cafés, gyms, clinics and housing societies.",
    fullDescription:
      "Dependable one-time and recurring facility care for workplaces, hospitality venues, healthcare clinics, student PGs and residential housing societies across Viman Nagar and nearby Pune hubs.",
    featuredOnHomepage: false,
    primaryServiceSlug: "office-and-coworking-cleaning",
    image: {
      src: "/images/commercial-office.webp",
      alt: "Clean, airy modern coworking office with spotless desks, ergonomic chairs and glass partitions",
      width: 900,
      height: 600,
    },
  },
];

export const allServices: ServiceItem[] = [...servicesPart1, ...servicesPart2];
export const allCatalogueServices: ServiceItem[] = allServices.filter((s) => !s.isAddOnOnly);

export function getFeaturedHomepageCategories(): ServiceCategory[] {
  return serviceCategories
    .filter((cat) => cat.featuredOnHomepage)
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
}

export function getCategoryById(id: CategoryId | string): ServiceCategory | undefined {
  return serviceCategories.find((cat) => cat.id === id || cat.slug === id);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return allServices.find((s) => s.slug === slug || s.id === slug);
}

export function getServicesByCategory(
  categoryId: CategoryId | string,
  includeAddOns = false
): ServiceItem[] {
  return allServices.filter(
    (s) => s.categoryId === categoryId && (includeAddOns || !s.isAddOnOnly)
  );
}

export interface ResolvedRecommendation {
  service: ServiceItem;
  relation: RelatedServiceRelation;
}

/**
 * Resolves structured related-service recommendations for a given service,
 * sorted by priority and capped at a maximum of 3 items per requirements.
 */
export function getRelatedRecommendations(
  service: ServiceItem,
  maxItems = 3
): ResolvedRecommendation[] {
  return [...service.relatedServices]
    .sort((a, b) => a.priority - b.priority)
    .map((relation) => {
      const target = getServiceBySlug(relation.serviceId);
      return target ? { service: target, relation } : null;
    })
    .filter((item): item is ResolvedRecommendation => item !== null)
    .slice(0, maxItems);
}

/**
 * Formats pricing label according to central site pricing policy.
 * Never displays unapproved prices as fixed rates.
 */
export function formatServicePriceLabel(service: ServiceItem): string {
  if (
    siteConfig.pricingPolicy.showIndicativeStartingPrices &&
    service.priceApproved &&
    typeof service.samplePrice === "number"
  ) {
    const prefix = service.priceMode === "starting_at" ? "Starting from " : "";
    const unit = service.unit ? ` (${service.unit})` : "";
    return `${prefix}${siteConfig.pricingPolicy.currencySymbol}${service.samplePrice.toLocaleString("en-IN")}${unit}`;
  }
  return "Get a Quote";
}

