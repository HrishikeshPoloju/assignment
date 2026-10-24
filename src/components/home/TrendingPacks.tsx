"use client";

import React from "react";
import Link from "next/link";
import { Clock, Plus, Check, ArrowRight } from "lucide-react";

interface TrendingPackItem {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  image: string;
  price: number;
  originalPrice: number;
  duration: string;
  description: string;
  serviceIds: string[];
}

const trendingPacks: TrendingPackItem[] = [
  {
    id: "festive-kitchen-bathroom",
    name: "Festive Kitchen & Bathroom Bundle",
    badge: "POPULAR",
    badgeColor: "bg-[#E0533C]",
    image: "/images/kitchen-cleaning.webp",
    price: 2099,
    originalPrice: 2599,
    duration: "3.5 hours",
    description: "Full kitchen degreasing + complete bathroom descaling",
    serviceIds: ["kitchen-and-bathroom-bundle"],
  },
  {
    id: "sofa-mattress-refresh",
    name: "Combined Sofa & Mattress Refresh",
    badge: "BEST VALUE",
    badgeColor: "bg-[#0FA958]",
    image: "/images/sofa-cleaning.webp",
    price: 1599,
    originalPrice: 1999,
    duration: "2.0 hours",
    description: "5-seater sofa + King/Queen mattress deep extraction",
    serviceIds: ["sofa-and-mattress-bundle"],
  },
  {
    id: "pure-water-tank-care",
    name: "Pure Water Tank Sanitization",
    badge: "ESSENTIAL",
    badgeColor: "bg-[#197A73]",
    image: "/images/water-tank.webp",
    price: 649,
    originalPrice: 799,
    duration: "1.5 hours",
    description: "Overhead tank sludge extraction, rotary scrub & TDS check",
    serviceIds: ["overhead-water-tank-cleaning"],
  },
  {
    id: "complete-move-in-reset",
    name: "Full Home Deep Reset",
    badge: "TOP RATED",
    badgeColor: "bg-[#7A3E9D]",
    image: "/images/complete-home.webp",
    price: 2999,
    originalPrice: 3699,
    duration: "4.5 hours",
    description: "Inside-out cabinets, windows, kitchen, washrooms & floors",
    serviceIds: ["empty-flat-cleaning"],
  },
];

export function TrendingPacks() {
  return (
    <section className="bg-white py-8 sm:py-12 border-b border-[#E3EAE7]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header with Decorative Diamonds (Inspired by Reference Image 1) */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-[#E0533C] text-sm font-extrabold tracking-wide">
            <span className="text-xs">◆</span>
            <span className="text-base font-black">Trending Packs</span>
            <span className="text-xs">◆</span>
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-black text-[#172A30]">
            Get your home celebration-ready!
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#5D6B70]">
            Carefully curated hygiene packages bundled for maximum savings
          </p>
        </div>

        {/* Horizontal Snap-Scrolling Carousel on Mobile, Grid on Desktop (Reference Image 1) */}
        <div className="mt-6 flex gap-3.5 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {trendingPacks.map((pack) => {
            const bookingUrl = `/contact#booking-form?service=${encodeURIComponent(
              pack.serviceIds[0]
            )}`;

            return (
              <div
                key={pack.id}
                className="group relative flex w-[260px] sm:w-auto shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-2.5 shadow-sm transition-all hover:border-[#25AFA5] hover:shadow-md"
              >
                <div>
                  {/* Image Container with Badge and ADD Button */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#E6F2EE]">
                    <img
                      src={pack.image}
                      alt={pack.name}
                      width={400}
                      height={300}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Badge (NEW / POPULAR) */}
                    <span
                      className={`absolute top-2.5 left-2.5 rounded-md px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-sm ${pack.badgeColor}`}
                    >
                      {pack.badge}
                    </span>

                    {/* ADD Button (Floating inside/over image bottom-right, Reference Image 1) */}
                    <Link
                      href={bookingUrl}
                      aria-label={`Add ${pack.name} to booking`}
                      className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-lg border-2 border-[#0FA958] bg-white px-3 py-1 text-xs font-black text-[#0FA958] shadow-md transition-all hover:bg-[#0FA958] hover:text-white active:scale-95"
                    >
                      <Plus className="h-3.5 w-3.5 stroke-[3]" />
                      <span>ADD</span>
                    </Link>
                  </div>

                  {/* Pricing and Details */}
                  <div className="mt-3 px-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-[#172A30]">
                        ₹{pack.price}
                      </span>
                      <span className="text-xs text-[#5D6B70] line-through">
                        ₹{pack.originalPrice}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#5D6B70]">
                      <Clock className="h-3 w-3 text-[#197A73]" />
                      <span>{pack.duration}</span>
                    </div>

                    <h3 className="mt-1.5 text-sm font-bold text-[#172A30] group-hover:text-[#123B46] line-clamp-1">
                      {pack.name}
                    </h3>

                    <p className="mt-0.5 text-[11px] text-[#5D6B70] line-clamp-2 leading-relaxed">
                      {pack.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Quick Link */}
                <div className="mt-3 border-t border-[#E3EAE7] pt-2 px-1">
                  <Link
                    href={bookingUrl}
                    className="flex items-center justify-between text-[11px] font-bold text-[#123B46] hover:text-[#197A73]"
                  >
                    <span>Instant Booking</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

