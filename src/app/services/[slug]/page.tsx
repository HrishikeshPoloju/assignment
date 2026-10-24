import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allServices, getServiceBySlug } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { FinalCTA } from "@/components/home/FinalCTA";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} in ${siteConfig.primaryArea}, ${siteConfig.city}`,
    description: `${service.shortDescription} View included scope, exclusions, related services and request a transparent quotation from ${siteConfig.legalOrFullName}.`,
    openGraph: {
      title: `${service.name} | ${siteConfig.brandName}`,
      description: service.shortDescription,
      images: [
        {
          url: service.image.src,
          width: service.image.width,
          height: service.image.height,
          alt: service.image.alt,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-[#F8FAF9]">
      <ServiceDetail service={service} />
      <FinalCTA />
    </div>
  );
}

