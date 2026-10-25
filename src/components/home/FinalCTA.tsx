import React from "react";
import Link from "next/link";
import { CalendarCheck, MessageSquare } from "lucide-react";
import { buildGeneralWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCTA() {
  const whatsappUrl =
    "https://wa.me/917995770546?text=Hi%20AquaShine%21%20I%20want%20to%20book%20a%20cleaning%20service.%0AService%3A%20%0AArea%20%2F%20Pincode%3A%20%0APreferred%20date%3A%20%0AProperty%20type%3A%20Home%20%2F%20Society%20%2F%20Office";
  const phoneTel = "tel:+917995770546";

  return (
    <section className="defer-below-fold bg-[#E6F2EE] py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#123B46]/15 bg-[#123B46] px-6 py-12 text-center text-white shadow-[0_16px_40px_rgba(18,59,70,0.14)] sm:px-12 sm:py-16">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-[0.14em] text-[#E6F2EE] uppercase">
            Viman Nagar &amp; Nearby Pune Areas
          </span>

          <h2 className="mx-auto mt-4 max-w-2xl text-[30px] leading-tight font-bold text-white sm:text-[40px]">
            Ready for a Cleaner Space?
          </h2>

          <p className="mx-auto mt-3.5 max-w-xl text-base leading-relaxed text-[#E6F2EE]/90 sm:text-lg">
            Tell us what you need and we will help you find the right service.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              href="/contact#booking-form"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25AFA5] px-7 py-3.5 text-base font-semibold text-[#123B46] shadow-xs transition-colors hover:bg-[#2EC2B7] sm:w-auto"
            >
              <CalendarCheck aria-hidden="true" className="h-5 w-5" />
              <span>Book a Service</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/20 sm:w-auto"
            >
              <MessageSquare aria-hidden="true" className="h-5 w-5 text-[#25AFA5]" />
              <span>WhatsApp Booking</span>
            </a>

            <a
              href={phoneTel}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 sm:w-auto"
            >
              <span>Call +91 79957 70546</span>
            </a>
          </div>

          <p className="mt-5 text-xs text-[#E6F2EE]/75">
            No instant payment required • Clear scope &amp; quotation shared prior to booking confirmation
          </p>
        </div>
      </div>
    </section>
  );
}

