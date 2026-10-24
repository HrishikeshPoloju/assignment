"use client";

import React, { useMemo, useState } from "react";
import { Search, X, AlertCircle } from "lucide-react";
import {
  allCatalogueServices,
  serviceCategories,
} from "@/data/services";
import { ServiceCard } from "./ServiceCard";

export function ServiceGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return serviceCategories
      .filter((cat) => selectedCategory === "all" || cat.id === selectedCategory)
      .map((cat) => {
        const services = allCatalogueServices.filter((s) => {
          if (s.categoryId !== cat.id) return false;
          if (!normalizedQuery) return true;
          return (
            s.name.toLowerCase().includes(normalizedQuery) ||
            s.shortDescription.toLowerCase().includes(normalizedQuery) ||
            s.categoryName.toLowerCase().includes(normalizedQuery)
          );
        });
        return { category: cat, services };
      })
      .filter((group) => group.services.length > 0);
  }, [selectedCategory, normalizedQuery]);

  const totalMatchingServices = useMemo(
    () => filteredCategories.reduce((acc, g) => acc + g.services.length, 0),
    [filteredCategories]
  );

  return (
    <div>
      {/* Filter & Search Bar using semantic <search> landmark per modern-web-guidance (html) */}
      <search className="rounded-2xl border border-[#E3EAE7] bg-white p-4 shadow-xs sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <label htmlFor="service-catalogue-search" className="visually-hidden">
              Search services by name or keyword
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#5D6B70]"
            />
            <input
              id="service-catalogue-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. water tank, sofa, chimney, bathroom, kitchen..."
              className="w-full rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] py-2.5 pr-9 pl-10 text-sm text-[#172A30] placeholder:text-[#5D6B70] focus:border-[#123B46] focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-lg p-1 text-[#5D6B70] hover:bg-[#E6F2EE] hover:text-[#123B46]"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>
          <span aria-live="polite" className="text-xs font-semibold text-[#123B46] sm:text-sm">
            Showing {totalMatchingServices} of {allCatalogueServices.length} services
          </span>
        </div>

        {/* Category Pills */}
        <div
          role="group"
          aria-label="Filter by service category"
          className="mt-4 flex flex-wrap gap-2 border-t border-[#E3EAE7] pt-4"
        >
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            aria-pressed={selectedCategory === "all"}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
              selectedCategory === "all"
                ? "bg-[#123B46] text-white"
                : "border border-[#E3EAE7] bg-[#F8FAF9] text-[#172A30] hover:bg-[#E6F2EE]"
            }`}
          >
            All Categories ({allCatalogueServices.length})
          </button>

          {serviceCategories.map((cat) => {
            const count = allCatalogueServices.filter((s) => s.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={isSelected}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  isSelected
                    ? "bg-[#123B46] text-white"
                    : "border border-[#E3EAE7] bg-[#F8FAF9] text-[#172A30] hover:bg-[#E6F2EE]"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </search>

      {/* Empty State */}
      {filteredCategories.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#E3EAE7] bg-white p-10 text-center">
          <p className="text-lg font-bold text-[#172A30]">
            No matching services found
          </p>
          <p className="mt-1 text-sm text-[#5D6B70]">
            Try clearing your search keyword or switching back to All Categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 inline-flex items-center rounded-xl bg-[#123B46] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0D2C35]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-12 space-y-16">
          {filteredCategories.map(({ category, services }) => (
            <section
              key={category.id}
              id={category.slug}
              className="scroll-mt-24"
            >
              <div className="border-b border-[#E3EAE7] pb-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-bold text-[#172A30] sm:text-3xl">
                    {category.name}
                  </h2>
                  <span className="text-xs font-semibold tracking-wider text-[#197A73] uppercase">
                    {services.length} {services.length === 1 ? "Service" : "Services"}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#5D6B70] sm:text-base">
                  {category.fullDescription}
                </p>

                {category.safetyOrScopeNote && (
                  <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#123B46]/20 bg-[#E6F2EE]/70 px-4 py-3 text-xs leading-relaxed text-[#123B46] sm:text-sm">
                    <AlertCircle
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#123B46]"
                    />
                    <span>{category.safetyOrScopeNote}</span>
                  </div>
                )}
              </div>

              <ul
                role="list"
                className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {services.map((service) => (
                  <li key={service.id}>
                    <ServiceCard service={service} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

