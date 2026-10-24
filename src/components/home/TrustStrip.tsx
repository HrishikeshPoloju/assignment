import React from "react";
import { CalendarClock, FileText, Building2, ShieldCheck } from "lucide-react";

const trustItems = [
  {
    icon: CalendarClock,
    title: "Convenient Booking",
    description:
      "Request your preferred date and time window online or via WhatsApp without lengthy phone tag.",
  },
  {
    icon: FileText,
    title: "Clear Quotations",
    description:
      "Know what is included, what is excluded and how pricing is structured before any work begins.",
  },
  {
    icon: Building2,
    title: "Residential & Commercial",
    description:
      "Tailored care for apartments, villas, PGs, clinics, cafés, offices and housing societies.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated In-House Crew",
    description:
      "Trained, background-verified professionals using specialized equipment and surface-safe agents.",
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Core value propositions"
      className="border-b border-[#E3EAE7] bg-white py-10 sm:py-12"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-[#E3EAE7]/80 bg-[#F8FAF9] p-4 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E6F2EE] text-[#123B46]">
                  <Icon aria-hidden="true" className="h-5 w-5 text-[#123B46]" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#172A30]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-[#5D6B70]">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

