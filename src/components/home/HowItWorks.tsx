import React from "react";
import { Search, MessageSquareText, FileCheck2, Sparkles } from "lucide-react";

const steps = [
  {
    stepNumber: "01",
    icon: Search,
    title: "Choose a Service",
    description:
      "Browse our service categories or packages and select the primary service and any optional add-ons that suit your space.",
  },
  {
    stepNumber: "02",
    icon: MessageSquareText,
    title: "Share Your Requirements",
    description:
      "Tell us your property type, locality in Pune, preferred date and any specific details (such as BHK size or tank capacity).",
  },
  {
    stepNumber: "03",
    icon: FileCheck2,
    title: "Receive a Quotation & Confirm",
    description:
      "We review your scope, share a transparent quotation and confirm slot availability before locking in your appointment.",
  },
  {
    stepNumber: "04",
    icon: Sparkles,
    title: "Get the Service Completed",
    description:
      "Our team or coordinated specialist partner arrives at the scheduled window to complete the agreed scope cleanly.",
  },
];

export function HowItWorks() {
  return (
    <section className="defer-below-fold border-b border-[#E3EAE7] bg-[#F8FAF9] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#197A73] uppercase">
            Simple Process
          </span>
          <h2 className="mt-2 text-[30px] leading-tight font-bold text-[#172A30] sm:text-[36px]">
            How It Works
          </h2>
          <p className="mt-2.5 text-base text-[#5D6B70]">
            Four straightforward steps from selecting a service to enjoying a cleaner space.
          </p>
        </div>

        <ol
          role="list"
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.stepNumber}
                className="relative flex flex-col justify-between rounded-2xl border border-[#E3EAE7] bg-white p-6 shadow-[0_2px_10px_rgba(18,59,70,0.03)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6F2EE] text-[#123B46]">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold tracking-wider text-[#197A73]">
                      STEP {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#172A30]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5D6B70]">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

