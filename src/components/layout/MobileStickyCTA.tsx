"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarCheck, MessageCircle, Phone } from "lucide-react";

export function MobileStickyCTA() {
  const pathname = usePathname();

  // Hide on admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHome = pathname === "/";
  const isBooking = pathname === "/contact" || pathname?.startsWith("/contact#");

  const whatsappUrl =
    "https://wa.me/917995770546?text=Hi%20AquaShine%21%20I%20want%20to%20book%20a%20cleaning%20service.%0AService%3A%20%0AArea%20%2F%20Pincode%3A%20%0APreferred%20date%3A%20%0AProperty%20type%3A%20Home%20%2F%20Society%20%2F%20Office";
  const phoneTel = "tel:+917995770546";

  return (
    <nav
      role="navigation"
      aria-label="Mobile Navigation Bar"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E3EAE7] bg-white/95 px-3 py-1.5 shadow-2xl backdrop-blur-md md:hidden safe-area-bottom"
    >
      <div className="mx-auto flex max-w-sm items-center justify-between gap-1">
        {/* Tab 1: Home */}
        <Link
          href="/"
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition-all ${
            isHome
              ? "bg-[#E6F8F0] text-[#0FA958] font-black"
              : "text-[#5D6B70] hover:text-[#123B46] font-medium"
          }`}
        >
          <Home className={`h-4 w-4 ${isHome ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* Tab 2: Book / 2-Step Form */}
        <Link
          href="/contact#booking-form"
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition-all ${
            isBooking
              ? "bg-[#E6F2EE] text-[#123B46] font-black"
              : "text-[#5D6B70] hover:text-[#123B46] font-medium"
          }`}
        >
          <CalendarCheck
            className={`h-4 w-4 ${isBooking ? "stroke-[2.5] text-[#123B46]" : "stroke-[1.75]"}`}
          />
          <span className="text-[10px] tracking-tight">Book</span>
        </Link>

        {/* Tab 3: Direct Phone Call */}
        <a
          href={phoneTel}
          aria-label="Call +91 79957 70546"
          className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[#5D6B70] hover:text-[#123B46] transition-all font-medium"
        >
          <Phone className="h-4 w-4 text-[#197A73] stroke-[2]" />
          <span className="text-[10px] tracking-tight">Call</span>
        </a>

        {/* Tab 4: Direct WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[#5D6B70] hover:text-[#25D366] transition-all font-medium"
        >
          <div className="relative">
            <MessageCircle className="h-4 w-4 text-[#25D366] stroke-[2]" />
            <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-[#25D366]" />
          </div>
          <span className="text-[10px] tracking-tight">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
