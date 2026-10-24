import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Check, PlusCircle, ArrowRight, Info } from "lucide-react";
import { formatPackagePriceLabel, servicePackages } from "@/data/packages";
import { siteConfig } from "@/data/site-config";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Service Packages — Home Refresh, Move-In / Move-Out & Property Care",
  description:
    "Compare AquaShine's Home Refresh, Move-In / Move-Out and Property Maintenance packages for homes, apartments, villas and commercial spaces in Viman Nagar and Pune.",
};

export default function PackagesPage() {
  return (
    <div className="bg-[#F8FAF9]">
      <section className="border-b border-[#E3EAE7] bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
            Combined Service Scopes
          </span>
          <h1 className="mt-2 text-3xl leading-tight font-bold text-[#172A30] sm:text-4xl lg:text-[44px]">
            Service Packages &amp; Maintenance Plans
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#5D6B70] sm:text-lg">
            Choose a curated package starting point and tailor it to your property size, bathroom count, upholstery inventory or water storage capacity.
          </p>

          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-[#123B46]/20 bg-[#E6F2EE]/75 p-4 text-xs text-[#123B46] sm:text-sm">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#123B46]" />
            <span>
              <strong>Transparent Quotation Policy:</strong> {siteConfig.pricingPolicy.disclaimer}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {servicePackages.map((pkg, idx) => {
            const priceLabel = formatPackagePriceLabel(pkg);
            const isHighlighted = idx === 0;
            const bookingHref = `/contact?category=${encodeURIComponent(
              pkg.defaultCategoryId
            )}&service=${encodeURIComponent(
              pkg.defaultServiceId
            )}&addons=${encodeURIComponent(
              pkg.defaultAddOnIds.join(",")
            )}&package=${encodeURIComponent(pkg.name)}#booking-form`;

            return (
              <li
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-8 ${
                  isHighlighted
                    ? "border-[#123B46] bg-white shadow-[0_12px_32px_rgba(18,59,70,0.08)]"
                    : "border-[#E3EAE7] bg-white shadow-xs"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {pkg.badge && (
                      <span className="rounded-lg bg-[#E6F2EE] px-3 py-1 text-xs font-semibold text-[#123B46]">
                        {pkg.badge}
                      </span>
                    )}
                    <span className="rounded-lg bg-[#123B46] px-3 py-1 text-xs font-semibold text-white">
                      {priceLabel}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-[#172A30]">
                    {pkg.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#197A73]">
                    {pkg.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5D6B70]">
                    {pkg.description}
                  </p>

                  <div className="mt-5 rounded-xl bg-[#F8FAF9] p-3.5 text-xs text-[#172A30]">
                    <strong>Best suited for:</strong> {pkg.idealFor}
                  </div>

                  <div className="mt-6 border-t border-[#E3EAE7] pt-5">
                    <h3 className="text-xs font-semibold tracking-wider text-[#172A30] uppercase">
                      Included in Base Package Scope
                    </h3>
                    <ul role="list" className="mt-3 space-y-2.5">
                      {pkg.includedHighlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-[#172A30]"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#197A73]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] p-4">
                    <h3 className="text-xs font-semibold tracking-wider text-[#5D6B70] uppercase">
                      Optional Add-Ons Available
                    </h3>
                    <ul role="list" className="mt-2 space-y-1.5">
                      {pkg.optionalAddOns.map((addon) => (
                        <li
                          key={addon}
                          className="flex items-start gap-2 text-xs text-[#5D6B70]"
                        >
                          <PlusCircle
                            aria-hidden="true"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#25AFA5]"
                          />
                          <span>{addon}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <p className="mb-3 text-xs text-[#5D6B70]">{pkg.priceUnitNote}</p>
                  <Link
                    href={bookingHref}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B46] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0D2C35]"
                  >
                    <span>Request {pkg.name} Quote</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <FinalCTA />
    </div>
  );
}

