import React, { Suspense } from "react";
import type { Metadata } from "next";
import { MapPin, Clock, MessageSquare, Phone, Mail, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book a Service or Request a Quotation — Viman Nagar, Pune",
  description:
    "Submit your cleaning or home-care service request for Viman Nagar, Kharadi, Wadgaon Sheri, Dhanori, Lohegaon or Yerawada. Get a clear scope review and quotation from AquaShine.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#F8FAF9]">
      {/* Page Header */}
      <section className="border-b border-[#E3EAE7] bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
                Book a Service • Contact Us
              </span>
              <h1 className="mt-2 text-3xl leading-tight font-bold text-[#172A30] sm:text-4xl lg:text-[44px]">
                Request a Service Quotation
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#5D6B70]">
                Select the service you need, add any optional services and share your preferred schedule. We will review your scope and confirm slot availability and pricing.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-5 text-sm">
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#197A73]"
                    />
                    <span>
                      <strong className="text-[#172A30]">Service Base:</strong>{" "}
                      {siteConfig.contact.baseLocationLabel}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#197A73]"
                    />
                    <span>
                      <strong className="text-[#172A30]">Hours:</strong>{" "}
                      {siteConfig.contact.workingHours}
                    </span>
                  </div>
                  {siteConfig.contact.phoneDisplay && (
                    <div className="flex items-center gap-2.5">
                      <Phone
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[#197A73]"
                      />
                      <a
                        href={`tel:${siteConfig.contact.phoneDisplay.replace(/\s+/g, "")}`}
                        className="font-semibold text-[#123B46] hover:underline"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </div>
                  )}
                  {siteConfig.contact.email && (
                    <div className="flex items-center gap-2.5">
                      <Mail
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[#197A73]"
                      />
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="font-semibold text-[#123B46] hover:underline"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 pt-1 text-xs text-[#5D6B70]">
                    <MessageSquare
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[#197A73]"
                    />
                    <span>
                      Prefilled WhatsApp enquiry summary generated upon form submission
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Booking Form Section */}
      <section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-[#E3EAE7] bg-white p-8 text-sm text-[#5D6B70]">
              Loading booking form...
            </div>
          }
        >
          <BookingForm />
        </Suspense>

        {/* Localities Strip */}
        <div className="mt-14 rounded-2xl border border-[#E3EAE7] bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[#172A30]">
            Covered Localities Around {siteConfig.primaryArea}
          </h2>
          <p className="mt-1 text-sm text-[#5D6B70]">
            We prioritize daily slots in {siteConfig.primaryArea} and schedule visits in nearby neighbourhoods upon operational confirmation:
          </p>
          <ul
            role="list"
            className="mt-4 flex flex-wrap gap-2.5"
          >
            {siteConfig.serviceAreas.map((area) => (
              <li
                key={area.slug}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] px-3.5 py-2 text-xs font-semibold text-[#172A30]"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-[#197A73]"
                />
                <span>{area.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

