"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Plus,
  Check,
  X,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Crosshair,
  ExternalLink,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  allCatalogueServices,
  allServices,
  getCategoryById,
  getServiceBySlug,
  serviceCategories,
  formatServicePriceLabel,
  ServiceItem,
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

const PROPERTY_TYPES: PropertyType[] = [
  "Apartment / Flat",
  "Independent House / Villa",
  "PG / Hostel",
  "Office / Coworking",
  "Restaurant / Café",
  "Housing Society",
];

const TIME_WINDOWS: TimeWindow[] = [
  "Morning (9:00 AM – 12:00 PM)",
  "Afternoon (12:00 PM – 4:00 PM)",
  "Evening (4:00 PM – 7:00 PM)",
  "Flexible / Discuss on Call",
];

const QUICK_LOCALITIES = [
  "Viman Nagar",
  "Kharadi",
  "Kalyani Nagar",
  "Wadgaon Sheri",
  "Koregaon Park",
  "Magarpatta",
  "Other Pune Area",
];

function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function getDayAfterDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().slice(0, 10);
}

export const EXACT_WHATSAPP_URL =
  "https://wa.me/917995770546?text=Hi%20AquaShine%21%20I%20want%20to%20book%20a%20cleaning%20service.%0AService%3A%20%0AArea%20%2F%20Pincode%3A%20%0APreferred%20date%3A%20%0AProperty%20type%3A%20Home%20%2F%20Society%20%2F%20Office";

export const DIRECT_PHONE = "+91 79957 70546";
export const DIRECT_PHONE_TEL = "tel:+917995770546";

export function BookingForm() {
  const searchParams = useSearchParams();

  // Wizard Step: 1 = Service Selection, 2 = Fast Details, 3 = Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Service Selection State
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    "overhead-water-tank-cleaning",
  ]);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Form Fields State (Page 2)
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    phone: "",
    preferredContact: "WhatsApp",
    categoryId: "water-tank-and-water-care",
    serviceId: "overhead-water-tank-cleaning",
    serviceIds: ["overhead-water-tank-cleaning"],
    addOnIds: [],
    propertyType: "Apartment / Flat",
    locality: "Viman Nagar",
    exactAddress: "",
    geoCoordinates: "",
    mapsUrl: "",
    preferredDate: getTomorrowDateString(),
    preferredTimeWindow: "Morning (9:00 AM – 12:00 PM)",
    addressAndInstructions: "",
    scopeSize: "",
    consent: true,
  });

  // UI / Submission state
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<{
    enquiryRef: string;
    submittedAt: string;
    waUrl?: string;
  } | null>(null);

  // GPS state
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Read URL query params on mount
  useEffect(() => {
    const rawServicesParam = searchParams?.get("services");
    const rawServiceParam = searchParams?.get("service");
    const rawCategoryParam = searchParams?.get("category");
    const urgentParam = searchParams?.get("urgent");

    const initialSlugs: string[] = [];
    if (rawServicesParam) {
      initialSlugs.push(
        ...rawServicesParam.split(",").map((s) => s.trim()).filter(Boolean)
      );
    } else if (rawServiceParam) {
      initialSlugs.push(rawServiceParam.trim());
    }

    if (initialSlugs.length > 0) {
      setSelectedServiceIds(initialSlugs);
      const firstService = getServiceBySlug(initialSlugs[0]);
      if (firstService) {
        setSelectedCategory(firstService.categoryId);
      }
      // If user came via "Instant Service / urgent", jump directly to fast details!
      if (urgentParam === "true") {
        setCurrentStep(2);
      }
    } else if (rawCategoryParam) {
      setSelectedCategory(rawCategoryParam);
    }
  }, [searchParams]);

  // Keep formData synced with selected services
  useEffect(() => {
    const primaryId = selectedServiceIds[0] || "overhead-water-tank-cleaning";
    const primaryService = getServiceBySlug(primaryId);
    setFormData((prev) => ({
      ...prev,
      serviceIds: selectedServiceIds,
      serviceId: primaryId,
      categoryId: primaryService?.categoryId || prev.categoryId,
      addOnIds: selectedAddOnIds,
    }));
  }, [selectedServiceIds, selectedAddOnIds]);

  // Toggle service selection
  const toggleService = (slug: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(slug)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((id) => id !== slug);
      }
      return [...prev, slug];
    });
  };

  const removeService = (slug: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((id) => id !== slug);
    });
  };

  // Toggle add-on selection
  const toggleAddOn = (slug: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug]
    );
  };

  // Filtered services for Step 1
  const filteredServices = useMemo(() => {
    if (selectedCategory === "all") {
      return allCatalogueServices;
    }
    return allCatalogueServices.filter((s) => s.categoryId === selectedCategory);
  }, [selectedCategory]);

  // Estimated starting total for selected services
  const startingEstimate = useMemo(() => {
    return selectedServiceIds.reduce((sum, slug) => {
      const s = getServiceBySlug(slug);
      return sum + (s?.samplePrice || 0);
    }, 0);
  }, [selectedServiceIds]);

  // GPS Geolocation Handler
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const coordsStr = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        setFormData((prev) => ({
          ...prev,
          geoCoordinates: coordsStr,
          mapsUrl: mapsLink,
        }));

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          if (res.ok) {
            const data = await res.json();
            const address = data.display_name || "";
            const neighbourhood =
              data.address?.suburb ||
              data.address?.neighbourhood ||
              data.address?.residential ||
              "";

            setFormData((prev) => ({
              ...prev,
              exactAddress: address,
              locality: neighbourhood || prev.locality,
            }));
          }
        } catch {
          // ignore reverse geocoding fail, keep coordinates
        } finally {
          setGpsLoading(false);
          setGpsSuccess(true);
        }
      },
      (err) => {
        setGpsLoading(false);
        setGpsError(
          err.code === 1
            ? "Location permission denied. Please enter your locality manually."
            : "Could not fetch location. Please enter your address."
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Step 1 -> Step 2 transition
  const handleGoToStep2 = () => {
    if (selectedServiceIds.length === 0) {
      setErrors({ serviceId: "Please select at least 1 service to proceed." });
      return;
    }
    setErrors({});
    setCurrentStep(2);
    // Smoothly scroll to top of booking section
    const el = document.getElementById("booking-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Form submission (Step 2)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateBookingForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      const firstErrorField = Object.keys(validation.errors)[0];
      const el = document.querySelector(`[name="${firstErrorField}"]`);
      if (el) (el as HTMLElement).focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        setSubmitError(
          result.message || "Failed to submit booking. Please try again."
        );
        setIsSubmitting(false);
        return;
      }

      // Generate customized WhatsApp confirmation URL
      const selectedNames = selectedServiceIds
        .map((slug) => getServiceBySlug(slug)?.name || slug)
        .join(", ");

      const waText = encodeURIComponent(
        `Hi AquaShine! I just submitted a booking request.\n*Ref:* ${result.enquiryRef}\n*Name:* ${formData.fullName}\n*Service:* ${selectedNames}\n*Locality:* ${formData.locality}\n*Date:* ${formData.preferredDate} (${formData.preferredTimeWindow})\n\nPlease confirm availability!`
      );

      const dynamicWaUrl = `https://wa.me/917995770546?text=${waText}`;

      setSubmittedBooking({
        enquiryRef: result.enquiryRef,
        submittedAt: result.submittedAt,
        waUrl: dynamicWaUrl,
      });

      setCurrentStep(3); // Go to confirmation page
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSubmitError(`Network error: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="booking-form" className="scroll-mt-24">
      {/* =======================================================================
          TOP STEP WIZARD HEADER (Clear, Modern 2-Step Indicator)
          ======================================================================= */}
      <div className="mb-8 rounded-2xl border border-[#E3EAE7] bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          {/* Step 1 Pill */}
          <button
            type="button"
            onClick={() => currentStep === 2 && setCurrentStep(1)}
            disabled={currentStep === 3}
            className={`flex items-center gap-2 text-left transition-opacity ${
              currentStep === 1
                ? "text-[#123B46]"
                : currentStep === 2
                ? "text-[#197A73] hover:opacity-80"
                : "opacity-40"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black transition-all ${
                currentStep === 1
                  ? "bg-[#123B46] text-white shadow-sm ring-4 ring-[#E6F2EE]"
                  : "bg-[#E6F8F0] text-[#0FA958]"
              }`}
            >
              {currentStep > 1 ? <Check className="h-4 w-4 stroke-[3]" /> : "1"}
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#5D6B70]">
                Page 1
              </div>
              <div className="text-xs sm:text-sm font-bold">
                Select Services ({selectedServiceIds.length})
              </div>
            </div>
          </button>

          {/* Connection Line */}
          <div className="mx-2 h-0.5 flex-1 bg-[#E3EAE7] sm:mx-4">
            <div
              className={`h-full bg-[#0FA958] transition-all duration-300 ${
                currentStep === 1 ? "w-0" : currentStep === 2 ? "w-1/2" : "w-full"
              }`}
            />
          </div>

          {/* Step 2 Pill */}
          <div
            className={`flex items-center gap-2 text-left ${
              currentStep === 2
                ? "text-[#123B46]"
                : currentStep === 3
                ? "text-[#0FA958]"
                : "opacity-50"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black transition-all ${
                currentStep === 2
                  ? "bg-[#123B46] text-white shadow-sm ring-4 ring-[#E6F2EE]"
                  : currentStep === 3
                  ? "bg-[#E6F8F0] text-[#0FA958]"
                  : "bg-[#F8FAF9] text-[#5D6B70] border border-[#E3EAE7]"
              }`}
            >
              {currentStep === 3 ? <Check className="h-4 w-4 stroke-[3]" /> : "2"}
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#5D6B70]">
                Page 2
              </div>
              <div className="text-xs sm:text-sm font-bold">Fast Details (1 min)</div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          PAGE 1: SERVICE SELECTION
          ======================================================================= */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Category Tabs / Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-[#123B46] text-white shadow-xs"
                  : "bg-white text-[#172A30] border border-[#E3EAE7] hover:bg-[#E6F2EE]"
              }`}
            >
              ⭐ All Services ({allCatalogueServices.length})
            </button>
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#123B46] text-white shadow-xs"
                    : "bg-white text-[#172A30] border border-[#E3EAE7] hover:bg-[#E6F2EE]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Service Cards Grid (Interactive Cards) */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => {
              const isSelected = selectedServiceIds.includes(service.slug);

              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.slug)}
                  className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-3.5 transition-all duration-200 select-none ${
                    isSelected
                      ? "border-[#123B46] bg-[#E6F2EE]/40 shadow-md ring-2 ring-[#123B46]/20"
                      : "border-[#E3EAE7] bg-white hover:border-[#25AFA5] hover:shadow-xs"
                  }`}
                >
                  <div>
                    {/* Thumbnail Image + Price Tag */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#E6F2EE]">
                      <img
                        src={service.image.src}
                        alt={service.image.alt}
                        width={400}
                        height={250}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Starting Price Pill */}
                      <span className="absolute top-2.5 left-2.5 rounded-lg bg-[#123B46]/90 px-2 py-0.5 text-xs font-extrabold text-white backdrop-blur-md shadow-sm">
                        {formatServicePriceLabel(service)}
                      </span>

                      {/* Selection Checkmark Bubble */}
                      <div
                        className={`absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full shadow-md transition-all ${
                          isSelected
                            ? "bg-[#0FA958] text-white scale-100"
                            : "bg-white/90 text-gray-400 group-hover:scale-110"
                        }`}
                      >
                        {isSelected ? (
                          <Check className="h-4 w-4 stroke-[3]" />
                        ) : (
                          <Plus className="h-4 w-4 stroke-[2]" />
                        )}
                      </div>
                    </div>

                    {/* Title & Short Description */}
                    <div className="mt-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#197A73]">
                        {service.categoryName}
                      </div>
                      <h3 className="mt-0.5 text-base font-extrabold text-[#172A30] group-hover:text-[#123B46]">
                        {service.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#5D6B70] line-clamp-2 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <div className="mt-4 pt-3 border-t border-[#E3EAE7]">
                    <div
                      className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-[#123B46] text-white"
                          : "bg-[#F8FAF9] text-[#123B46] group-hover:bg-[#E6F2EE]"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                          <span>Service Selected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add to Booking</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Mini Add-on Option (TDS Measurement) */}
          <div className="rounded-2xl border border-[#D0DDD8] bg-white p-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💧</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#123B46]">
                      Optional Mini Add-On:
                    </span>
                    <span className="rounded-md bg-[#E6F8F0] px-2 py-0.5 text-[11px] font-bold text-[#0FA958]">
                      Only ₹79
                    </span>
                  </div>
                  <p className="text-xs text-[#5D6B70]">
                    TDS Measurement &amp; Water Quality Testing (check drinking &amp; tank purity on-site)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleAddOn("tds-measurement")}
                className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  selectedAddOnIds.includes("tds-measurement")
                    ? "bg-[#0FA958] text-white"
                    : "border border-[#123B46] text-[#123B46] hover:bg-[#E6F2EE]"
                }`}
              >
                {selectedAddOnIds.includes("tds-measurement")
                  ? "✓ Add-on Added"
                  : "+ Add TDS Test (₹79)"}
              </button>
            </div>
          </div>

          {/* Sticky Bottom Summary & Proceed Bar */}
          <div className="sticky bottom-16 z-30 rounded-2xl border border-[#123B46]/20 bg-white/95 p-4 shadow-xl backdrop-blur-md md:bottom-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#123B46] px-2.5 py-0.5 text-xs font-black text-white">
                    {selectedServiceIds.length} Selected
                  </span>
                  <span className="text-xs font-extrabold text-[#172A30]">
                    Starting from ₹{startingEstimate}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-[#5D6B70]">
                  {selectedServiceIds.map((slug) => (
                    <span
                      key={slug}
                      className="inline-flex items-center gap-1 rounded bg-[#F8FAF9] px-2 py-0.5 border border-[#E3EAE7]"
                    >
                      {getServiceBySlug(slug)?.name || slug}
                      <X
                        className="h-3 w-3 cursor-pointer text-gray-400 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeService(slug);
                        }}
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGoToStep2}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B46] px-6 py-3.5 text-sm font-black text-white shadow-md transition-all hover:bg-[#0D2C35] active:scale-[0.98]"
                >
                  <span>Next: Fast Details (1 min)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          PAGE 2: SIMPLE FAST DETAILS (Frictionless, 1-Minute Booking)
          ======================================================================= */}
      {currentStep === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Back Button & Selected Scope Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123B46] hover:text-[#197A73] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>← Change Selected Services</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#172A30]">
              <span className="text-[#5D6B70]">Booking:</span>
              <span className="rounded-lg bg-[#E6F2EE] px-2.5 py-1 text-[#123B46]">
                {selectedServiceIds.length} service(s) • Est. ₹{startingEstimate}
              </span>
            </div>
          </div>

          {/* Card 1: Your Contact Details */}
          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-5 shadow-xs sm:p-6">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-[#172A30]">
              <User className="h-4 w-4 text-[#197A73]" />
              <span>1. Your Contact Information</span>
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-[#172A30]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-[#D0DDD8] bg-[#F8FAF9] px-3.5 py-2.5 text-sm text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172A30]">
                  WhatsApp / Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1.5">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-xs font-bold text-[#5D6B70]">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    className="w-full rounded-xl border border-[#D0DDD8] bg-[#F8FAF9] pl-12 pr-3.5 py-2.5 text-sm text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none font-mono"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Contact Preference Chips */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-[#5D6B70]">
                How should we confirm your slot?
              </label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {(["WhatsApp", "Phone Call", "Either"] as ContactMethod[]).map(
                  (method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, preferredContact: method }))
                      }
                      className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                        formData.preferredContact === method
                          ? "bg-[#123B46] text-white shadow-xs"
                          : "border border-[#D0DDD8] bg-[#F8FAF9] text-[#172A30] hover:bg-[#E6F2EE]"
                      }`}
                    >
                      {method === "WhatsApp" ? "💬 WhatsApp (Fastest)" : method}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Preferred Date & Time Window */}
          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-5 shadow-xs sm:p-6">
            <h3 className="flex items-center gap-2 text-base font-extrabold text-[#172A30]">
              <Calendar className="h-4 w-4 text-[#197A73]" />
              <span>2. When do you need the service?</span>
            </h3>

            {/* Quick 1-Tap Date Chips */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-[#5D6B70]">
                Select Date:
              </label>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      preferredDate: getTomorrowDateString(),
                    }))
                  }
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    formData.preferredDate === getTomorrowDateString()
                      ? "bg-[#123B46] text-white shadow-xs"
                      : "border border-[#D0DDD8] bg-[#F8FAF9] text-[#172A30] hover:bg-[#E6F2EE]"
                  }`}
                >
                  Tomorrow
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      preferredDate: getDayAfterDateString(),
                    }))
                  }
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    formData.preferredDate === getDayAfterDateString()
                      ? "bg-[#123B46] text-white shadow-xs"
                      : "border border-[#D0DDD8] bg-[#F8FAF9] text-[#172A30] hover:bg-[#E6F2EE]"
                  }`}
                >
                  Day After
                </button>

                <input
                  type="date"
                  value={formData.preferredDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      preferredDate: e.target.value,
                    }))
                  }
                  className="rounded-xl border border-[#D0DDD8] bg-[#F8FAF9] px-3 py-1.5 text-xs font-bold text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Time Slots */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-[#5D6B70]">
                Preferred Time Slot:
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TIME_WINDOWS.map((window) => (
                  <button
                    key={window}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        preferredTimeWindow: window,
                      }))
                    }
                    className={`rounded-xl p-2.5 text-left text-xs font-bold transition-all ${
                      formData.preferredTimeWindow === window
                        ? "bg-[#123B46] text-white shadow-xs"
                        : "border border-[#D0DDD8] bg-[#F8FAF9] text-[#172A30] hover:bg-[#E6F2EE]"
                    }`}
                  >
                    {window.includes("Morning")
                      ? "☀️ Morning"
                      : window.includes("Afternoon")
                      ? "🌤️ Afternoon"
                      : window.includes("Evening")
                      ? "🌙 Evening"
                      : "💬 Flexible"}
                    <span className="block mt-0.5 text-[10px] opacity-75 font-normal truncate">
                      {window}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Location & Address */}
          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-5 shadow-xs sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-base font-extrabold text-[#172A30]">
                <MapPin className="h-4 w-4 text-[#197A73]" />
                <span>3. Where in Pune?</span>
              </h3>

              {/* 1-Tap Auto-GPS Button */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={gpsLoading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#197A73] bg-[#E6F8F0] px-3 py-1.5 text-xs font-bold text-[#197A73] hover:bg-[#D0F2E5] transition-colors disabled:opacity-50"
              >
                {gpsLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Crosshair className="h-3.5 w-3.5" />
                )}
                <span>{gpsLoading ? "Detecting..." : "Auto-Detect My Location"}</span>
              </button>
            </div>

            {gpsSuccess && (
              <p className="mt-2 text-xs font-bold text-[#0FA958]">
                ✓ GPS coordinates attached to booking for accurate crew navigation.
              </p>
            )}

            {gpsError && (
              <p className="mt-2 text-xs font-medium text-amber-700">{gpsError}</p>
            )}

            {/* Quick Locality Chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {QUICK_LOCALITIES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, locality: loc }))}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                    formData.locality === loc
                      ? "bg-[#123B46] text-white"
                      : "border border-[#D0DDD8] bg-[#F8FAF9] text-[#172A30] hover:bg-[#E6F2EE]"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Address Input */}
            <div className="mt-3">
              <label className="block text-xs font-bold text-[#5D6B70]">
                Flat / Society / Street Address:
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Flat 402, Konark Nagar, Near Symbiosis, Viman Nagar"
                value={formData.exactAddress || formData.addressAndInstructions}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    exactAddress: e.target.value,
                    addressAndInstructions: e.target.value,
                  }))
                }
                className="mt-1 w-full rounded-xl border border-[#D0DDD8] bg-[#F8FAF9] p-3 text-xs text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Card 4: Property Type */}
          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-5 shadow-xs sm:p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5D6B70]">
              Property Type
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, propertyType: type }))}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    formData.propertyType === type
                      ? "bg-[#123B46] text-white shadow-xs"
                      : "border border-[#D0DDD8] bg-[#F8FAF9] text-[#172A30] hover:bg-[#E6F2EE]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Submission Error Banner */}
          {submitError && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-semibold text-red-800">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Big Submit Button */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#123B46] py-4 text-base font-black text-white shadow-lg transition-all hover:bg-[#0D2C35] active:scale-[0.99] disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Submitting Your Booking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 text-[#25AFA5]" />
                  <span>Confirm Booking Request</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Or Skip Form & Book on WhatsApp */}
            <div className="text-center pt-2">
              <span className="text-xs text-[#5D6B70]">Prefer zero forms? </span>
              <a
                href={EXACT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black text-[#0FA958] underline hover:text-[#0C8946]"
              >
                Click here to book directly on WhatsApp →
              </a>
            </div>
          </div>
        </form>
      )}

      {/* =======================================================================
          PAGE 3: CONFIRMATION & 1-TAP WHATSAPP DISPATCH
          ======================================================================= */}
      {currentStep === 3 && submittedBooking && (
        <div className="rounded-3xl border border-[#E3EAE7] bg-white p-6 sm:p-10 shadow-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6F8F0] text-[#0FA958] shadow-sm">
            <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-black text-[#172A30]">
            Booking Request Received!
          </h2>

          <p className="mt-1 text-sm text-[#5D6B70]">
            Your enquiry reference is{" "}
            <span className="font-mono font-black text-[#123B46]">
              {submittedBooking.enquiryRef}
            </span>
          </p>

          {/* Details Box */}
          <div className="mt-6 mx-auto max-w-md rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-4 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#5D6B70]">Customer:</span>
              <span className="font-bold text-[#172A30]">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5D6B70]">Phone:</span>
              <span className="font-bold font-mono text-[#172A30]">+91 {formData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5D6B70]">Services:</span>
              <span className="font-bold text-[#123B46] text-right max-w-[200px]">
                {selectedServiceIds
                  .map((s) => getServiceBySlug(s)?.name || s)
                  .join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5D6B70]">Scheduled Date:</span>
              <span className="font-bold text-[#172A30]">{formData.preferredDate} ({formData.preferredTimeWindow})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5D6B70]">Locality:</span>
              <span className="font-bold text-[#172A30]">{formData.locality}</span>
            </div>
          </div>

          {/* 1-Tap WhatsApp Button */}
          <div className="mt-8 space-y-3 max-w-md mx-auto">
            <a
              href={submittedBooking.waUrl || EXACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-sm font-black text-white shadow-md transition-all hover:bg-[#1EBE5D] active:scale-[0.98]"
            >
              <MessageSquare className="h-5 w-5 fill-white" />
              <span>Confirm on WhatsApp (1-Tap)</span>
            </a>

            <a
              href={DIRECT_PHONE_TEL}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#D0DDD8] bg-white py-3 text-xs font-bold text-[#123B46] hover:bg-[#F8FAF9] transition-all"
            >
              <Phone className="h-4 w-4 text-[#197A73]" />
              <span>Direct Call: {DIRECT_PHONE}</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E3EAE7]">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(1);
                setSubmittedBooking(null);
              }}
              className="text-xs font-bold text-[#123B46] underline hover:text-[#197A73]"
            >
              Book Another Service →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
