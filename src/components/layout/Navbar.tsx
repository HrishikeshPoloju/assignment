"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "@/data/site-config";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerSheetRef = useRef<HTMLElement | null>(null);
  const openBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Manage inert on <main> and Escape key handling per modern-web-guidance (accessibility & navigation-drawer)
  useEffect(() => {
    const mainEl = document.getElementById("content");
    const footerEl = document.getElementById("site-footer");

    if (mobileOpen) {
      if (mainEl) mainEl.inert = true;
      if (footerEl) footerEl.inert = true;
      drawerSheetRef.current?.focus();
    } else {
      if (mainEl) mainEl.inert = false;
      if (footerEl) footerEl.inert = false;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        openBtnRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (mainEl) mainEl.inert = false;
      if (footerEl) footerEl.inert = false;
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#E3EAE7] shadow-[0_2px_12px_rgba(18,59,70,0.05)]"
          : "bg-[#F8FAF9]/95 border-b border-[#E3EAE7]"
      }`}
    >
      {/* Skip link for keyboard accessibility */}
      <a href="#content" className="skip-link visually-hidden">
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.brandName} — Return to homepage`}
          className="rounded-lg py-0.5"
        >
          <Logo variant="dark" />
        </Link>

        {/* Desktop Primary Navigation */}
        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          <ul className="flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex items-center rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#E6F2EE] text-[#123B46] font-semibold"
                        : "text-[#172A30] hover:bg-[#E6F2EE]/60 hover:text-[#123B46]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <Link
            href="/contact#booking-form"
            className="inline-flex items-center gap-2 rounded-xl bg-[#123B46] px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#0D2C35]"
          >
            <CalendarCheck aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
            <span>Book a Service</span>
          </Link>
        </div>

        {/* Mobile Compact Booking CTA + Accessible Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/contact#booking-form"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#123B46] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#0D2C35]"
          >
            <CalendarCheck aria-hidden="true" className="h-3.5 w-3.5 text-[#25AFA5]" />
            <span>Book</span>
          </Link>

          <button
            ref={openBtnRef}
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E3EAE7] bg-white text-[#123B46] transition-colors hover:bg-[#E6F2EE]"
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-x-0 top-[65px] bottom-0 z-50 bg-[#172A30]/40 backdrop-blur-xs md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMobileOpen(false);
            }
          }}
        >
          <nav
            ref={drawerSheetRef}
            tabIndex={-1}
            aria-label="Mobile navigation"
            className="w-full max-h-[calc(100svh-65px)] overflow-y-auto border-b border-[#E3EAE7] bg-white px-4 pt-4 pb-6 shadow-xl outline-none"
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-[#E6F2EE] text-[#123B46] font-semibold"
                          : "text-[#172A30] hover:bg-[#F8FAF9]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className={`h-4 w-4 ${
                          isActive ? "text-[#123B46]" : "text-[#5D6B70]"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 border-t border-[#E3EAE7] pt-5">
              <p className="mb-3 px-1 text-xs font-medium text-[#5D6B70]">
                Serving {siteConfig.primaryArea} and nearby Pune areas
              </p>
              <Link
                href="/contact#booking-form"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B46] px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0D2C35]"
              >
                <CalendarCheck aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
                <span>Book a Service</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

