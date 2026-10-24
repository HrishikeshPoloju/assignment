import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  CalendarCheck,
  MessageSquare,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { formatServicePriceLabel, ServiceItem } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import { buildGeneralWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import { RelatedServices } from "./RelatedServices";

interface ServiceDetailProps {
  service: ServiceItem;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const priceLabel = formatServicePriceLabel(service);
  const whatsappUrl = getWhatsAppUrl(
    buildGeneralWhatsAppMessage(`${service.name} (${service.categoryName})`)
  );
  const bookingUrl = `/contact?category=${encodeURIComponent(
    service.categoryId
  )}&service=${encodeURIComponent(service.slug)}#booking-form`;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#5D6B70] sm:text-sm">
          <li>
            <Link href="/" className="hover:text-[#123B46]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link href="/services" className="hover:text-[#123B46]">
              Services
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link
              href={`/services#${service.categoryId}`}
              className="hover:text-[#123B46]"
            >
              {service.categoryName}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="font-semibold text-[#172A30]">
            {service.name}
          </li>
        </ol>
      </nav>

      {/* Top Hero Split: Service Summary + Photograph */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-lg bg-[#E6F2EE] px-3 py-1 text-xs font-semibold text-[#123B46]">
              {service.categoryName}
            </span>
          </div>

          <h1 className="mt-4 text-3xl leading-tight font-bold text-[#172A30] sm:text-4xl lg:text-[42px]">
            {service.name}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#5D6B70] sm:text-lg">
            {service.fullDescription}
          </p>

          {/* Important Safety / Technical Notice */}
          {service.importantNotice && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50/90 p-4 text-sm leading-relaxed text-amber-950">
              <AlertTriangle
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
              />
              <div>{service.importantNotice}</div>
            </div>
          )}

          {/* Pricing Guidance Box */}
          <div className="mt-6 rounded-2xl border border-[#E3EAE7] bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#5D6B70] uppercase">
                  Pricing &amp; Quotation Basis
                </p>
                <p className="mt-1 text-xl font-bold text-[#123B46]">
                  {priceLabel}
                </p>
                {service.unit && (
                  <p className="mt-0.5 text-xs text-[#5D6B70]">
                    Scope basis: {service.unit}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={bookingUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#123B46] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D2C35]"
                >
                  <CalendarCheck aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
                  <span>Book / Request Quote</span>
                </Link>

                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#123B46]/25 bg-[#F8FAF9] px-4 py-3 text-sm font-semibold text-[#123B46] transition-colors hover:bg-[#E6F2EE]"
                  >
                    <MessageSquare aria-hidden="true" className="h-4 w-4 text-[#197A73]" />
                    <span>WhatsApp</span>
                  </a>
                ) : (
                  <Link
                    href={`${bookingUrl}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#123B46]/25 bg-[#F8FAF9] px-4 py-3 text-sm font-semibold text-[#123B46] transition-colors hover:bg-[#E6F2EE]"
                  >
                    <MessageSquare aria-hidden="true" className="h-4 w-4 text-[#197A73]" />
                    <span>WhatsApp Enquiry</span>
                  </Link>
                )}
              </div>
            </div>

            <p className="mt-3 border-t border-[#E3EAE7] pt-3 text-xs text-[#5D6B70]">
              {siteConfig.pricingPolicy.disclaimer}
            </p>
          </div>
        </div>

        {/* Right Column: Service Photograph + Who This Is For */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-[#E3EAE7] bg-white p-2.5 shadow-xs">
            <img
              src={service.image.src}
              alt={service.image.alt}
              width={service.image.width}
              height={service.image.height}
              fetchPriority="high"
              className="aspect-3/2 h-auto w-full rounded-xl object-cover"
            />
          </div>

          <div className="mt-6 rounded-2xl border border-[#E3EAE7] bg-white p-6">
            <h2 className="text-base font-bold text-[#172A30]">
              Who This Service Is For
            </h2>
            <ul role="list" className="mt-3.5 space-y-2.5">
              {service.idealFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-[#5D6B70]"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#197A73]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Included vs Excluded Scope */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section
          aria-labelledby="included-scope-heading"
          className="rounded-2xl border border-[#E3EAE7] bg-white p-6 sm:p-8"
        >
          <h2
            id="included-scope-heading"
            className="flex items-center gap-2 text-xl font-bold text-[#172A30]"
          >
            <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-[#197A73]" />
            <span>What Is Included</span>
          </h2>
          <ul role="list" className="mt-4 space-y-3">
            {service.includedScope.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm leading-relaxed text-[#172A30]"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#197A73]"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="excluded-scope-heading"
          className="rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-6 sm:p-8"
        >
          <h2
            id="excluded-scope-heading"
            className="flex items-center gap-2 text-xl font-bold text-[#172A30]"
          >
            <XCircle aria-hidden="true" className="h-5 w-5 text-[#5D6B70]" />
            <span>What Is Excluded</span>
          </h2>
          <p className="mt-1 text-xs text-[#5D6B70]">
            Listed clearly to prevent misunderstandings on the day of service:
          </p>
          <ul role="list" className="mt-4 space-y-3">
            {service.exclusions.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm leading-relaxed text-[#5D6B70]"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5D6B70]"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Interactive Related Services Builder */}
      <RelatedServices primaryService={service} />

      {/* Service-Specific FAQs */}
      {service.faqs.length > 0 && (
        <section
          aria-labelledby="service-faq-heading"
          className="mt-12 rounded-2xl border border-[#E3EAE7] bg-white p-6 sm:p-8"
        >
          <h2 id="service-faq-heading" className="text-2xl font-bold text-[#172A30]">
            Common Questions About {service.name}
          </h2>
          <div className="mt-6 space-y-3">
            {service.faqs.map((faq, idx) => (
              <details
                key={faq.question}
                name={`service-faq-${service.slug}`}
                open={idx === 0}
                className="disclosure-item group rounded-xl border border-[#E3EAE7] bg-[#F8FAF9]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-[#172A30] select-none marker:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#123B46] transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="border-t border-[#E3EAE7] px-5 pt-3 pb-4 text-sm leading-relaxed text-[#5D6B70]">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

