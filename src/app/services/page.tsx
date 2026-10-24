import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Complete Services Catalogue — Cleaning, Water Care & Maintenance",
  description:
    "Explore AquaShine's 8 service categories across Viman Nagar and Pune: Water Tank & Water Care, Sofa & Upholstery, Bathroom, Kitchen, Floor Care, Windows, Complete Home & Commercial Cleaning.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#F8FAF9]">
      {/* Page Header */}
      <section className="border-b border-[#E3EAE7] bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
                Complete Service Catalogue
              </span>
              <h1 className="mt-2 text-3xl leading-tight font-bold text-[#172A30] sm:text-4xl lg:text-[44px]">
                Thoughtful Care for Every Part of Your Property
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#5D6B70] sm:text-lg">
                Browse our complete range of residential and commercial cleaning, water storage care and specialist partner services in{" "}
                <strong className="font-semibold text-[#172A30]">
                  {siteConfig.primaryArea}
                </strong>{" "}
                and nearby Pune areas.
              </p>
            </div>

            <Link
              href="/contact#booking-form"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#123B46] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D2C35]"
            >
              <CalendarCheck aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
              <span>Request Custom Quotation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Catalogue Grid */}
      <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ServiceGrid />
      </section>
    </div>
  );
}

