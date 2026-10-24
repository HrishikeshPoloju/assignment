import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for AquaShine Facility Care explaining how service enquiry and booking data is collected, used, and protected.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F8FAF9] py-14 sm:py-20">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[20px] border border-[#E3EAE7] bg-white p-6 shadow-xs sm:p-10">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-[#197A73] uppercase">
            Legal & Policies
          </p>
          <h1 className="mt-2 text-[30px] font-semibold tracking-tight text-[#123B46] sm:text-[36px]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-[14px] text-[#5D6B70]">
            Effective Policy • {siteConfig.legalOrFullName}
          </p>

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[#172A30]">
            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                1. Information We Collect
              </h2>
              <p className="text-[#5D6B70]">
                When you submit a service enquiry or booking request through our website or via WhatsApp, we collect only the information needed to assess scope, provide a quotation, and coordinate your service:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-[#5D6B70]">
                <li>Your full name and mobile or WhatsApp contact number.</li>
                <li>Optional email address if provided for quotation delivery.</li>
                <li>Locality/area in Pune (e.g., Viman Nagar, Kharadi) and property type or size.</li>
                <li>Selected primary service, related add-on requests, preferred appointment window, and scope notes.</li>
                <li>Any photographs or videos you voluntarily share via WhatsApp to assist with quotation accuracy.</li>
              </ul>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                2. How We Use Your Information
              </h2>
              <p className="text-[#5D6B70]">
                We use the information you provide strictly for operational purposes:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-[#5D6B70]">
                <li>Reviewing your service requirements and preparing a transparent quotation.</li>
                <li>Confirming appointment availability, scheduling teams, and communicating arrival updates.</li>
                <li>Coordinating with specialist network partners (such as laboratory water-testing partners, purifier technicians, or stone polishing specialists) only when you explicitly request a partner-fulfilled service.</li>
                <li>Maintaining service records and responding to follow-up queries.</li>
              </ul>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                3. Data Sharing & Specialist Coordination
              </h2>
              <p className="text-[#5D6B70]">
                {siteConfig.brandName} does not sell, rent, or trade your personal contact details to third-party marketers or lead-generation platforms. Where your booking includes a specialist partner service, only the relevant job details and location required to fulfill that specific service are shared with the assigned specialist partner after your confirmation.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                4. Data Storage & Security
              </h2>
              <p className="text-[#5D6B70]">
                Enquiries submitted through the website are stored securely for operational follow-up and quotation tracking. We restrict access to customer enquiry records to authorized personnel handling scheduling and service delivery.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                5. Your Choices & Contact
              </h2>
              <p className="text-[#5D6B70]">
                You may request updates or deletion of your enquiry details at any time by contacting us through our{' '}
                <Link href="/contact" className="font-medium text-[#123B46] underline underline-offset-4">
                  Contact & Booking page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

