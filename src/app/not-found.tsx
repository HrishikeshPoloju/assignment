import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#F8FAF9] py-20 sm:py-28">
      <div className="mx-auto max-w-[600px] px-4 text-center sm:px-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6F2EE] text-[#123B46]">
          <Compass className="h-7 w-7 text-[#25AFA5]" aria-hidden="true" />
        </div>
        <p className="mt-5 text-[12px] font-semibold tracking-[0.14em] text-[#197A73] uppercase">
          Page Not Found
        </p>
        <h1 className="mt-2 text-[32px] font-semibold tracking-tight text-[#123B46] sm:text-[40px]">
          We couldn’t find that page
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-[#5D6B70]">
          The service or page you are looking for may have moved. Explore our complete service catalogue or request a custom quotation.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#123B46] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0d2c35]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center rounded-xl border border-[#D0DDD8] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#123B46] transition-colors hover:bg-[#E6F2EE]/60"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}

