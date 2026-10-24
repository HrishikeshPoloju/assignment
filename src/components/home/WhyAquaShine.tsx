import React from "react";
import Link from "next/link";
import { Compass, ClipboardCheck, Calendar, Layers, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Compass,
    title: "Easy Service Discovery",
    description:
      "Clear categories and dedicated detail pages help you choose the exact cleaning or maintenance service your space requires.",
  },
  {
    icon: ClipboardCheck,
    title: "Clear Scope & Quotations",
    description:
      "Every service lists what is included and what is excluded up front, so you receive an accurate quote before confirming.",
  },
  {
    icon: Calendar,
    title: "Flexible Appointment Requests",
    description:
      "Request morning, afternoon or weekend slots that fit your household routine, tenant turnover or commercial operating hours.",
  },
  {
    icon: Layers,
    title: "Related Services in One Place",
    description:
      "Combine in-house deep cleaning with coordinated water testing, purifier maintenance, plumbing referrals or balcony netting.",
  },
];

export function WhyAquaShine() {
  return (
    <section className="defer-below-fold border-b border-[#E3EAE7] bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Image */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-2.5 shadow-xs">
              <img
                src="/images/why-aquashine.webp"
                alt="Spacious, spotless modern apartment interior with clean floors and balcony glass doors"
                width={1000}
                height={800}
                loading="lazy"
                className="aspect-5/4 h-auto w-full rounded-xl object-cover"
              />
              <div className="mt-3 rounded-xl bg-[#E6F2EE] p-4">
                <p className="text-xs font-semibold tracking-wider text-[#123B46] uppercase">
                  Honest Scope • Transparent Process
                </p>
                <p className="mt-1 text-sm text-[#172A30]">
                  We clearly distinguish services performed directly by AquaShine from specialized tasks coordinated through our local partner network.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Concise Content */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
              Why AquaShine
            </span>
            <h2 className="mt-2 text-[30px] leading-tight font-bold text-[#172A30] sm:text-[36px]">
              Designed Around Clarity, Care and Convenience
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#5D6B70] sm:text-[17px]">
              Whether you need a single sofa deep cleaned, an overhead water tank scrubbed, or an entire empty flat prepared before move-in, we keep the process straightforward from enquiry to completion.
            </p>

            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6F2EE] text-[#123B46]">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3.5 text-base font-bold text-[#172A30]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#5D6B70]">
                      {item.description}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#123B46] hover:text-[#197A73]"
              >
                <span>Learn more about how we operate</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

