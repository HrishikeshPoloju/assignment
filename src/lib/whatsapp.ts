import { getCategoryById, getServiceBySlug } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import { BookingFormData } from "./validation";

export function buildEnquiryMessageText(data: BookingFormData, enquiryRef?: string): string {
  const category = getCategoryById(data.categoryId);
  const primaryService = getServiceBySlug(data.serviceId);
  const addOnNames = (data.addOnIds || [])
    .map((id) => getServiceBySlug(id)?.name || id)
    .filter(Boolean);

  const lines: string[] = [
    `Hello ${siteConfig.brandName} Team,`,
    `I would like to request a service quotation and check slot availability.`,
    "",
    enquiryRef ? `*Enquiry Reference:* ${enquiryRef}` : "",
    `*Customer Name:* ${data.fullName.trim()}`,
    `*Phone:* ${data.phone.trim()}`,
    `*Preferred Contact:* ${data.preferredContact}`,
    "",
    `*Service Category:* ${category?.name || data.categoryId}`,
    `*Primary Service:* ${primaryService?.name || data.serviceId}`,
    addOnNames.length > 0
      ? `*Optional Add-Ons Requested:* ${addOnNames.join(", ")}`
      : `*Optional Add-Ons Requested:* None`,
    "",
    `*Property Type:* ${data.propertyType}`,
    `*Locality:* ${data.locality}`,
    data.exactAddress ? `*Exact Location:* ${data.exactAddress}` : "",
    data.mapsUrl ? `*Google Maps Pin:* ${data.mapsUrl}` : "",
    `*Preferred Date:* ${data.preferredDate}`,
    `*Preferred Time Window:* ${data.preferredTimeWindow}`,
    data.addressAndInstructions?.trim()
      ? `*Additional Details / Notes:* ${data.addressAndInstructions.trim()}`
      : "",
    "",
    `Please share the scope confirmation and quotation at your convenience.`,
  ].filter((line, idx, arr) => {
    // Remove empty string lines unless they are intentional paragraph breaks
    if (line === "" && (idx === 0 || arr[idx - 1] === "")) return false;
    return true;
  });

  return lines.join("\n");
}

export function buildGeneralWhatsAppMessage(customContext?: string): string {
  if (customContext) {
    return `Hello ${siteConfig.brandName} Team, I am interested in ${customContext} in ${siteConfig.primaryArea} / Pune. Please share scope and quotation details.`;
  }
  return `Hello ${siteConfig.brandName} Team, I would like to enquire about your cleaning and home-care services in ${siteConfig.primaryArea} / Pune.`;
}

/**
 * Returns the WhatsApp deep link URL (`https://wa.me/...`) ONLY if a verified
 * business WhatsApp number is configured in `siteConfig.contact.whatsappNumber`.
 * Never fabricates or hardcodes an unverified number.
 */
export function getWhatsAppUrl(message: string): string | null {
  const rawNumber = (siteConfig.contact.whatsappNumber || "").replace(/\D/g, "");
  if (!rawNumber || rawNumber.length < 10) {
    return null;
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${rawNumber}?text=${encoded}`;
}

export function isWhatsAppConfigured(): boolean {
  const rawNumber = (siteConfig.contact.whatsappNumber || "").replace(/\D/g, "");
  return rawNumber.length >= 10;
}

