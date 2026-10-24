import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "About AquaShine — Dependable Home & Commercial Care in Pune",
  description:
    "Learn how AquaShine Facility Care delivers transparent, scope-verified residential and commercial cleaning and coordinated maintenance in Viman Nagar and nearby Pune areas.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAF9]">
      {/* Hero Banner */}
      <section className="border-b border-[#E3EAE7] bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
                About {siteConfig.legalOrFullName}
              </span>
              <h1 className="mt-2 text-3xl leading-tight font-bold text-[#172A30] sm:text-4xl lg:text-[44px]">
                A Cleaner Space. A Better Everyday.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#5D6B70] sm:text-lg">
                {siteConfig.brandName} was built around a simple premise: booking home or commercial cleaning in Pune should be calm, clear and dependable—not a confusing maze of vague scopes, surprise add-on charges or unverified promises.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#5D6B70]">
                Based in <strong className="font-semibold text-[#172A30]">{siteConfig.primaryArea}, {siteConfig.city}</strong>, we serve apartment residents, independent homeowners, landlords, PGs, clinics, cafés, offices and housing societies with structured cleaning and water-care services.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-2.5 shadow-xs">
                <img
                  src="/images/why-aquashine.webp"
                  alt="Spotless, sunlit modern apartment interior maintained with care"
                  width={1000}
                  height={800}
                  className="aspect-5/4 h-auto w-full rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct vs Coordinated Partner Network Transparency */}
      <section className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
            How We Work
          </span>
          <h2 className="mt-2 text-2xl font-bold text-[#172A30] sm:text-3xl">
            Trained In-House Teams &amp; Transparent Standards
          </h2>
          <p className="mt-2.5 text-base text-[#5D6B70]">
            Every cleaning assignment is carried out by trained, background-verified AquaShine staff using modern equipment and certified surface-safe cleaning agents.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6F2EE] text-[#123B46]">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#172A30]">
              Professional In-House Delivery
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5D6B70]">
              Our core cleaning and maintenance services—including overhead tank &amp; sump cleaning, sofa &amp; mattress extraction, bathroom descaling, kitchen degreasing, floor scrubbing, window cleaning and move-in/move-out home cleaning—are executed directly by our own crew.
            </p>
            <ul role="list" className="mt-4 space-y-2 text-sm text-[#172A30]">
              <li className="flex items-center gap-2">
                <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#197A73]" />
                <span>Surface-appropriate equipment and formulated cleaning agents</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#197A73]" />
                <span>Written scope inclusions and exclusions on every service page</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6F2EE] text-[#123B46]">
              <Sparkles aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#172A30]">
              Transparent Scope &amp; Accountable Care
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5D6B70]">
              We believe great service begins with total clarity. Before starting any job, our team walks through the scope with you, explains what will be achieved, and conducts a post-cleaning inspection before final handover.
            </p>
            <ul role="list" className="mt-4 space-y-2 text-sm text-[#172A30]">
              <li className="flex items-center gap-2">
                <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#197A73]" />
                <span>Clear upfront estimates with no hidden surprises or forced add-ons</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#197A73]" />
                <span>Single point of contact for booking, coordination, and post-service feedback</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Operating Principles */}
        <div className="mt-12 rounded-2xl border border-[#E3EAE7] bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#172A30] sm:text-2xl">
            Our Operating Principles
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-base font-bold text-[#123B46]">
                1. No Unnecessary Upselling
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5D6B70]">
                We never add optional services without your explicit selection, and we never recommend a water purifier solely based on a handheld TDS reading.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#123B46]">
                2. Surface &amp; Technician Safety First
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5D6B70]">
                We avoid raw industrial acids on bathroom chrome and tiles, verify safe entry before underground sump cleaning, and never put staff at fall risk on high-rise window exteriors.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#123B46]">
                3. Realistic Quotations
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5D6B70]">
                For variable-scope jobs like large water tanks, heavy grease removal or commercial premises, we review your requirements or inspect first rather than displaying a misleading fixed rate.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#E3EAE7] pt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-[#172A30]">
              <MapPin aria-hidden="true" className="h-4 w-4 text-[#197A73]" />
              <span>
                Primary Hub: {siteConfig.primaryArea}, {siteConfig.city} • Serving nearby eastern Pune localities
              </span>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-[#123B46] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0D2C35]"
            >
              <span>Explore Our Services</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

