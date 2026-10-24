"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Info } from "lucide-react";

interface ComparisonItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  scopeSummary: string;
}

const demoComparisons: ComparisonItem[] = [
  {
    id: "bathroom",
    title: "Bathroom Glass & Tile Descaling",
    category: "Bathroom Care",
    beforeImage: "/images/demo-bathroom-before.webp",
    afterImage: "/images/demo-bathroom-after.webp",
    beforeAlt:
      "Illustrative demo before-view showing dull, water-hazed bathroom shower glass and tiles",
    afterAlt:
      "Illustrative demo after-view showing clear shower partition glass, bright tiles and polished chrome fixtures",
    scopeSummary:
      "Demonstrates target visual outcome for hard-water scale removal on glass partitions, porcelain wall tiles and chrome fixtures.",
  },
  {
    id: "sofa",
    title: "Fabric Sofa Shampoo & Extraction",
    category: "Sofa & Upholstery Care",
    beforeImage: "/images/demo-sofa-before.webp",
    afterImage: "/images/demo-sofa-after.webp",
    beforeAlt:
      "Illustrative demo before-view showing dulled, dust-laden fabric sofa cushions",
    afterAlt:
      "Illustrative demo after-view showing refreshed, clean woven fabric sofa upholstery",
    scopeSummary:
      "Demonstrates surface brightness and texture restoration after dry dust vacuuming, foam shampooing and moisture extraction.",
  },
  {
    id: "kitchen",
    title: "Kitchen Counter, Chimney & Tile Degreasing",
    category: "Kitchen Care",
    beforeImage: "/images/demo-kitchen-before.webp",
    afterImage: "/images/demo-kitchen-after.webp",
    beforeAlt:
      "Illustrative demo before-view showing dulled kitchen tiles and cooking zone surfaces",
    afterAlt:
      "Illustrative demo after-view showing gleaming quartz countertop, backsplash tiles and stainless steel hood",
    scopeSummary:
      "Demonstrates target cleanliness across cooking zones, backsplash tiles, stainless steel hood exteriors and sinks.",
  },
];

export function BeforeAfter() {
  const [activeTab, setActiveTab] = useState<string>(demoComparisons[0].id);
  const [sliderPos, setSliderPos] = useState<number>(52);

  const activeItem =
    demoComparisons.find((item) => item.id === activeTab) || demoComparisons[0];

  return (
    <section className="defer-below-fold border-b border-[#E3EAE7] bg-[#F8FAF9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
              Service Outcomes
            </span>
            <h2 className="mt-2 text-[30px] leading-tight font-bold text-[#172A30] sm:text-[36px]">
              Before &amp; After Care Preview
            </h2>
            <p className="mt-2 max-w-2xl text-base text-[#5D6B70]">
              Use the interactive slider below to compare typical surface conditions before and after deep cleaning.
            </p>
          </div>

          {/* Transparent Demo Disclaimer Badge (Required by Section 5G & 11) */}
          <div className="inline-flex items-start gap-2 rounded-xl border border-[#123B46]/20 bg-[#E6F2EE] px-4 py-2.5 text-xs text-[#123B46]">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#123B46]" />
            <span>
              <strong>Illustrative Demo Content:</strong> Shown for scope preview during initial catalogue rollout; not presented as past customer job photographs.
            </span>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div
          role="tablist"
          aria-label="Select service comparison preview"
          className="mt-8 flex flex-wrap gap-2"
        >
          {demoComparisons.map((item) => {
            const isSelected = item.id === activeItem.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isSelected
                    ? "bg-[#123B46] text-white shadow-xs"
                    : "border border-[#E3EAE7] bg-white text-[#172A30] hover:bg-[#E6F2EE]/60"
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Interactive Accessible Comparison Container */}
        <div
          id={`panel-${activeItem.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeItem.id}`}
          className="mt-6 overflow-hidden rounded-2xl border border-[#E3EAE7] bg-white p-3 shadow-xs sm:p-5"
        >
          <div className="relative aspect-3/2 max-h-[540px] w-full overflow-hidden rounded-xl bg-[#E6F2EE] select-none">
            {/* Base Layer: AFTER Image */}
            <img
              src={activeItem.afterImage}
              alt={activeItem.afterAlt}
              width={900}
              height={600}
              loading="lazy"
              className="h-full w-full object-cover"
            />

            {/* Clipped Layer: BEFORE Image */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={activeItem.beforeImage}
                alt={activeItem.beforeAlt}
                width={900}
                height={600}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Labels */}
            <span className="pointer-events-none absolute top-3 left-3 rounded-lg bg-[#172A30]/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
              Before (Illustrative Demo)
            </span>
            <span className="pointer-events-none absolute top-3 right-3 rounded-lg bg-[#123B46]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
              After (Illustrative Demo)
            </span>

            {/* Visual Divider Line & Handle */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#123B46] text-white shadow-md">
                <SlidersHorizontal className="h-4 w-4 text-[#25AFA5]" />
              </div>
            </div>

            {/* Accessible Native Range Input overlaying the image for touch, mouse & keyboard control */}
            <input
              type="range"
              min={5}
              max={95}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label={`Before and after comparison slider for ${activeItem.title}. Use left and right arrow keys to adjust.`}
              className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>

          {/* Visible Accessible Slider Bar & Description Below Image */}
          <div className="mt-4 flex flex-col justify-between gap-4 border-t border-[#E3EAE7] pt-4 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-semibold tracking-wider text-[#197A73] uppercase">
                {activeItem.category}
              </span>
              <h3 className="text-base font-bold text-[#172A30]">
                {activeItem.title}
              </h3>
              <p className="mt-0.5 text-sm text-[#5D6B70]">
                {activeItem.scopeSummary}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <label
                htmlFor="visible-comparison-range"
                className="text-xs font-semibold text-[#172A30]"
              >
                Adjust View ({sliderPos}%):
              </label>
              <input
                id="visible-comparison-range"
                type="range"
                min={5}
                max={95}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-32 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

