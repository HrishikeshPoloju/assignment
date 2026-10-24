import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatServicePriceLabel, ServiceItem } from "@/data/services";

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const priceLabel = formatServicePriceLabel(service);

  return (
    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#E3EAE7] bg-white shadow-[0_2px_10px_rgba(18,59,70,0.03)] transition-all duration-200 hover:border-[#25AFA5]/60 hover:shadow-[0_10px_28px_rgba(18,59,70,0.08)]">
      <div>
        <Link
          href={`/services/${service.slug}`}
          className="relative block overflow-hidden bg-[#E6F2EE]"
        >
          <img
            src={service.image.src}
            alt={service.image.alt}
            width={service.image.width}
            height={service.image.height}
            loading="lazy"
            className="aspect-3/2 h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-safe-transition"
          />
        </Link>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-medium text-[#5D6B70]">
              {service.categoryName}
            </span>
            <span className="rounded-md bg-[#F8FAF9] px-2 py-0.5 font-semibold text-[#123B46] border border-[#E3EAE7]">
              {priceLabel}
            </span>
          </div>

          <h3 className="mt-2.5 text-lg font-bold text-[#172A30] group-hover:text-[#123B46]">
            <Link href={`/services/${service.slug}`}>{service.name}</Link>
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[#5D6B70]">
            {service.shortDescription}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#E3EAE7] px-5 py-3.5 sm:px-6">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#123B46] transition-colors hover:text-[#197A73]"
        >
          <span>Explore Service</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>

        <Link
          href={`/contact?category=${encodeURIComponent(
            service.categoryId
          )}&service=${encodeURIComponent(service.slug)}#booking-form`}
          className="rounded-lg bg-[#E6F2EE] px-3 py-1.5 text-xs font-semibold text-[#123B46] transition-colors hover:bg-[#123B46] hover:text-white"
        >
          Book / Quote
        </Link>
      </div>
    </article>
  );
}

