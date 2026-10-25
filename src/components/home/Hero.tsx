"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  ChevronDown,
  Zap,
  Calendar,
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/data/site-config";

// Repeated scalloped SVG path for 1200px width
const SCALLOP_PATH =
  "M0,0 L0,8 " +
  Array.from({ length: 30 })
    .map((_, i) => {
      const x = i * 40;
      return `C${x + 10},22 ${x + 30},22 ${x + 40},8 `;
    })
    .join("") +
  "L1200,8 L1200,0 Z";

export function Hero() {
  const whatsappUrl =
    "https://wa.me/917995770546?text=Hi%20AquaShine%21%20I%20want%20to%20book%20a%20cleaning%20service.%0AService%3A%20%0AArea%20%2F%20Pincode%3A%20%0APreferred%20date%3A%20%0AProperty%20type%3A%20Home%20%2F%20Society%20%2F%20Office";
  const phoneTel = "tel:+917995770546";
  const phoneDisplay = "+91 79957 70546";

  return (
    <section className="relative overflow-hidden bg-[#0D2C35] text-white">
      {/* =========================================================================
          MOBILE VIEW (Inspired by Reference Image 1 & 3 Background)
          ========================================================================= */}
      <div className="relative block lg:hidden">
        {/* Background Team Image with Atmospheric Gradients */}
        <div className="relative min-h-[580px] w-full overflow-hidden sm:min-h-[640px]">
          <img
            src="/images/aquashine-team-hero.webp"
            alt="AquaShine professional in-house cleaning crew in uniform with protective equipment"
            width={764}
            height={1024}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          />

          {/* Gradients to keep text and action cards crisp */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D2C35]/85 via-[#0D2C35]/40 to-[#0D2C35] pointer-events-none" />

          {/* Top Mobile Bar: Location & Quick Actions (Reference Image 1) */}
          <div className="relative z-10 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
            {/* Location selector */}
            <Link
              href="#service-areas"
              className="flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 backdrop-blur-md border border-white/20 transition-colors active:bg-black/60"
            >
              <MapPin className="h-4 w-4 text-[#25AFA5] shrink-0" />
              <div className="text-left">
                <div className="flex items-center gap-1 text-xs font-bold tracking-wide uppercase text-white">
                  <span>Viman Nagar</span>
                  <ChevronDown className="h-3 w-3 text-[#25AFA5]" />
                </div>
                <div className="text-[10px] text-white/75 truncate max-w-[140px] sm:max-w-[200px]">
                  Pune • Kalyani Nagar • Kharadi
                </div>
              </div>
            </Link>

            {/* Top Right Quick Actions: Direct Call & WhatsApp */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href={phoneTel}
                aria-label="Direct Phone Call: +91 79957 70546"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/25 active:scale-95 transition-transform"
                title="Call +91 79957 70546"
              >
                <Phone className="h-4 w-4 text-white" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md active:scale-95 transition-transform"
                title="WhatsApp Us"
              >
                <MessageCircle className="h-4 w-4 fill-white text-[#25D366]" />
              </a>

              <Link
                href="/contact#booking-form"
                aria-label="Direct booking"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/25 active:scale-95 transition-transform"
                title="Book a slot"
              >
                <Calendar className="h-4 w-4 text-white" />
              </Link>
            </div>
          </div>

          {/* Center Brand Headline */}
          <div className="relative z-10 px-4 pt-10 sm:px-6">
            <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-md sm:text-3xl">
              A Cleaner Space. <br />
              <span className="text-[#5DE0D3]">A Better Everyday.</span>
            </h1>

            <p className="mt-1.5 text-xs text-white/90 drop-shadow-xs max-w-xs">
              Overhead tank sanitization, sofa extraction &amp; complete home care in Pune.
            </p>
          </div>

          {/* Bottom Action Cards (Reference Image 1: Instant Service vs Schedule for Later) */}
          <div className="absolute inset-x-0 bottom-4 z-10 px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {/* Card 1: Get Instant Service */}
              <Link
                href="/contact#booking-form?urgent=true"
                className="group flex flex-col justify-between rounded-2xl bg-white p-3.5 shadow-xl transition-all active:scale-[0.98] border border-white/90"
              >
                <div>
                  <div className="text-[14px] font-extrabold leading-snug text-[#172A30] group-hover:text-[#123B46]">
                    Get Instant Service
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium text-[#5D6B70]">
                    Urgent / same-day slot
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#197A73]">
                    Book now →
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E6F8F0] text-[#0FA958] shadow-xs group-hover:scale-110 transition-transform">
                    <Zap className="h-4 w-4 fill-[#0FA958]" />
                  </div>
                </div>
              </Link>

              {/* Card 2: Schedule for Later */}
              <Link
                href="/contact#booking-form"
                className="group flex flex-col justify-between rounded-2xl bg-white p-3.5 shadow-xl transition-all active:scale-[0.98] border border-white/90"
              >
                <div>
                  <div className="text-[14px] font-extrabold leading-snug text-[#172A30] group-hover:text-[#123B46]">
                    Schedule for Later
                  </div>
                  <div className="mt-1 inline-flex items-center rounded-full bg-[#E6F8F0] px-2 py-0.5 text-[10px] font-bold text-[#0FA958] border border-[#BDE8D3]">
                    Pick a slot
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#123B46]">
                    Choose date →
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EBF5F1] text-[#123B46] shadow-xs group-hover:scale-110 transition-transform">
                    <Calendar className="h-4 w-4 text-[#123B46]" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Scalloped decorative border (matches Reference Image 1) */}
        <div className="relative w-full overflow-hidden leading-none text-[#0D2C35] -mt-0.5">
          <svg
            viewBox="0 0 1200 24"
            preserveAspectRatio="none"
            className="block h-5 w-full text-[#0D2C35] sm:h-7"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={SCALLOP_PATH} />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP VIEW (Refined 2-column layout showcasing team photo + CTAs)
          ========================================================================= */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-12 items-center gap-10 xl:gap-14">
            {/* Left Column: Brand Message & Cards */}
            <div className="col-span-7">
              <h1 className="text-[48px] font-black leading-[1.1] tracking-tight text-white xl:text-[54px]">
                A Cleaner Space. <br />
                <span className="text-[#5DE0D3]">A Better Everyday.</span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 xl:text-lg">
                Pune&apos;s trusted crew for mechanized overhead tank sanitization,
                deep upholstery extraction, bathroom descaling, and full home care.
              </p>

              {/* Direct Quick Contact Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4.5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  <span>Instant WhatsApp Booking</span>
                </a>

                <a
                  href={phoneTel}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4.5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors backdrop-blur-md"
                >
                  <Phone className="h-3.5 w-3.5 text-[#25AFA5]" />
                  <span>Call Us: {phoneDisplay}</span>
                </a>
              </div>

              {/* Action Cards Grid on Desktop */}
              <div className="mt-8 grid max-w-xl grid-cols-2 gap-4">
                <Link
                  href="/contact#booking-form?urgent=true"
                  className="group flex flex-col justify-between rounded-2xl bg-white p-4.5 text-[#172A30] shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-base font-extrabold text-[#172A30] group-hover:text-[#123B46]">
                        Get Instant Service
                      </div>
                      <div className="mt-0.5 text-xs text-[#5D6B70]">
                        Urgent slot in Viman Nagar
                      </div>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F8F0] text-[#0FA958]">
                      <Zap className="h-5 w-5 fill-[#0FA958]" />
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center text-xs font-bold text-[#197A73]">
                    Book immediate dispatch →
                  </div>
                </Link>

                <Link
                  href="/contact#booking-form"
                  className="group flex flex-col justify-between rounded-2xl bg-white p-4.5 text-[#172A30] shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-base font-extrabold text-[#172A30] group-hover:text-[#123B46]">
                        Schedule for Later
                      </div>
                      <span className="mt-1 inline-flex items-center rounded-full bg-[#E6F8F0] px-2.5 py-0.5 text-xs font-bold text-[#0FA958] border border-[#BDE8D3]">
                        Pick a slot
                      </span>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF5F1] text-[#123B46]">
                      <Calendar className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center text-xs font-bold text-[#123B46]">
                    Choose convenient date →
                  </div>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-medium text-white/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#25AFA5]" />
                  <span>Background-Verified Crew</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#F5A623] fill-[#F5A623]" />
                  <span>4.9/5 Average Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#25AFA5]" />
                  <span>Clear Scope &amp; No Hidden Fees</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Team Photo Card */}
            <div className="col-span-5">
              <div className="relative mx-auto max-w-[420px] overflow-hidden rounded-3xl border-2 border-white/20 bg-white/5 p-2 shadow-2xl backdrop-blur-md">
                <div className="relative overflow-hidden rounded-2xl bg-[#0D2C35]">
                  <img
                    src="/images/aquashine-team-hero.webp"
                    alt="AquaShine professional in-house cleaning crew in uniform"
                    width={764}
                    height={1024}
                    fetchPriority="high"
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C35]/90 via-transparent to-transparent" />

                  {/* Floating verification pill */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#123B46] shadow-lg backdrop-blur-md">
                    <ShieldCheck className="h-4 w-4 text-[#0FA958]" />
                    <span>Verified In-House Team</span>
                  </div>

                  {/* Caption at bottom of image */}
                  <div className="absolute inset-x-0 bottom-4 px-4 text-center">
                    <div className="text-sm font-bold text-white">
                      AquaShine Uniformed Facility Crew
                    </div>
                    <div className="text-xs text-white/75">
                      Fully equipped with safety gear &amp; professional tools
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scalloped decorative border on desktop */}
        <div className="relative w-full overflow-hidden leading-none text-[#0D2C35] -mt-0.5">
          <svg
            viewBox="0 0 1200 24"
            preserveAspectRatio="none"
            className="block h-7 w-full text-[#0D2C35]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={SCALLOP_PATH} />
          </svg>
        </div>
      </div>
    </section>
  );
}
