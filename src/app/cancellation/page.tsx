import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
  title: 'Cancellation & Rescheduling Policy',
  description:
    'Flexible rescheduling and cancellation policy for AquaShine Facility Care appointments in Viman Nagar and Pune.',
  alternates: {
    canonical: '/cancellation',
  },
};

export default function CancellationPage() {
  return (
    <div className="bg-[#F8FAF9] py-14 sm:py-20">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[20px] border border-[#E3EAE7] bg-white p-6 shadow-xs sm:p-10">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-[#197A73] uppercase">
            Legal & Policies
          </p>
          <h1 className="mt-2 text-[30px] font-semibold tracking-tight text-[#123B46] sm:text-[36px]">
            Cancellation & Rescheduling Policy
          </h1>
          <p className="mt-2 text-[14px] text-[#5D6B70]">
            Scheduling Flexibility • {siteConfig.legalOrFullName}
          </p>

          <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[#172A30]">
            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                1. Easy Rescheduling
              </h2>
              <p className="text-[#5D6B70]">
                We understand that handover dates, tenant schedules, and society water timings can shift. To reschedule a confirmed appointment without penalty, please notify us via WhatsApp or our contact page at least <strong>24 hours before</strong> your scheduled arrival window.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                2. Cancellations
              </h2>
              <p className="text-[#5D6B70]">
                Appointments cancelled at least 24 hours in advance incur no cancellation charges. If an advance deposit was collected for a large multi-person crew or specialist hardware procurement, it will be refunded or credited toward a rescheduled slot according to the terms stated on your quotation.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                3. Same-Day Changes & Site Access Delays
              </h2>
              <p className="text-[#5D6B70]">
                For last-minute cancellations (less than 12 hours before the slot) or situations where the crew arrives on-site but cannot access the property due to missing gate permissions, locked premises, or lack of water/electricity supply, a nominal transport and crew mobilization fee may apply if the team has already been dispatched.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="text-[19px] font-semibold text-[#123B46]">
                4. Water Tank Dewatering Coordination
              </h2>
              <p className="text-[#5D6B70]">
                For overhead water tank or underground sump cleaning, please ensure inlet valves are closed in advance so water levels are low when the crew arrives. If water supply conditions require moving the slot, let us know as early as possible so we can adjust the schedule smoothly.
              </p>
            </section>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#123B46] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0d2c35]"
              >
                Contact Us to Reschedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

