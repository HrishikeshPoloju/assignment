import { NextRequest, NextResponse } from "next/server";
import { BookingFormData, validateBookingForm } from "@/lib/validation";
import { getBusinessSettings, saveBooking } from "@/lib/bookings-store";

const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 10;

function sanitizeString(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  try {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "local-client";

    const now = Date.now();
    const record = rateLimitMap.get(clientIp);
    if (record && now - record.windowStart < RATE_LIMIT_WINDOW_MS) {
      if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Too many enquiry requests submitted recently. Please wait a few minutes and try again.",
          },
          { status: 429 }
        );
      }
      record.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, windowStart: now });
    }

    const body = (await request.json()) as Partial<BookingFormData>;

    // Honeypot spam protection: if bot filled the hidden field, silently reject
    if (body.companyWebsite && String(body.companyWebsite).trim().length > 0) {
      return NextResponse.json(
        {
          ok: true,
          enquiryRef: "AQS-RECEIVED",
          submittedAt: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    const cleanData: BookingFormData = {
      fullName: sanitizeString(body.fullName, 100),
      phone: sanitizeString(body.phone, 25),
      preferredContact: (body.preferredContact as BookingFormData["preferredContact"]) || "WhatsApp",
      categoryId: sanitizeString(body.categoryId, 80),
      serviceId: sanitizeString(body.serviceId, 80),
      serviceIds: Array.isArray(body.serviceIds)
        ? body.serviceIds.map((id) => sanitizeString(id, 80)).filter(Boolean)
        : body.serviceId
        ? [sanitizeString(body.serviceId, 80)]
        : [],
      addOnIds: Array.isArray(body.addOnIds)
        ? body.addOnIds.map((id) => sanitizeString(id, 80)).filter(Boolean).slice(0, 10)
        : [],
      propertyType: (body.propertyType as BookingFormData["propertyType"]) || "Apartment / Flat",
      locality: sanitizeString(body.locality, 100),
      preferredDate: sanitizeString(body.preferredDate, 20),
      preferredTimeWindow:
        (body.preferredTimeWindow as BookingFormData["preferredTimeWindow"]) ||
        "Morning (9:00 AM – 12:00 PM)",
      addressAndInstructions: sanitizeString(body.addressAndInstructions, 800),
      scopeSize: sanitizeString(body.scopeSize, 120),
      exactAddress: sanitizeString(body.exactAddress, 300),
      geoCoordinates: sanitizeString(body.geoCoordinates, 50),
      mapsUrl: sanitizeString(body.mapsUrl, 300),
      consent: Boolean(body.consent),
    };

    const validation = validateBookingForm(cleanData);
    if (!validation.valid) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please review the highlighted fields and try again.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Save booking locally and forward to Google Sheets webhook
    const booking = await saveBooking(cleanData);
    const settings = await getBusinessSettings();

    return NextResponse.json(
      {
        ok: true,
        enquiryRef: booking.enquiryRef,
        submittedAt: booking.submittedAt,
        status: booking.status,
        syncedToGoogleSheets: booking.syncedToGoogleSheets,
        businessWhatsApp: settings.whatsappNumber || "",
        message: "Your booking has been successful! Our team will contact you shortly.",
        disclaimer:
          "Your booking request has been received. Our team will contact you shortly via phone or WhatsApp to confirm your preferred time slot and scope.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to process your enquiry right now. Please verify your details and try again.",
      },
      { status: 500 }
    );
  }
}

