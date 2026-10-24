"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarCheck, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export function MobileStickyCTA() {
  const pathname = usePathname();

  // Hide on admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHome = pathname === "/";
  const isBooking = pathname === "/contact" || pathname?.startsWith("/contact#");
  const isServices = pathname === "/services" || pathname?.startsWith("/services/");

  const whatsappUrl = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        "Hi AquaShine, I would like to book a home cleaning or tank care service in Pune."
      )}`
    : "/contact#booking-form";

  return (
    <nav
      role="navigation"
      aria-label="Mobile Navigation Bar"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E3EAE7] bg-white/95 px-4 py-2 shadow-2xl backdrop-blur-md md:hidden safe-area-bottom"
    >
      <div className="mx-auto flex max-w-sm items-center justify-around gap-2">
        {/* Tab 1: Home (Reference Image 1 & 2) */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 transition-all ${
            isHome
              ? "bg-[#E6F8F0] text-[#0FA958] font-black"
              : "text-[#5D6B70] hover:text-[#123B46] font-medium"
          }`}
        >
          <Home className={`h-4 w-4 ${isHome ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* Tab 2: Book / Services */}
        <Link
          href="/contact#booking-form"
          className={`flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 transition-all ${
            isBooking
              ? "bg-[#E6F2EE] text-[#123B46] font-black"
              : "text-[#5D6B70] hover:text-[#123B46] font-medium"
          }`}
        >
          <CalendarCheck
            className={`h-4 w-4 ${isBooking ? "stroke-[2.5] text-[#123B46]" : "stroke-[1.75]"}`}
          />
          <span className="text-[10px] tracking-tight">Bookings</span>
        </Link>

        {/* Tab 3: Quick WhatsApp / Help */}
        <a
          href={whatsappUrl}
          target={siteConfig.contact.whatsappNumber ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 text-[#5D6B70] hover:text-[#25D366] transition-all font-medium"
        >
          <div className="relative">
            <MessageCircle className="h-4 w-4 text-[#25D366] stroke-[2]" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#25D366]" />
          </div>
          <span className="text-[10px] tracking-tight">Help</span>
        </a>
      </div>
    </nav>
  );
}
