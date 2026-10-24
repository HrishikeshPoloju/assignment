import React from "react";
import { Hero } from "@/components/home/Hero";
import { TrendingPacks } from "@/components/home/TrendingPacks";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyAquaShine } from "@/components/home/WhyAquaShine";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Packages } from "@/components/home/Packages";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrendingPacks />
      <FeaturedServices />
      <TrustStrip />
      <WhyAquaShine />
      <HowItWorks />
      <Packages />
      <BeforeAfter />
      <ServiceAreas />
      <FAQ />
      <FinalCTA />
    </>
  );
}

