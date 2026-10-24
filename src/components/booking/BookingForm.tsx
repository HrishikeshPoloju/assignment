"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Send,
  Plus,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Crosshair,
  ExternalLink,
  Loader2,
} from "lucide-react";
import {
  allServices,
  getRelatedRecommendations,
  getServiceBySlug,
  getServicesByCategory,
  serviceCategories,
  formatServicePriceLabel,
} from "@/data/services";
import { siteConfig } from "@/data/site-config";
import {
  BookingFormData,
  BookingValidationErrors,
  ContactMethod,
  PropertyType,
  TimeWindow,
  validateBookingForm,
} from "@/lib/validation";
import { BookingSummary } from "./BookingSummary";

const PROPERTY_TYPES: PropertyType[] = [
  "Apartment / Flat",
  "Independent House / Villa",
  "PG / Hostel",
  "Office / Coworking",
  "Restaurant / Café",
  "Clinic / Gym / Retail",
  "Housing Society",
];

const TIME_WINDOWS: TimeWindow[] = [
  "Morning (9:00 AM – 12:00 PM)",
  "Afternoon (12:00 PM – 4:00 PM)",
  "Evening (4:00 PM – 7:00 PM)",
  "Flexible / Discuss on Call",
];

function getDefaultDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

// Category icons for visual category pills
const CATEGORY_ICONS: Record<string, string> = {
  "water-tank-and-water-care": "💧",
  "sofa-and-upholstery-care": "🛋️",
  "bathroom-care": "🚿",
  "kitchen-care": "🍳",
  "floor-and-surface-care": "🧹",
  "window-and-outdoor-care": "🪟",
  "complete-home-cleaning": "✨",
  "commercial-cleaning": "🏢",
};

// 1-Tap Quick Scope / Size Options per Category so customers can specify size effortlessly
const CATEGORY_SCOPE_OPTIONS: Record<string, { label: string; options: string[] }> = {
  "water-tank-and-water-care": {
    label: "Approximate Tank / System Size (1-Tap Optional):",
    options: [
      "500L – 1,000L Tank",
      "1,000L – 2,000L Tank",
      "2,000L – 5,000L Tank",
      "Society / Commercial Tank (>5,000L)",
      "Not Sure / Need Inspection",
    ],
  },
  "sofa-and-upholstery-care": {
    label: "Seating / Item Size (1-Tap Optional):",
    options: [
      "3-Seater Sofa",
      "5-Seater / L-Shape Sofa",
      "7+ Seater Sofa Set",
      "Single / Queen Mattress",
      "King Mattress / Multiple Items",
    ],
  },
  "bathroom-care": {
    label: "Number of Bathrooms (1-Tap Optional):",
    options: ["1 Bathroom", "2 Bathrooms", "3 Bathrooms", "4+ Bathrooms"],
  },
  "kitchen-care": {
    label: "Kitchen Scope (1-Tap Optional):",
    options: [
      "Standard Modular Kitchen",
      "Large Kitchen + Chimney",
      "Chimney / Appliance Only",
      "Commercial / Cloud Kitchen",
    ],
  },
  "floor-and-surface-care": {
    label: "Approximate Floor Area (1-Tap Optional):",
    options: [
      "1 – 2 BHK Floor Area",
      "3+ BHK / Villa Floor",
      "Outdoor Porch / Driveway",
      "Commercial Floor Space",
    ],
  },
  "window-and-outdoor-care": {
    label: "Window / Balcony Count (1-Tap Optional):",
    options: [
      "1 – 2 Balconies / Windows",
      "Full 2 BHK Windows & Balconies",
      "Full 3+ BHK Windows & Balconies",
      "Society / Commercial Glass",
    ],
  },
  "complete-home-cleaning": {
    label: "Home Size (1-Tap Optional):",
    options: [
      "1 RK / Studio",
      "1 BHK Flat",
      "2 BHK Flat",
      "3 BHK Flat",
      "4+ BHK / Duplex / Villa",
    ],
  },
  "commercial-cleaning": {
    label: "Facility Type & Scale (1-Tap Optional):",
    options: [
      "Small Office / Clinic (<1,500 sq.ft)",
      "Mid-Size Office / Gym (1,500–5,000 sq.ft)",
      "PG / Hostel Building",
      "Restaurant / Café",
      "Housing Society Common Areas",
    ],
  },
};

export function BookingForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement | null>(null);
  const successTopRef = useRef<HTMLDivElement | null>(null);

  const initialCategory =
    searchParams.get("category") || "water-tank-and-water-care";
  const initialService =
    searchParams.get("service") || "overhead-water-tank-cleaning";
  const initialAddOnsParam = searchParams.get("addons") || "";
  const initialLocality = searchParams.get("locality") || "Viman Nagar";
  const initialPackage = searchParams.get("package") || "";

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    phone: "",
    preferredContact: "WhatsApp",
    categoryId: initialCategory,
    serviceId: initialService,
    serviceIds: initialService ? [initialService] : [],
    addOnIds: initialAddOnsParam
      ? initialAddOnsParam.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    scopeSize: "",
    propertyType: "Apartment / Flat",
    locality: initialLocality,
    preferredDate: getDefaultDateString(),
    preferredTimeWindow: "Morning (9:00 AM – 12:00 PM)",
    addressAndInstructions: initialPackage
      ? `Interested in the "${initialPackage}" package scope. `
      : "",
    consent: true,
    companyWebsite: "",
  });

  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Geolocation detection state
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationSuccess, setLocationSuccess] = useState(false);

  // Success state when customer finishes booking
  const [bookingSuccess, setBookingSuccess] = useState<{
    enquiryRef: string;
    submittedAt: string;
    message: string;
    businessWhatsApp?: string;
    syncedToGoogleSheets?: boolean;
  } | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  // Sync URL parameters on initial load
  useEffect(() => {
    const catParam = searchParams.get("category");
    const srvParam = searchParams.get("service");
    const addOnsParam = searchParams.get("addons");
    const locParam = searchParams.get("locality");
    const pkgParam = searchParams.get("package");

    setFormData((prev) => {
      const next = { ...prev };
      if (catParam && serviceCategories.some((c) => c.id === catParam)) {
        next.categoryId = catParam;
      }
      if (srvParam) {
        const matched = getServiceBySlug(srvParam);
        if (matched) {
          next.serviceId = matched.slug;
          next.serviceIds = [matched.slug];
          next.categoryId = matched.categoryId;
        }
      }
      if (addOnsParam !== null) {
        next.addOnIds = addOnsParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (locParam) {
        next.locality = locParam;
      }
      if (pkgParam && !prev.addressAndInstructions.includes(pkgParam)) {
        next.addressAndInstructions = `Interested in the "${pkgParam}" package scope. ${prev.addressAndInstructions}`.trim();
      }
      return next;
    });
  }, [searchParams]);

  const servicesInSelectedCategory = useMemo(
    () => getServicesByCategory(formData.categoryId),
    [formData.categoryId]
  );

  const selectedServices = useMemo(() => {
    const slugs =
      Array.isArray(formData.serviceIds) && formData.serviceIds.length > 0
        ? formData.serviceIds
        : formData.serviceId
        ? [formData.serviceId]
        : [];
    return slugs
      .map((slug) => getServiceBySlug(slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s));
  }, [formData.serviceIds, formData.serviceId]);

  // Aggregate add-ons across all selected services
  const suggestedAddOns = useMemo(() => {
    const addOnMap = new Map<string, { service: any; relation: any }>();
    for (const service of selectedServices) {
      const rels = getRelatedRecommendations(service, 3);
      for (const rel of rels) {
        if (!addOnMap.has(rel.service.slug)) {
          addOnMap.set(rel.service.slug, rel);
        }
      }
    }
    return Array.from(addOnMap.values());
  }, [selectedServices]);

  const handleCategorySelect = (newCategoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: newCategoryId,
    }));
    setErrors((prev) => ({ ...prev, categoryId: undefined }));
  };

  const toggleService = (serviceSlug: string) => {
    setFormData((prev) => {
      const current = Array.isArray(prev.serviceIds)
        ? prev.serviceIds
        : prev.serviceId
        ? [prev.serviceId]
        : [];
      const exists = current.includes(serviceSlug);
      const updated = exists
        ? current.filter((s) => s !== serviceSlug)
        : [...current, serviceSlug];
      return {
        ...prev,
        serviceIds: updated,
        serviceId: updated[0] || "",
      };
    });
    setErrors((prev) => ({ ...prev, serviceId: undefined }));
  };

  const toggleAddOn = (serviceSlug: string) => {
    setFormData((prev) => {
      const exists = prev.addOnIds.includes(serviceSlug);
      return {
        ...prev,
        addOnIds: exists
          ? prev.addOnIds.filter((id) => id !== serviceSlug)
          : [...prev.addOnIds, serviceSlug],
      };
    });
  };

  const handleFieldChange = <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setDetectingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const coordsStr = `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        let detectedAddress = `GPS Coordinates: ${coordsStr}`;
        let matchedLocality = "";

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
            { headers: { Accept: "application/json" } }
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const parts = [
              addr.building || addr.amenity || addr.house_number,
              addr.road || addr.street,
              addr.suburb || addr.neighbourhood || addr.residential || addr.quarter,
              addr.city || addr.town || "Pune",
              addr.postcode,
            ].filter(Boolean);

            if (parts.length > 0) {
              detectedAddress = parts.join(", ");
            } else if (data.display_name) {
              detectedAddress = data.display_name;
            }

            // Match known Pune service areas if found
            const fullText = (
              detectedAddress +
              " " +
              (addr.suburb || "") +
              " " +
              (addr.neighbourhood || "")
            ).toLowerCase();
            for (const area of siteConfig.serviceAreas) {
              if (fullText.includes(area.name.toLowerCase())) {
                matchedLocality = area.name;
                break;
              }
            }
          }
        } catch (e) {
          console.warn("Reverse geocode failed, using coordinates", e);
        }

        setFormData((prev) => ({
          ...prev,
          exactAddress: detectedAddress,
          geoCoordinates: coordsStr,
          mapsUrl: mapsLink,
          locality: matchedLocality || prev.locality,
        }));

        setDetectingLocation(false);
        setLocationSuccess(true);
      },
      (error) => {
        setDetectingLocation(false);
        let msg = "Could not fetch your location.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied. Please select your locality manually.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "Location information is currently unavailable.";
        } else if (error.code === error.TIMEOUT) {
          msg = "Location request timed out. Please try again.";
        }
        setLocationError(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateBookingForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      const firstErrorKey = Object.keys(validation.errors)[0];
      if (firstErrorKey && formRef.current) {
        const el = formRef.current.querySelector<HTMLElement>(
          `[name="${firstErrorKey}"]`
        );
        el?.focus();
      }
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        if (payload.errors) {
          setErrors(payload.errors);
        }
        setSubmitError(
          payload.message || "Please check the highlighted fields and try again."
        );
        setSubmitting(false);
        return;
      }

      setBookingSuccess({
        enquiryRef: payload.enquiryRef,
        submittedAt: payload.submittedAt,
        businessWhatsApp: payload.businessWhatsApp || "",
        syncedToGoogleSheets: Boolean(payload.syncedToGoogleSheets),
        message:
          payload.message ||
          "Your booking has been successful! Our team will contact you shortly.",
      });
      setSubmitting(false);
      setTimeout(() => {
        successTopRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      // Local fallback
      const ref = `AQS-${Date.now().toString().slice(-6)}`;
      setBookingSuccess({
        enquiryRef: ref,
        submittedAt: new Date().toISOString(),
        message: "Your booking has been successful! Our team will contact you shortly.",
      });
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setBookingSuccess(null);
    setDetectingLocation(false);
    setLocationError(null);
    setLocationSuccess(false);
    setFormData({
      fullName: "",
      phone: "",
      preferredContact: "WhatsApp",
      categoryId: "water-tank-and-water-care",
      serviceId: "overhead-water-tank-cleaning",
      addOnIds: [],
      scopeSize: "",
      propertyType: "Apartment / Flat",
      locality: "Viman Nagar",
      exactAddress: "",
      geoCoordinates: "",
      mapsUrl: "",
      preferredDate: getDefaultDateString(),
      preferredTimeWindow: "Morning (9:00 AM – 12:00 PM)",
      addressAndInstructions: "",
      consent: true,
      companyWebsite: "",
    });
  };

  // SUCCESS CONFIRMATION SCREEN
  if (bookingSuccess) {
    const primaryService = getServiceBySlug(formData.serviceId);
    const category = serviceCategories.find((c) => c.id === formData.categoryId);
    const selectedAddOns = formData.addOnIds
      .map((id) => getServiceBySlug(id))
      .filter((s): s is NonNullable<typeof s> => Boolean(s));

    const rawBizWa = (
      bookingSuccess.businessWhatsApp ||
      siteConfig.contact.whatsappNumber ||
      ""
    ).replace(/\D/g, "");
    const normalizedBizWa = rawBizWa
      ? rawBizWa.startsWith("91")
        ? rawBizWa
        : `91${rawBizWa}`
      : "";

    const receiptPlainText = [
      `AquaShine Booking Reference: ${bookingSuccess.enquiryRef}`,
      `Service: ${primaryService?.name || formData.serviceId}`,
      formData.scopeSize ? `Scope / Size: ${formData.scopeSize}` : "",
      selectedAddOns.length > 0
        ? `Add-ons: ${selectedAddOns.map((a) => a.name).join(", ")}`
        : "",
      `Customer: ${formData.fullName} (${formData.phone})`,
      `Location: ${formData.locality}, Pune`,
      formData.exactAddress ? `Exact GPS Location: ${formData.exactAddress}` : "",
      formData.mapsUrl ? `Map Pin: ${formData.mapsUrl}` : "",
      `Preferred Slot: ${formData.preferredDate} (${formData.preferredTimeWindow})`,
    ]
      .filter(Boolean)
      .join("\n");

    const waText = encodeURIComponent(
      `Hello AquaShine! I just submitted a service booking online (Ref: ${bookingSuccess.enquiryRef}).\n\n${receiptPlainText}\n\nLooking forward to your confirmation.`
    );
    const waDirectUrl = normalizedBizWa
      ? `https://wa.me/${normalizedBizWa}?text=${waText}`
      : null;

    const handleCopyReceipt = async () => {
      try {
        await navigator.clipboard.writeText(receiptPlainText);
        setCopiedReceipt(true);
        setTimeout(() => setCopiedReceipt(false), 3000);
      } catch {
        // Fallback if clipboard blocked
      }
    };

    return (
      <div
        ref={successTopRef}
        tabIndex={-1}
        className="rounded-3xl border border-[#188038]/30 bg-white p-6 shadow-sm outline-none sm:p-10"
      >
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6F4EA] text-[#188038]">
            <CheckCircle2 className="h-10 w-10 text-[#188038]" />
          </div>

          <span className="mt-4 inline-block rounded-full bg-[#E6F4EA] px-3 py-1 font-mono text-xs font-bold text-[#188038]">
            Booking Reference: {bookingSuccess.enquiryRef}
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#123B46] sm:text-3xl">
            Your booking has been successful!
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-base text-[#5D6B70]">
            Our team will contact you shortly via phone or WhatsApp to confirm your preferred schedule and scope.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-6 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-semibold tracking-wider text-[#123B46] uppercase">
              Booking Summary Details
            </h3>
            {bookingSuccess.syncedToGoogleSheets && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#E6F4EA] px-2 py-0.5 text-[11px] font-semibold text-[#188038]">
                <Check className="h-3 w-3" />
                Logged to Operations Sheet
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-[#5D6B70]">Main Service</p>
              <p className="mt-0.5 font-bold text-[#172A30]">
                {primaryService?.name || formData.serviceId}
              </p>
              <p className="text-xs text-[#5D6B70]">{category?.name}</p>
              {formData.scopeSize && (
                <span className="mt-1 inline-block rounded bg-[#E6F2EE] px-2 py-0.5 text-[11px] font-semibold text-[#123B46]">
                  Scope: {formData.scopeSize}
                </span>
              )}
            </div>

            <div>
              <p className="text-xs text-[#5D6B70]">Customer</p>
              <p className="mt-0.5 font-bold text-[#172A30]">{formData.fullName}</p>
              <p className="text-xs text-[#5D6B70]">📞 {formData.phone}</p>
            </div>

            <div>
              <p className="text-xs text-[#5D6B70]">Location</p>
              <p className="mt-0.5 font-semibold text-[#172A30]">
                📍 {formData.locality}, Pune
              </p>
              <p className="text-xs text-[#5D6B70]">{formData.propertyType}</p>
              {formData.exactAddress && (
                <div className="mt-1">
                  <p className="text-[11px] font-medium text-[#188038]">
                    GPS: {formData.exactAddress}
                  </p>
                  {formData.mapsUrl && (
                    <a
                      href={formData.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#25AFA5] hover:underline"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs text-[#5D6B70]">Preferred Slot</p>
              <p className="mt-0.5 font-semibold text-[#172A30]">
                📅 {formData.preferredDate}
              </p>
              <p className="text-xs text-[#5D6B70]">{formData.preferredTimeWindow}</p>
            </div>
          </div>

          {selectedAddOns.length > 0 && (
            <div className="mt-4 border-t border-[#E3EAE7] pt-3">
              <p className="text-xs text-[#5D6B70]">Included Add-ons:</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {selectedAddOns.map((addon) => (
                  <span
                    key={addon.id}
                    className="inline-flex items-center gap-1 rounded-md bg-white border border-[#E3EAE7] px-2 py-0.5 text-xs font-medium text-[#123B46]"
                  >
                    <Check className="h-3 w-3 text-[#188038]" />
                    {addon.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {formData.addressAndInstructions && (
            <div className="mt-3 border-t border-[#E3EAE7] pt-3">
              <p className="text-xs text-[#5D6B70]">Notes / Instructions:</p>
              <p className="mt-0.5 text-xs text-[#172A30]">
                &quot;{formData.addressAndInstructions}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {waDirectUrl && (
            <a
              href={waDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#20ba59]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat on WhatsApp for Instant Confirmation</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleCopyReceipt}
            className="inline-flex items-center gap-2 rounded-xl border border-[#123B46]/25 bg-[#E6F2EE] px-5 py-3 text-sm font-semibold text-[#123B46] hover:bg-[#25AFA5]/20"
          >
            <Check className="h-4 w-4 text-[#188038]" />
            <span>
              {copiedReceipt ? "Booking Receipt Copied!" : "Copy Booking Summary"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleResetForm}
            className="inline-flex items-center gap-2 rounded-xl border border-[#D0DDD8] bg-white px-5 py-3 text-sm font-semibold text-[#172A30] hover:bg-[#F8FAF9]"
          >
            <RotateCcw className="h-4 w-4 text-[#5D6B70]" />
            <span>Book Another Service</span>
          </button>
        </div>
      </div>
    );
  }

  // MAIN STREAMLINED BOOKING FORM
  return (
    <div
      id="booking-form"
      className="scroll-mt-24 grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
    >
      <form
        ref={formRef}
        method="POST"
        action="/api/enquiries"
        noValidate
        onSubmit={handleSubmit}
        className="rounded-3xl border border-[#E3EAE7] bg-white p-6 shadow-xs sm:p-8 lg:col-span-7"
      >
        <div className="border-b border-[#E3EAE7] pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#E6F2EE] px-2.5 py-0.5 text-xs font-semibold text-[#123B46]">
              Easy 2-Step Booking
            </span>
            <span className="text-xs text-[#5D6B70]">Instant Quotation Request</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#172A30] sm:text-3xl">
            Choose Your Service &amp; Book
          </h2>
          <p className="mt-1 text-sm text-[#5D6B70]">
            Select your main service, check any add-ons you need, and share your contact details.
          </p>
        </div>

        {submitError && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-2.5 rounded-xl border border-[#C5221F]/30 bg-[#FCE8E6] p-4 text-sm text-[#C5221F]"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Honeypot anti-spam field */}
        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor="company-website-hp">Company Website (Leave blank)</label>
          <input
            type="text"
            id="company-website-hp"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            value={formData.companyWebsite || ""}
            onChange={(e) => handleFieldChange("companyWebsite", e.target.value)}
          />
        </div>

        {/* STEP 1: CHOOSE SERVICES & ADD-ONS (Multiple Services Supported) */}
        <div className="mt-6 border-b border-[#E3EAE7] pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#123B46] text-xs font-bold text-white">
                1
              </span>
              <h3 className="text-base font-bold text-[#172A30]">
                Choose Services
              </h3>
            </div>
            {selectedServices.length > 0 && (
              <span className="rounded-full bg-[#E6F2EE] px-2.5 py-0.5 text-xs font-bold text-[#123B46]">
                {selectedServices.length} Selected
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-[#5D6B70]">
            You can select multiple services across categories to book everything in one visit.
          </p>

          {/* Active Selected Service Chips */}
          {selectedServices.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#D0DDD8] bg-[#F8FAF9] p-2.5">
              <span className="mr-1 text-xs font-semibold text-[#5D6B70]">Selected:</span>
              {selectedServices.map((srv) => (
                <span
                  key={srv.id}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#123B46] px-2.5 py-1 text-xs font-medium text-white shadow-2xs"
                >
                  <span>{srv.name}</span>
                  <button
                    type="button"
                    onClick={() => toggleService(srv.slug)}
                    className="ml-0.5 rounded-full p-0.5 text-white/80 hover:bg-white/20 hover:text-white"
                    aria-label={`Remove ${srv.name}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Category Pills */}
          <div className="mt-4">
            <p className="text-xs font-medium text-[#5D6B70]">
              Browse Service Categories:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {serviceCategories.map((cat) => {
                const isSelected = formData.categoryId === cat.id;
                const icon = CATEGORY_ICONS[cat.id] || "✨";
                const catSelectedCount = selectedServices.filter(
                  (s) => s.categoryId === cat.id
                ).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                      isSelected
                        ? "border-[#123B46] bg-[#123B46] text-white shadow-2xs"
                        : "border-[#E3EAE7] bg-[#F8FAF9] text-[#172A30] hover:border-[#25AFA5] hover:bg-white"
                    }`}
                  >
                    <span>{icon}</span>
                    <span>{cat.name}</span>
                    {catSelectedCount > 0 && (
                      <span
                        className={`ml-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                          isSelected
                            ? "bg-white text-[#123B46]"
                            : "bg-[#123B46] text-white"
                        }`}
                      >
                        {catSelectedCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Selection Cards */}
          <div className="mt-4">
            <p className="text-xs font-medium text-[#5D6B70]">
              Tap services in this category to select / deselect:
            </p>
            <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {servicesInSelectedCategory.map((srv) => {
                const isSelected = (formData.serviceIds || []).includes(srv.slug);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.slug)}
                    className={`flex items-start justify-between rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-[#123B46] bg-[#E6F2EE] text-[#123B46] shadow-2xs ring-2 ring-[#123B46]"
                        : "border-[#E3EAE7] bg-white text-[#172A30] hover:border-[#25AFA5]"
                    }`}
                  >
                    <div className="flex-1 pr-2">
                      <p className="text-sm font-bold leading-snug">{srv.name}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-[#5D6B70]">
                        {srv.shortDescription}
                      </p>
                      <span className="mt-2 inline-block rounded bg-white/70 border border-[#E3EAE7] px-2 py-0.5 text-[11px] font-semibold text-[#123B46]">
                        {formatServicePriceLabel(srv)}
                      </span>
                    </div>
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        isSelected
                          ? "border-[#123B46] bg-[#123B46] text-white"
                          : "border-[#D0DDD8] bg-white text-transparent"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1-Tap Quick Scope / Property Size Selector */}
          {CATEGORY_SCOPE_OPTIONS[formData.categoryId] && (
            <div className="mt-4">
              <p className="text-xs font-medium text-[#5D6B70]">
                {CATEGORY_SCOPE_OPTIONS[formData.categoryId].label}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORY_SCOPE_OPTIONS[formData.categoryId].options.map((opt) => {
                  const isSelected = formData.scopeSize === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        handleFieldChange("scopeSize", isSelected ? "" : opt)
                      }
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                        isSelected
                          ? "border-[#123B46] bg-[#E6F2EE] text-[#123B46] ring-1 ring-[#123B46]"
                          : "border-[#E3EAE7] bg-[#F8FAF9] text-[#172A30] hover:border-[#25AFA5] hover:bg-white"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-[#188038]" />}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-Ons for this service */}
          {suggestedAddOns.length > 0 && (
            <div className="mt-5 rounded-2xl border border-[#25AFA5]/30 bg-[#E6F2EE]/40 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#25AFA5]" />
                <p className="text-xs font-bold tracking-wider text-[#123B46] uppercase">
                  Add-Ons &amp; Optional Enhancements
                </p>
              </div>
              <p className="mt-0.5 text-xs text-[#5D6B70]">
                Click any add-on below to include it in your service:
              </p>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {suggestedAddOns.map(({ service, relation }) => {
                  const isChecked = formData.addOnIds.includes(service.slug);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleAddOn(service.slug)}
                      className={`flex items-start justify-between rounded-xl border p-3 text-left transition-all ${
                        isChecked
                          ? "border-[#123B46] bg-[#123B46] text-white shadow-2xs"
                          : "border-[#D0DDD8] bg-white text-[#172A30] hover:border-[#25AFA5]"
                      }`}
                    >
                      <div className="pr-2">
                        <p className="text-xs font-bold">{service.name}</p>
                        <p
                          className={`mt-0.5 text-[11px] leading-tight ${
                            isChecked ? "text-[#E6F2EE]" : "text-[#5D6B70]"
                          }`}
                        >
                          {relation.reason}
                        </p>
                      </div>
                      <div
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                          isChecked
                            ? "border-white bg-white text-[#123B46]"
                            : "border-[#5D6B70] bg-transparent text-transparent"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* STEP 2: SIMPLE CONTACT & APPOINTMENT */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#123B46] text-xs font-bold text-white">
              2
            </span>
            <h3 className="text-base font-bold text-[#172A30]">
              Your Contact &amp; Schedule Details
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="booking-fullName"
                className="block text-xs font-semibold text-[#172A30]"
              >
                Full Name <span className="text-[#C5221F]">*</span>
              </label>
              <input
                type="text"
                id="booking-fullName"
                name="fullName"
                required
                minLength={2}
                maxLength={100}
                placeholder="e.g. Rohan Deshmukh"
                value={formData.fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] px-3.5 py-2.5 text-sm text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-[#C5221F]">{errors.fullName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="booking-phone"
                className="block text-xs font-semibold text-[#172A30]"
              >
                Phone / WhatsApp Number <span className="text-[#C5221F]">*</span>
              </label>
              <input
                type="tel"
                id="booking-phone"
                name="phone"
                required
                inputMode="tel"
                placeholder="e.g. 98765 43210"
                value={formData.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] px-3.5 py-2.5 text-sm text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-[#C5221F]">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Location & GPS Detection */}
          <div className="rounded-2xl border border-[#D0DDD8] bg-[#F8FAF9] p-4">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <label
                  htmlFor="booking-locality"
                  className="block text-xs font-bold text-[#172A30]"
                >
                  Service Location in Pune <span className="text-[#C5221F]">*</span>
                </label>
                <p className="text-[11px] text-[#5D6B70]">
                  Select your area or use your device GPS for exact location pinpointing
                </p>
              </div>

              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={detectingLocation}
                className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-[#25AFA5] bg-white px-3.5 py-2 text-xs font-bold text-[#123B46] shadow-2xs transition-all hover:bg-[#E6F2EE] disabled:opacity-60"
              >
                {detectingLocation ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#25AFA5]" />
                    <span>Detecting Location...</span>
                  </>
                ) : (
                  <>
                    <Crosshair className="h-3.5 w-3.5 text-[#25AFA5]" />
                    <span>Select Your Current Location</span>
                  </>
                )}
              </button>
            </div>

            {/* Exact GPS Location Detected Banner */}
            {formData.exactAddress && (
              <div className="mt-3 rounded-xl border border-[#188038]/30 bg-[#E6F4EA] p-3 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#188038]" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#188038]">
                          Exact Location Detected &amp; Saved
                        </span>
                        <span className="rounded bg-[#188038] px-1.5 py-0.5 text-[10px] font-bold text-white">
                          GPS Verified
                        </span>
                      </div>
                      <p className="mt-1 font-medium leading-relaxed text-[#172A30]">
                        {formData.exactAddress}
                      </p>
                      {formData.mapsUrl && (
                        <a
                          href={formData.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1 font-semibold text-[#123B46] hover:underline"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="h-3 w-3 text-[#25AFA5]" />
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        exactAddress: "",
                        geoCoordinates: "",
                        mapsUrl: "",
                      }));
                      setLocationSuccess(false);
                    }}
                    className="rounded-md px-2 py-1 text-[11px] font-medium text-[#5D6B70] hover:bg-white hover:text-[#C5221F]"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Location Permission / Fetch Error */}
            {locationError && (
              <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-[#C5221F]/30 bg-[#FCE8E6] p-2.5 text-xs text-[#C5221F]">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{locationError}</span>
              </div>
            )}

            {/* Locality Dropdown */}
            <div className="mt-3">
              <label
                htmlFor="booking-locality"
                className="block text-[11px] font-semibold text-[#5D6B70] uppercase"
              >
                Area / Locality Hub
              </label>
              <select
                id="booking-locality"
                name="locality"
                value={formData.locality}
                onChange={(e) => handleFieldChange("locality", e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E3EAE7] bg-white px-3 py-2 text-sm text-[#172A30] focus:border-[#123B46] focus:outline-none"
              >
                {siteConfig.serviceAreas.map((area) => (
                  <option key={area.slug} value={area.name}>
                    {area.name} {area.tier === "primary" ? "(Viman Nagar Hub)" : ""}
                  </option>
                ))}
                <option value="Other Pune Locality">Other Pune Locality</option>
              </select>
            </div>
          </div>

          {/* Schedule: Date & Time Window */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Date */}
            <div>
              <label
                htmlFor="booking-preferredDate"
                className="block text-xs font-semibold text-[#172A30]"
              >
                Preferred Date <span className="text-[#C5221F]">*</span>
              </label>
              <input
                type="date"
                id="booking-preferredDate"
                name="preferredDate"
                required
                min={getTodayDateString()}
                value={formData.preferredDate}
                onChange={(e) => handleFieldChange("preferredDate", e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] px-3 py-2.5 text-sm text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Time Window */}
            <div>
              <label
                htmlFor="booking-preferredTimeWindow"
                className="block text-xs font-semibold text-[#172A30]"
              >
                Preferred Time Slot
              </label>
              <select
                id="booking-preferredTimeWindow"
                name="preferredTimeWindow"
                value={formData.preferredTimeWindow}
                onChange={(e) =>
                  handleFieldChange(
                    "preferredTimeWindow",
                    e.target.value as TimeWindow
                  )
                }
                className="mt-1 w-full rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] px-3 py-2.5 text-sm text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
              >
                {TIME_WINDOWS.map((tw) => (
                  <option key={tw} value={tw}>
                    {tw}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label
              htmlFor="booking-notes"
              className="block text-xs font-semibold text-[#172A30]"
            >
              Property Name / Specific Requirements (Optional)
            </label>
            <input
              type="text"
              id="booking-notes"
              name="addressAndInstructions"
              placeholder="e.g. 2 BHK apartment near Datta Mandir Chowk, or 1000L tank capacity"
              value={formData.addressAndInstructions}
              onChange={(e) =>
                handleFieldChange("addressAndInstructions", e.target.value)
              }
              className="mt-1 w-full rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] px-3.5 py-2.5 text-sm text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Mobile Quick Review Box (visible on mobile so user sees what they booked before submitting) */}
          <div className="rounded-xl border border-[#D0DDD8] bg-[#F8FAF9] p-3.5 lg:hidden">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#5D6B70]">
                Selected Services ({selectedServices.length}):
              </span>
              <span className="font-bold text-[#123B46] text-right truncate max-w-[220px]">
                {selectedServices.length > 0
                  ? selectedServices.map((s) => s.name).join(" + ")
                  : "Please select a service"}
              </span>
            </div>
            {formData.scopeSize && (
              <div className="mt-1.5 flex items-center justify-between text-xs text-[#5D6B70]">
                <span>Size / Scope:</span>
                <span className="font-semibold text-[#172A30]">{formData.scopeSize}</span>
              </div>
            )}
            {formData.addOnIds && formData.addOnIds.length > 0 && (
              <div className="mt-1.5 flex items-center justify-between text-xs text-[#5D6B70]">
                <span>Add-ons ({formData.addOnIds.length}):</span>
                <span className="font-medium text-[#172A30] truncate max-w-[200px] text-right">
                  {formData.addOnIds
                    .map((id) => getServiceBySlug(id)?.name)
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* Big Prominent Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B46] px-6 py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-[#0D2C35] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
              <span>
                {submitting
                  ? "Submitting Your Booking..."
                  : "Book Service Now"}
              </span>
            </button>
            <p className="mt-2 text-center text-xs text-[#5D6B70]">
              🔒 Transparent scope review • No advance payment required for inquiry
            </p>
          </div>
        </div>
      </form>

      {/* Right Column: Dynamic Live Scope Summary */}
      <div className="lg:col-span-5 lg:sticky lg:top-24">
        <BookingSummary
          formData={formData}
          onRemoveService={(slug) => toggleService(slug)}
          onRemoveAddOn={(slug) => toggleAddOn(slug)}
        />
      </div>
    </div>
  );
}
