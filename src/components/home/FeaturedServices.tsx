"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Plus } from "lucide-react";

interface GridServiceItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  rating: string;
  reviewCount: string;
  image: string;
  price: number;
  originalPrice: number;
}

const homeGridServices: GridServiceItem[] = [
  {
    id: "overhead-water-tank-cleaning",
    slug: "overhead-water-tank-cleaning",
    name: "Overhead Tank",
    category: "Water Care",
    rating: "4.9",
    reviewCount: "2.4k",
    image: "/images/water-tank.webp",
    price: 649,
    originalPrice: 799,
  },
  {
    id: "sofa-deep-cleaning",
    slug: "sofa-deep-cleaning",
    name: "Sofa Cleaning",
    category: "Upholstery",
    rating: "4.9",
    reviewCount: "4.1k",
    image: "/images/sofa-cleaning.webp",
    price: 449,
    originalPrice: 599,
  },
  {
    id: "bathroom-deep-cleaning",
    slug: "bathroom-deep-cleaning",
    name: "Bathroom Clean",
    category: "Sanitation",
    rating: "4.9",
    reviewCount: "3.2k",
    image: "/images/bathroom-cleaning.webp",
    price: 499,
    originalPrice: 649,
  },
  {
    id: "kitchen-deep-cleaning",
    slug: "kitchen-deep-cleaning",
    name: "Kitchen Clean",
    category: "Degreasing",
    rating: "4.8",
    reviewCount: "1.9k",
    image: "/images/kitchen-cleaning.webp",
    price: 1299,
    originalPrice: 1599,
  },
  {
    id: "floor-scrubbing",
    slug: "floor-scrubbing",
    name: "Floor Scrubbing",
    category: "Surfaces",
    rating: "4.9",
    reviewCount: "1.5k",
    image: "/images/floor-scrubbing.webp",
    price: 999,
    originalPrice: 1299,
  },
  {
    id: "accessible-window-cleaning",
    slug: "accessible-window-cleaning",
    name: "Window Clean",
    category: "Glass Care",
    rating: "4.8",
    reviewCount: "980",
    image: "/images/window-cleaning.webp",
    price: 199,
    originalPrice: 299,
  },
  {
    id: "mattress-deep-cleaning",
    slug: "mattress-deep-cleaning",
    name: "Mattress Clean",
    category: "Extraction",
    rating: "4.9",
    reviewCount: "1.7k",
    image: "/images/mattress-cleaning.webp",
    price: 649,
    originalPrice: 849,
  },
  {
    id: "underground-sump-cleaning",
    slug: "underground-sump-cleaning",
    name: "Sump Cleaning",
    category: "Water Care",
    rating: "4.9",
    reviewCount: "860",
    image: "/images/water-tank.webp",
    price: 1799,
    originalPrice: 2199,
  },
  {
    id: "balcony-deep-cleaning",
    slug: "balcony-deep-cleaning",
    name: "Balcony Clean",
    category: "Outdoor",
    rating: "4.8",
    reviewCount: "1.1k",
    image: "/images/balcony-cleaning.webp",
    price: 549,
    originalPrice: 699,
  },
];

export function FeaturedServices() {
  return (
    <section
      id="featured-services"
      className="border-b border-[#E3EAE7] bg-[#F8FAF9] py-10 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-3 sm:px-6 lg:px-8">
        {/* Section Header (Inspired by Reference Image 2: "All house help services") */}
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#172A30]">
              All house care services
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-[#5D6B70]">
              Schedule &amp; book for later
            </p>
          </div>

          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#123B46] hover:text-[#197A73] transition-colors"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3-Column Grid on Mobile (Image 2 style) & Responsive on Tablet/Desktop */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {homeGridServices.map((service) => {
            const bookingUrl = `/contact#booking-form?service=${encodeURIComponent(
              service.slug
            )}`;

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E3EAE7] bg-white p-2 sm:p-3 shadow-xs transition-all duration-200 hover:border-[#25AFA5] hover:shadow-md"
              >
                <div>
                  {/* Rating Pill (Top Left, Reference Image 2) */}
                  <div className="mb-1.5 flex items-center gap-1 px-0.5">
                    <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#F5A623] fill-[#F5A623]" />
                    <span className="text-[9px] sm:text-[11px] font-bold text-[#172A30]">
                      {service.rating}
                    </span>
                    <span className="hidden sm:inline text-[10px] text-[#5D6B70]">
                      ({service.reviewCount})
                    </span>
                  </div>

                  {/* Thumbnail Image Container with Floating '+' Button */}
                  <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#E6F2EE]">
                    <img
                      src={service.image}
                      alt={service.name}
                      width={300}
                      height={300}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Floating Add (+) Button (Reference Image 2) */}
                    <Link
                      href={bookingUrl}
                      aria-label={`Book ${service.name}`}
                      className="absolute right-1.5 bottom-1.5 sm:right-2 sm:bottom-2 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-white text-[#0FA958] shadow-md transition-all hover:bg-[#0FA958] hover:text-white active:scale-95 border border-[#E3EAE7]"
                    >
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
                    </Link>
                  </div>

                  {/* Service Title */}
                  <h3 className="mt-2 text-xs sm:text-sm font-bold text-[#172A30] group-hover:text-[#123B46] truncate">
                    <Link href={`/services/${service.slug}`}>
                      {service.name}
                    </Link>
                  </h3>
                </div>

                {/* Price Display: Strikethrough + Bold Middle Price */}
                <div className="mt-1.5 pt-1 border-t border-[#E3EAE7]/60 flex items-baseline gap-1.5">
                  <span className="text-xs sm:text-sm font-black text-[#172A30]">
                    ₹{service.price}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#5D6B70] line-through">
                    ₹{service.originalPrice}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-5 text-center sm:hidden">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#123B46]"
          >
            <span>See all 23 services in catalogue</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
