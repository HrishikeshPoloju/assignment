import React from "react";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Layers,
  ShieldAlert,
  X,
} from "lucide-react";
import {
  formatServicePriceLabel,
  getCategoryById,
  getServiceBySlug,
} from "@/data/services";
import { BookingFormData } from "@/lib/validation";

interface BookingSummaryProps {
  formData: BookingFormData;
  onRemoveService?: (slug: string) => void;
  onRemoveAddOn?: (id: string) => void;
}

export function BookingSummary({
  formData,
  onRemoveService,
  onRemoveAddOn,
}: BookingSummaryProps) {
  const selectedServiceSlugs =
    Array.isArray(formData.serviceIds) && formData.serviceIds.length > 0
      ? formData.serviceIds
      : formData.serviceId
      ? [formData.serviceId]
      : [];

  const selectedServices = selectedServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const selectedAddOns = (formData.addOnIds || [])
    .map((id) => getServiceBySlug(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <aside
      aria-label="Selected service summary"
      className="rounded-2xl border border-[#E3EAE7] bg-white p-6 shadow-xs"
    >
      <div className="border-b border-[#E3EAE7] pb-4">
        <span className="text-xs font-semibold tracking-wider text-[#197A73] uppercase">
          Enquiry Review
        </span>
        <h3 className="mt-1 text-xl font-bold text-[#172A30]">
          Your Selected Scope
        </h3>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        {/* Selected Services (Multiple Supported) */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#5D6B70] uppercase">
              Selected Services ({selectedServices.length})
            </p>
          </div>

          {selectedServices.length > 0 ? (
            <ul role="list" className="mt-2 space-y-2">
              {selectedServices.map((service) => (
                <li
                  key={service.id}
                  className="rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] p-3 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="pr-1">
                      <p className="font-bold text-[#172A30]">{service.name}</p>
                      <span className="text-[11px] text-[#5D6B70]">
                        {service.categoryName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="shrink-0 rounded-md bg-[#E6F2EE] px-2 py-0.5 text-[11px] font-semibold text-[#123B46]">
                        {formatServicePriceLabel(service)}
                      </span>
                      {onRemoveService && selectedServices.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onRemoveService(service.slug)}
                          aria-label={`Remove ${service.name}`}
                          className="rounded-md p-1 text-[#5D6B70] hover:bg-[#FCE8E6] hover:text-[#C5221F]"
                        >
                          <X aria-hidden="true" className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-xs italic text-[#5D6B70]">
              Select one or more services from the form above.
            </p>
          )}
        </div>

        {/* Explicitly Selected Add-Ons */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#5D6B70] uppercase">
              Optional Add-Ons ({selectedAddOns.length})
            </p>
          </div>

          {selectedAddOns.length > 0 ? (
            <ul role="list" className="mt-2 space-y-2">
              {selectedAddOns.map((addon) => (
                <li
                  key={addon.id}
                  className="flex items-center justify-between gap-2 rounded-lg border border-[#E3EAE7] bg-[#F8FAF9] px-3 py-2 text-xs"
                >
                  <div>
                    <span className="font-semibold text-[#172A30]">
                      {addon.name}
                    </span>
                  </div>
                  {onRemoveAddOn && (
                    <button
                      type="button"
                      onClick={() => onRemoveAddOn(addon.slug)}
                      aria-label={`Remove ${addon.name} add-on`}
                      className="rounded-md p-1 text-[#5D6B70] hover:bg-[#FCE8E6] hover:text-[#C5221F]"
                    >
                      <X aria-hidden="true" className="h-3.5 w-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-xs text-[#5D6B70]">
              None selected. Add-ons are strictly optional.
            </p>
          )}
        </div>

        {/* Property & Schedule Details */}
        <div className="space-y-2 border-t border-[#E3EAE7] pt-4 text-xs text-[#5D6B70]">
          {formData.scopeSize && (
            <div className="flex items-center gap-2">
              <Layers aria-hidden="true" className="h-4 w-4 shrink-0 text-[#197A73]" />
              <span>
                <strong className="text-[#172A30]">Selected Scope / Size:</strong>{" "}
                <span className="rounded bg-[#E6F2EE] px-1.5 py-0.5 font-semibold text-[#123B46]">
                  {formData.scopeSize}
                </span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Layers aria-hidden="true" className="h-4 w-4 shrink-0 text-[#197A73]" />
            <span>
              <strong className="text-[#172A30]">Property Type:</strong>{" "}
              {formData.propertyType || "Not selected"}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#197A73]" />
            <div>
              <span>
                <strong className="text-[#172A30]">Locality:</strong>{" "}
                {formData.locality || "Viman Nagar, Pune"}
              </span>
              {formData.exactAddress && (
                <p className="mt-0.5 text-[11px] font-medium text-[#188038]">
                  GPS Pin: {formData.exactAddress}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-[#197A73]" />
            <span>
              <strong className="text-[#172A30]">Preferred Slot:</strong>{" "}
              {formData.preferredDate
                ? `${formData.preferredDate} (${formData.preferredTimeWindow})`
                : formData.preferredTimeWindow}
            </span>
          </div>
        </div>

        {/* Honest Confirmation Policy Notice (Section 9) */}
        <div className="rounded-xl border border-[#123B46]/20 bg-[#E6F2EE]/75 p-4 text-xs leading-relaxed text-[#123B46]">
          <div className="flex items-start gap-2">
            <ShieldAlert
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-[#123B46]"
            />
            <div>
              <strong className="font-semibold">Booking Confirmation Policy:</strong>{" "}
              Submitting this form registers a service enquiry. Your appointment is confirmed only after AquaShine verifies slot availability, scope and final quotation with you.
            </div>
          </div>
        </div>

        <ul role="list" className="space-y-1.5 pt-1 text-xs text-[#5D6B70]">
          <li className="flex items-center gap-2">
            <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 text-[#197A73]" />
            <span>No upfront online payment required</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 text-[#197A73]" />
            <span>Clear scope confirmation before service dispatch</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

