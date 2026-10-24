import React from "react";
import Link from "next/link";
import { MapPin, Clock, MessageSquare, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "@/data/site-config";
import { serviceCategories } from "@/data/services";
import { buildGeneralWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const whatsappUrl = getWhatsAppUrl(buildGeneralWhatsAppMessage());
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="border-t border-[#E3EAE7] bg-[#123B46] text-white pb-20 md:pb-0"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${siteConfig.brandName} Home`}>
              <Logo variant="light" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#E6F2EE]/85">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-[#E6F2EE]/85">
              <div className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#25AFA5]"
                />
                <span>{siteConfig.contact.baseLocationLabel}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#25AFA5]"
                />
                <span>{siteConfig.contact.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Service Categories */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
              Service Categories
            </h2>
            <ul role="list" className="mt-4 space-y-2.5 text-sm">
              {serviceCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/services#${cat.slug}`}
                    className="text-[#E6F2EE]/80 transition-colors hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
              Service Areas
            </h2>
            <ul role="list" className="mt-4 space-y-2.5 text-sm">
              {siteConfig.serviceAreas.map((area) => (
                <li key={area.slug} className="flex items-center gap-1.5">
                  <Link
                    href={`/contact?locality=${encodeURIComponent(area.name)}#booking-form`}
                    className="text-[#E6F2EE]/80 transition-colors hover:text-white"
                  >
                    {area.name}
                  </Link>
                  {area.tier === "primary" && (
                    <span className="rounded-md bg-[#25AFA5]/25 px-1.5 py-0.5 text-[10px] font-semibold text-[#E6F2EE]">
                      Primary
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-[#E6F2EE]/65">
              Nearby Pune localities are served subject to slot &amp; scope confirmation.
            </p>
          </div>

          {/* Column 4: Contact & Quick Action */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
              Enquiries &amp; Bookings
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#E6F2EE]/80">
              Share your requirements through our online booking form for a transparent scope review and quotation.
            </p>

            <div className="mt-4 space-y-2.5 text-sm">
              {siteConfig.contact.phoneDisplay ? (
                <a
                  href={`tel:${siteConfig.contact.phoneDisplay.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-[#E6F2EE] hover:text-white"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
                  <span>{siteConfig.contact.phoneDisplay}</span>
                </a>
              ) : null}

              {siteConfig.contact.email ? (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-[#E6F2EE] hover:text-white"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              ) : null}
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href="/contact#booking-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25AFA5] px-4 py-2.5 text-sm font-semibold text-[#123B46] transition-colors hover:bg-[#2CC4B9]"
              >
                <span>Request a Quotation</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E6F2EE]/30 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <MessageSquare aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
                  <span>Chat on WhatsApp</span>
                </a>
              ) : (
                <Link
                  href="/contact#booking-form"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E6F2EE]/30 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <MessageSquare aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
                  <span>Prepare WhatsApp Enquiry</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Policy Links */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-xs text-[#E6F2EE]/75 sm:flex-row sm:items-center">
          <p>
            &copy; {currentYear} {siteConfig.legalOrFullName}. Serving {siteConfig.primaryArea}, {siteConfig.city}.
          </p>
          <nav aria-label="Legal and policy links">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-white">
                  Cancellation &amp; Rescheduling Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#25AFA5] hover:text-white">
                  Admin Bookings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

