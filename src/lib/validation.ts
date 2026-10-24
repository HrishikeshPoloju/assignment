import { allServices, serviceCategories } from "@/data/services";

export type ContactMethod = "WhatsApp" | "Phone Call" | "Either";

export type PropertyType =
  | "Apartment / Flat"
  | "Independent House / Villa"
  | "PG / Hostel"
  | "Office / Coworking"
  | "Restaurant / Café"
  | "Clinic / Gym / Retail"
  | "Housing Society";

export type TimeWindow =
  | "Morning (9:00 AM – 12:00 PM)"
  | "Afternoon (12:00 PM – 4:00 PM)"
  | "Evening (4:00 PM – 7:00 PM)"
  | "Flexible / Discuss on Call";

export interface BookingFormData {
  fullName: string;
  phone: string;
  preferredContact: ContactMethod;
  categoryId: string;
  serviceId: string;
  /** Multiple selected service slugs */
  serviceIds?: string[];
  addOnIds: string[];
  propertyType: PropertyType;
  locality: string;
  preferredDate: string;
  preferredTimeWindow: TimeWindow;
  addressAndInstructions: string;
  /** Optional quick scope/size tag selected via 1-tap pill (e.g., "2 BHK", "1,000L Tank", "5-Seater Sofa") */
  scopeSize?: string;
  consent: boolean;
  /** Exact geolocation address if detected via browser location */
  exactAddress?: string;
  /** Geolocation coordinates "lat,lng" */
  geoCoordinates?: string;
  /** Google Maps link for the detected location */
  mapsUrl?: string;
  /** Honeypot field for spam protection (must remain empty) */
  companyWebsite?: string;
}

export type BookingValidationErrors = Partial<Record<keyof BookingFormData, string>>;

const INDIAN_PHONE_REGEX = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

export function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, "").trim();
}

export function validateBookingForm(data: BookingFormData): {
  valid: boolean;
  errors: BookingValidationErrors;
} {
  const errors: BookingValidationErrors = {};

  const name = (data.fullName || "").trim();
  if (!name) {
    errors.fullName = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.fullName = "Name must be under 100 characters.";
  }

  const cleanedPhone = (data.phone || "").replace(/[\s()-]/g, "").trim();
  if (!cleanedPhone) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  } else if (!INDIAN_PHONE_REGEX.test(cleanedPhone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number (starting with 6–9, optional +91).";
  }

  if (!data.preferredContact || !["WhatsApp", "Phone Call", "Either"].includes(data.preferredContact)) {
    errors.preferredContact = "Please choose how you prefer to be contacted.";
  }

  if (!data.categoryId || !serviceCategories.some((c) => c.id === data.categoryId)) {
    errors.categoryId = "Please select a service category.";
  }

  const selectedServices =
    Array.isArray(data.serviceIds) && data.serviceIds.length > 0
      ? data.serviceIds
      : data.serviceId
      ? [data.serviceId]
      : [];

  if (
    selectedServices.length === 0 ||
    !selectedServices.some((slug) =>
      allServices.some((s) => s.id === slug || s.slug === slug)
    )
  ) {
    errors.serviceId = "Please select at least one service you need.";
  }

  if (!data.propertyType) {
    errors.propertyType = "Please select your property type.";
  }

  const locality = (data.locality || "").trim();
  if (!locality) {
    errors.locality = "Please select or enter your locality in Pune.";
  }

  if (!data.preferredDate) {
    errors.preferredDate = "Please select a preferred service date.";
  } else {
    const selected = new Date(`${data.preferredDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selected.getTime())) {
      errors.preferredDate = "Please enter a valid date.";
    } else if (selected < today) {
      errors.preferredDate = "Preferred date cannot be in the past.";
    }
  }

  if (!data.preferredTimeWindow) {
    errors.preferredTimeWindow = "Please select a preferred time window.";
  }

  if (data.addressAndInstructions && data.addressAndInstructions.length > 800) {
    errors.addressAndInstructions = "Additional instructions must be under 800 characters.";
  }

  if (!data.consent) {
    errors.consent =
      "Please confirm your consent for AquaShine to contact you regarding this enquiry.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

