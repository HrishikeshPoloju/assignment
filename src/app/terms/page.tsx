import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for AquaShine Facility Care covering quotations, scope inspection, utilities, safety requirements, and specialist partner services.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="bg-[#F8FAF9] py-14 sm:py-20">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[20px] border border-[#E3EAE7] bg-white p-6 shadow-xs sm:p-10">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-[#197A73] uppercase">
            Legal & Policies
          </p>
          <h1 className="mt-2 text-[30px] font-semibold tracking-tight text-[#123B46] sm:text-[36px]">
            Terms of Service
          </h1>
          <p className="mt-2 text-[14px] text-[#5D6B70]">
            Service Terms & Operational Scope • {siteConfig.legalOrFullName}
          </p>

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[#172A30]">
            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                1. Quotations & Scope Confirmation
              </h2>
              <p className="text-[#5D6B70]">
                Submitting an online enquiry or WhatsApp request does not create an automatic binding contract or fixed-price booking. Every quotation is prepared based on the property type, approximate size, current surface condition, and requested inclusions shared by the customer. If actual site conditions differ materially from the initial description, any scope or pricing adjustment will be discussed and agreed before work commences.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                2. Access, Water & Electricity Requirements
              </h2>
              <p className="text-[#5D6B70]">
                Unless explicitly agreed otherwise in writing, the customer or property representative must provide safe entry access, society or building permissions where required, and working water and electricity connections on-site for the duration of the cleaning or maintenance visit.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                3. Surface Compatibility & Pre-Existing Wear
              </h2>
              <p className="text-[#5D6B70]">
                Our teams select cleaning agents and tools suited to standard residential and commercial surfaces. However, permanent dye transfer, deep chemical etching, perished fabric backing, aged silicone discolouration, or structural wear may not be fully reversible through cleaning alone. Technicians will highlight visible pre-existing damage before treating sensitive areas.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                4. Safety & Specialized Services
              </h2>
              <p className="text-[#5D6B70]">
                Underground sump cleaning, high-reach exterior glass cleaning, and heavy commercial duct work are subject to strict safety, ventilation, and access requirements. {siteConfig.brandName} reserves the right to decline or reschedule tasks where site conditions pose a safety hazard to personnel.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                5. Hardware & Supply Items
              </h2>
              <p className="text-[#5D6B70]">
                Hardware components supplied or fitted (such as tank overflow alarms, sensors, or wiring) carry manufacturer warranties as indicated upon quotation and delivery. AquaShine tests fitted alarm units at completion to ensure proper operation.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                6. Water Testing & TDS Advisory
              </h2>
              <p className="text-[#5D6B70]">
                On-site TDS (Total Dissolved Solids) readings measure dissolved mineral conductivity only and do not constitute a complete test of drinking-water potability or microbiological safety. Comprehensive water safety assessment requires accredited laboratory testing.
              </p>
            </section>

            <div className="pt-4">
              <Link
                href="/cancellation"
                className="text-[14px] font-semibold text-[#123B46] underline underline-offset-4"
              >
                View Cancellation & Rescheduling Policy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

