import React from "react";
import { ChevronDown } from "lucide-react";

export const homepageFaqs = [
  {
    question: "Which areas do you serve?",
    answer:
      "Our primary service area is Viman Nagar, Pune. We also serve nearby neighbourhoods including Kharadi, Wadgaon Sheri, Dhanori, Lohegaon and Yerawada subject to schedule and operational confirmation for your requested service.",
  },
  {
    question: "How can I get a quotation?",
    answer:
      "Select your primary service and any optional add-ons in our online Booking Form (or via WhatsApp), and share basic property details such as BHK size, bathroom count, sofa seating or tank capacity in litres. We review the scope and provide a clear, itemized quotation before confirming your appointment.",
  },
  {
    question: "Can I book multiple services together?",
    answer:
      "Yes. You can combine a primary service with related add-ons—for example, booking Kitchen Deep Cleaning alongside Chimney Filter Cleaning and Water Purifier Servicing, or combining Sofa and Mattress Deep Cleaning in a single visit.",
  },
  {
    question: "Do you offer commercial cleaning?",
    answer:
      "Yes. We provide one-time and recurring deep cleaning quotations for offices, coworking spaces, PGs, hostels, cafés, restaurants, gyms, clinics and co-operative housing societies.",
  },
  {
    question: "Do you provide water tank testing?",
    answer:
      "We offer on-site digital TDS measurement directly and coordinate comprehensive chemical and microbiological water-quality testing through an appropriate laboratory partner. Please note that a handheld TDS reading only measures dissolved solids and is not a complete test of drinking-water safety.",
  },
  {
    question: "Can I request purifier servicing or tank overflow alarm installation?",
    answer:
      "Yes. Under our Water Tank & Water Care category, you can request domestic water purifier servicing, filter replacement, purifier installation (through a qualified provider) and wired water-tank overflow alarm supply and installation.",
  },
  {
    question: "How can I reschedule a booking?",
    answer:
      "If you need to reschedule or cancel a confirmed appointment, please notify us via WhatsApp or phone at least 24 hours before your scheduled window so we can reassign the crew and arrange a convenient new slot at no rescheduling charge.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="defer-below-fold border-b border-[#E3EAE7] bg-[#F8FAF9] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
            Common Questions
          </span>
          <h2 className="mt-2 text-[30px] leading-tight font-bold text-[#172A30] sm:text-[36px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2.5 text-base text-[#5D6B70]">
            Clear answers about our service areas, quotation process, water care policies and scheduling.
          </p>
        </div>

        {/* Accessible Native Details/Summary Accordion (modern-web-guidance: search-hidden-content & animate-to-intrinsic-sizes) */}
        <div className="mt-10 space-y-3.5">
          {homepageFaqs.map((faq, index) => (
            <details
              key={faq.question}
              name="aquashine-home-faq"
              open={index === 0}
              className="disclosure-item group rounded-2xl border border-[#E3EAE7] bg-white transition-colors open:border-[#123B46]/35"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-[#172A30] select-none marker:hidden">
                <span>{faq.question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E6F2EE] text-[#123B46] transition-transform duration-200 group-open:rotate-180">
                  <ChevronDown aria-hidden="true" className="h-4 w-4" />
                </span>
              </summary>
              <div className="border-t border-[#E3EAE7]/70 px-6 pt-3 pb-5 text-sm leading-relaxed text-[#5D6B70] sm:text-[15px]">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

