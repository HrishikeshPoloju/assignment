export type CategoryId =
  | "water-tank-and-water-care"
  | "sofa-and-upholstery-care"
  | "bathroom-care"
  | "kitchen-care"
  | "floor-and-surface-care"
  | "window-and-outdoor-care"
  | "complete-home-cleaning"
  | "commercial-cleaning";

export type FulfillmentType = "direct" | "partner" | "product";

export type PriceMode = "fixed" | "starting_at" | "per_unit" | "quote_required";

export type RelationshipType = "add-on" | "complementary" | "follow-up" | "maintenance";

export interface RelatedServiceRelation {
  serviceId: string;
  relationshipType: RelationshipType;
  priority: number;
  reason: string;
  eligibilityCondition?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  categoryId: CategoryId;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  importantNotice?: string;
  isAddOnOnly?: boolean;
  fulfillmentType: FulfillmentType;
  fulfillmentLabel: string;
  priceMode: PriceMode;
  samplePrice?: number;
  priceApproved: boolean;
  unit?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  idealFor: string[];
  includedScope: string[];
  exclusions: string[];
  relatedServices: RelatedServiceRelation[];
  faqs: ServiceFAQ[];
}

export interface ServiceCategory {
  id: CategoryId;
  slug: string;
  name: string;
  homepageTitle: string;
  shortDescription: string;
  fullDescription: string;
  featuredOnHomepage: boolean;
  homepageOrder?: number;
  primaryServiceSlug: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  safetyOrScopeNote?: string;
}

