"use client";

import React, { useState } from "react";
import { MessageSquare, Copy, Check, ExternalLink, Info } from "lucide-react";
import {
  buildEnquiryMessageText,
  getWhatsAppUrl,
  isWhatsAppConfigured,
} from "@/lib/whatsapp";
import { BookingFormData } from "@/lib/validation";

interface WhatsAppCTAProps {
  formData: BookingFormData;
  enquiryRef?: string;
}

export function WhatsAppCTA({ formData, enquiryRef }: WhatsAppCTAProps) {
  const [copied, setCopied] = useState(false);
  const messageText = buildEnquiryMessageText(formData, enquiryRef);
  const whatsappUrl = getWhatsAppUrl(messageText);
  const configured = isWhatsAppConfigured();

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback if clipboard API restricted
    }
  };

  return (
    <div className="rounded-2xl border border-[#123B46]/20 bg-[#F8FAF9] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#197A73] uppercase">
            <MessageSquare aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Prefilled WhatsApp Enquiry</span>
          </span>
          <h3 className="mt-1 text-lg font-bold text-[#172A30]">
            Send or Copy Your Structured Enquiry Details
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#5D6B70]">
            Review the prefilled message below. WhatsApp opens only when you explicitly click the button.
          </p>
        </div>
      </div>

      {/* Preview of Prefilled Message */}
      <pre
        tabIndex={0}
        aria-label="Prefilled WhatsApp enquiry message text"
        className="mt-4 max-h-56 overflow-y-auto rounded-xl border border-[#E3EAE7] bg-white p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-[#172A30]"
      >
        <code>{messageText}</code>
      </pre>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        {configured && whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B46] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D2C35]"
          >
            <MessageSquare aria-hidden="true" className="h-4 w-4 text-[#25AFA5]" />
            <span>Continue to WhatsApp</span>
            <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 opacity-80" />
          </a>
        ) : (
          <div className="flex flex-1 items-start gap-2.5 rounded-xl border border-[#123B46]/15 bg-[#E6F2EE]/70 px-4 py-3 text-xs text-[#123B46]">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#123B46]" />
            <span>
              Your enquiry has been recorded online. Direct WhatsApp click-to-chat activates once the verified business WhatsApp number is configured in{" "}
              <code className="rounded bg-white px-1 py-0.5 font-mono text-[11px]">
                src/data/site-config.ts
              </code>
              . You can copy your formatted summary below at any time.
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleCopyMessage}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#123B46]/30 bg-white px-4 py-3 text-sm font-semibold text-[#123B46] transition-colors hover:bg-[#E6F2EE]"
        >
          {copied ? (
            <>
              <Check aria-hidden="true" className="h-4 w-4 text-[#188038]" />
              <span>Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy aria-hidden="true" className="h-4 w-4 text-[#197A73]" />
              <span>Copy Enquiry Text</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

