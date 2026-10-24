import React from "react";
import Link from "next/link";
import { Check, PlusCircle, ArrowRight } from "lucide-react";
import { formatPackagePriceLabel, servicePackages } from "@/data/packages";

export function Packages() {
  return (
    <section
      id="packages"
      className="defer-below-fold border-b border-[#E3EAE7] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
              Curated Bundles
            </span>
            <h2 className="mt-2 text-[30px] leading-tight font-bold text-[#172A30] sm:text-[36px]">
              Popular Service Packages
            </h2>
            <p className="mt-2.5 max-w-2xl text-base text-[#5D6B70]">
              Thoughtfully combined service scopes for occupied homes, tenant relocations and periodic property care.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-2 rounded-xl border border-[#123B46]/25 bg-[#F8FAF9] px-4 py-2.5 text-sm font-semibold text-[#123B46] transition-colors hover:border-[#123B46] hover:bg-[#E6F2EE]"
          >
            <span>Compare All Packages</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
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
                className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-8 transition-shadow ${
                  isHighlighted
                    ? "border-[#123B46] bg-[#F8FAF9] shadow-[0_8px_28px_rgba(18,59,70,0.08)]"
                    : "border-[#E3EAE7] bg-white shadow-[0_2px_10px_rgba(18,59,70,0.04)]"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {pkg.badge ? (
                      <span className="inline-block rounded-lg bg-[#E6F2EE] px-3 py-1 text-xs font-semibold text-[#123B46]">
                        {pkg.badge}
                      </span>
                    ) : null}
                    <span className="rounded-lg bg-[#123B46] px-3 py-1 text-xs font-semibold text-white">
                      {priceLabel}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-[#172A30]">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#197A73]">
                    {pkg.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5D6B70]">
                    {pkg.description}
                  </p>

                  <div className="mt-6 border-t border-[#E3EAE7] pt-5">
                    <p className="text-xs font-semibold tracking-wider text-[#172A30] uppercase">
                      Core Scope Included
                    </p>
                    <ul role="list" className="mt-3 space-y-2.5">
                      {pkg.includedHighlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm text-[#172A30]"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#197A73]"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 rounded-xl border border-[#E3EAE7] bg-white p-4">
                    <p className="text-xs font-semibold tracking-wider text-[#5D6B70] uppercase">
                      Popular Optional Add-Ons
                    </p>
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
                    className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors ${
                      isHighlighted
                        ? "bg-[#123B46] text-white hover:bg-[#0D2C35]"
                        : "border border-[#123B46] bg-white text-[#123B46] hover:bg-[#123B46] hover:text-white"
                    }`}
                  >
                    <span>Request Package Quote</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

