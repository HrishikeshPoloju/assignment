import React from "react";
import Link from "next/link";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export function ServiceAreas() {
  return (
    <section
      id="service-areas"
      className="defer-below-fold border-b border-[#E3EAE7] bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
              Service Coverage
            </span>
            <h2 className="mt-2 text-[30px] leading-tight font-bold text-[#172A30] sm:text-[36px]">
              Local Service. Convenient Booking.
            </h2>
            <p className="mt-2.5 max-w-2xl text-base text-[#5D6B70]">
              Focused on <strong className="font-semibold text-[#172A30]">Viman Nagar, Pune</strong> as our primary service hub, with scheduled visits across surrounding eastern Pune neighbourhoods subject to operational slot confirmation.
            </p>
          </div>

          <Link
            href="/contact#booking-form"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#123B46] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D2C35]"
          >
            <span>Check Slot Availability</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
          </Link>
        </div>

        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {siteConfig.serviceAreas.map((area) => {
            const isPrimary = area.tier === "primary";
            return (
              <li
                key={area.slug}
                className={`flex flex-col justify-between rounded-2xl border p-6 ${
                  isPrimary
                    ? "border-[#123B46] bg-[#E6F2EE]/45"
                    : "border-[#E3EAE7] bg-[#F8FAF9]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin
                        aria-hidden="true"
                        className={`h-5 w-5 ${
                          isPrimary ? "text-[#123B46]" : "text-[#197A73]"
                        }`}
                      />
                      <h3 className="text-lg font-bold text-[#172A30]">
                        {area.name}
                      </h3>
                    </div>

                    <span
                      className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                        isPrimary
                          ? "bg-[#123B46] text-white"
                          : "border border-[#E3EAE7] bg-white text-[#5D6B70]"
                      }`}
                    >
                      {area.statusLabel}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[#5D6B70]">
                    {area.description}
                  </p>

                  <ul role="list" className="mt-4 space-y-1.5 border-t border-[#E3EAE7] pt-3.5">
                    {area.commonRequests.map((req) => (
                      <li
                        key={req}
                        className="flex items-center gap-2 text-xs text-[#172A30]"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="h-3.5 w-3.5 shrink-0 text-[#197A73]"
                        />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-2">
                  <Link
                    href={`/contact?locality=${encodeURIComponent(area.name)}#booking-form`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123B46] hover:text-[#197A73]"
                  >
                    <span>Enquire for {area.name}</span>
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
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

