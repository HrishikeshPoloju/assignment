"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Plus, ArrowRight, Sparkles } from "lucide-react";
import {
  formatServicePriceLabel,
  getRelatedRecommendations,
  RelationshipType,
  ServiceItem,
} from "@/data/services";

interface RelatedServicesProps {
  primaryService: ServiceItem;
}

const relationshipBadges: Record<RelationshipType, string> = {
  "add-on": "Recommended Add-On",
  complementary: "Complementary Service",
  "follow-up": "Follow-Up Care",
  maintenance: "Preventive Maintenance",
};

export function RelatedServices({ primaryService }: RelatedServicesProps) {
  // Capped at max 3 recommendations per Section 8 requirement
  const recommendations = getRelatedRecommendations(primaryService, 3);
  // Never pre-select add-ons without explicit user consent
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  if (recommendations.length === 0) return null;

  const toggleAddOn = (serviceId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const bookingHref = `/contact?category=${encodeURIComponent(
    primaryService.categoryId
  )}&service=${encodeURIComponent(primaryService.slug)}${
    selectedAddOns.length > 0
      ? `&addons=${encodeURIComponent(selectedAddOns.join(","))}`
      : ""
  }#booking-form`;

  return (
    <section
      aria-labelledby="related-services-heading"
      className="mt-12 rounded-2xl border border-[#E3EAE7] bg-white p-6 shadow-xs sm:p-8"
    >
      <div className="flex flex-col justify-between gap-4 border-b border-[#E3EAE7] pb-5 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#197A73] uppercase">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Coordinated Care Recommendations</span>
          </div>
          <h2
            id="related-services-heading"
            className="mt-1.5 text-2xl font-bold text-[#172A30]"
          >
            Frequently Paired With {primaryService.name}
          </h2>
          <p className="mt-1 text-sm text-[#5D6B70]">
            Optional services you can explicitly select to include in your quotation request. Nothing is added without your selection.
          </p>
        </div>

        <Link
          href={bookingHref}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#123B46] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D2C35]"
        >
          <span>
            {selectedAddOns.length > 0
              ? `Book With ${selectedAddOns.length} Selected Add-On${
                  selectedAddOns.length > 1 ? "s" : ""
                }`
              : `Book ${primaryService.name} Only`}
          </span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
        </Link>
      </div>

      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {recommendations.map(({ service, relation }) => {
          const isSelected = selectedAddOns.includes(service.slug);
          const priceLabel = formatServicePriceLabel(service);

          return (
            <li
              key={service.id}
              className={`flex flex-col justify-between rounded-xl border p-5 transition-colors ${
                isSelected
                  ? "border-[#123B46] bg-[#E6F2EE]/45"
                  : "border-[#E3EAE7] bg-[#F8FAF9]"
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-md bg-[#E6F2EE] px-2.5 py-0.5 text-[11px] font-semibold text-[#123B46]">
                    {relationshipBadges[relation.relationshipType]}
                  </span>
                  <span className="text-xs font-semibold text-[#5D6B70]">
                    {priceLabel}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-[#172A30]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-[#123B46] hover:underline"
                  >
                    {service.name}
                  </Link>
                </h3>

                <p className="mt-1.5 text-xs leading-relaxed text-[#5D6B70]">
                  {relation.reason}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#E3EAE7] pt-3.5">
                <button
                  type="button"
                  onClick={() => toggleAddOn(service.slug)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? "bg-[#123B46] text-white"
                      : "border border-[#123B46]/30 bg-white text-[#123B46] hover:bg-[#E6F2EE]"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check aria-hidden="true" className="h-3.5 w-3.5 text-[#25AFA5]" />
                      <span>Added to Enquiry</span>
                    </>
                  ) : (
                    <>
                      <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                      <span>Include as Add-On</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-medium text-[#5D6B70] hover:text-[#123B46] hover:underline"
                >
                  View Scope
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

