import { NextRequest, NextResponse } from "next/server";
import {
  getAllBookings,
  updateBookingRecord,
  getBusinessSettings,
  saveBusinessSettings,
  sendToGoogleSheetWebhook,
  syncBookingByIdToGoogleSheet,
  BookingRecord,
} from "@/lib/bookings-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");
    const search = (searchParams.get("search") || "").toLowerCase().trim();
    const statusFilter = searchParams.get("status");

    let bookings = await getAllBookings();

    if (search) {
      bookings = bookings.filter(
        (b) =>
          b.fullName.toLowerCase().includes(search) ||
          b.phone.toLowerCase().includes(search) ||
          b.enquiryRef.toLowerCase().includes(search) ||
          b.locality.toLowerCase().includes(search) ||
          b.serviceName.toLowerCase().includes(search) ||
          (b.exactAddress || "").toLowerCase().includes(search)
      );
    }

    if (statusFilter && statusFilter !== "ALL") {
      bookings = bookings.filter((b) => b.status === statusFilter);
    }

    if (format === "csv") {
      const headers = [
        "Booking Ref",
        "Date Received",
        "Customer Name",
        "Phone / WhatsApp",
        "Locality",
        "Exact Detected Location",
        "Google Maps URL",
        "Category",
        "Primary Service",
        "Scope / Size",
        "Add-ons",
        "Preferred Date",
        "Time Window",
        "Property Type",
        "Customer Notes",
        "Internal Admin Notes",
        "Status",
        "Google Sheets Synced",
      ];

      const rows = bookings.map((b) => [
        `"${b.enquiryRef}"`,
        `"${b.formattedDate}"`,
        `"${b.fullName.replace(/"/g, '""')}"`,
        `"${b.phone}"`,
        `"${b.locality}"`,
        `"${(b.exactAddress || "").replace(/"/g, '""')}"`,
        `"${b.mapsUrl || ""}"`,
        `"${b.categoryName}"`,
        `"${b.serviceName.replace(/"/g, '""')}"`,
        `"${(b.scopeSize || "").replace(/"/g, '""')}"`,
        `"${b.addOnNames.join("; ").replace(/"/g, '""')}"`,
        `"${b.preferredDate}"`,
        `"${b.preferredTimeWindow}"`,
        `"${b.propertyType}"`,
        `"${(b.addressAndInstructions || "").replace(/"/g, '""')}"`,
        `"${(b.adminNotes || "").replace(/"/g, '""')}"`,
        `"${b.status}"`,
        `"${b.syncedToGoogleSheets ? "Yes" : "No"}"`,
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((r) => r.join(",")),
      ].join("\n");

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="aquashine-bookings-${Date.now()}.csv"`,
        },
      });
    }

    const settings = await getBusinessSettings();
    const webhookConfigured = Boolean(
      settings.googleSheetWebhookUrl &&
        settings.googleSheetWebhookUrl.startsWith("http")
    );

    return NextResponse.json({
      ok: true,
      count: bookings.length,
      bookings,
      settings,
      googleSheets: {
        configured: webhookConfigured,
        webhookUrlMasked: webhookConfigured
          ? settings.googleSheetWebhookUrl.slice(0, 38) + "..."
          : null,
      },
      database: {
        type: process.env.DATABASE_URL ? "Neon Serverless Postgres" : "Local File Storage (Fallback)",
        connected: Boolean(process.env.DATABASE_URL),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch bookings", details: message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      id?: string;
      status?: BookingRecord["status"];
      adminNotes?: string;
    };

    if (!body.id) {
      return NextResponse.json(
        { ok: false, message: "Booking id is required" },
        { status: 400 }
      );
    }

    const updated = await updateBookingRecord(body.id, {
      status: body.status,
      adminNotes: body.adminNotes,
    });

    if (!updated) {
      return NextResponse.json(
        { ok: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, booking: updated });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      action?: "save_settings" | "test_google_sheet" | "sync_booking";
      googleSheetWebhookUrl?: string;
      whatsappNumber?: string;
      phoneDisplay?: string;
      email?: string;
      bookingId?: string;
    };

    if (body.action === "save_settings") {
      const saved = await saveBusinessSettings({
        googleSheetWebhookUrl: body.googleSheetWebhookUrl,
        whatsappNumber: body.whatsappNumber,
        phoneDisplay: body.phoneDisplay,
        email: body.email,
      });

      return NextResponse.json({
        ok: true,
        settings: saved,
        message: "Business & Google Sheet settings saved.",
      });
    }

    if (body.action === "test_google_sheet") {
      const settings = await getBusinessSettings();
      const targetUrl = (
        body.googleSheetWebhookUrl ||
        settings.googleSheetWebhookUrl ||
        ""
      ).trim();

      if (!targetUrl.startsWith("http")) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Please enter a valid Google Apps Script Web App URL starting with https://script.google.com/...",
          },
          { status: 400 }
        );
      }

      const now = new Date();
      const testRecord: BookingRecord = {
        id: "AQS-TEST-CONNECTION",
        enquiryRef: "AQS-TEST-CONNECTION",
        submittedAt: now.toISOString(),
        formattedDate: now.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
        fullName: "AquaShine Test Connection",
        phone: "9876543210",
        preferredContact: "WhatsApp",
        categoryId: "water-tank-and-water-care",
        categoryName: "Water Tank & Water Care",
        serviceId: "overhead-water-tank-cleaning",
        serviceName: "Overhead Water Tank Cleaning",
        addOnIds: ["tds-measurement"],
        addOnNames: ["TDS Measurement"],
        scopeSize: "1,000L – 2,000L Tank",
        propertyType: "Apartment / Flat",
        locality: "Viman Nagar",
        exactAddress: "Viman Nagar, Pune, Maharashtra 411014",
        geoCoordinates: "18.5679,73.9143",
        mapsUrl: "https://www.google.com/maps?q=18.5679,73.9143",
        preferredDate: now.toISOString().slice(0, 10),
        preferredTimeWindow: "Morning (9:00 AM – 12:00 PM)",
        addressAndInstructions:
          "Automated test row from AquaShine Admin Dashboard",
        status: "New Booking",
        syncedToGoogleSheets: false,
      };

      const res = await sendToGoogleSheetWebhook(testRecord, targetUrl);
      if (!res.success) {
        return NextResponse.json(
          {
            ok: false,
            message: `Could not reach Google Sheet webhook: ${res.error}`,
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        message:
          "Test row sent to your Google Sheet! Check your spreadsheet to confirm.",
      });
    }

    if (body.action === "sync_booking" && body.bookingId) {
      const res = await syncBookingByIdToGoogleSheet(body.bookingId);
      if (!res.success) {
        return NextResponse.json(
          { ok: false, message: res.error || "Sync failed" },
          { status: 502 }
        );
      }
      return NextResponse.json({
        ok: true,
        message: "Booking synced to Google Sheet!",
      });
    }

    return NextResponse.json(
      { ok: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, message: "Request failed", details: message },
      { status: 500 }
    );
  }
}
