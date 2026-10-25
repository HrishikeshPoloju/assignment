import fs from "fs/promises";
import path from "path";
import { getServiceBySlug, getCategoryById } from "@/data/services";
import { siteConfig } from "@/data/site-config";
import {
  getBookingsFromNeon,
  insertBookingToNeon,
  updateBookingInNeon,
  getBusinessSettingsFromNeon,
  saveBusinessSettingsToNeon,
} from "./db";

export interface BookingRecord {
  id: string;
  enquiryRef: string;
  submittedAt: string;
  formattedDate: string;
  fullName: string;
  phone: string;
  preferredContact: string;
  categoryId: string;
  categoryName: string;
  serviceId: string;
  serviceName: string;
  serviceIds?: string[];
  serviceNames?: string[];
  addOnIds: string[];
  addOnNames: string[];
  scopeSize?: string;
  propertyType: string;
  locality: string;
  exactAddress?: string;
  geoCoordinates?: string;
  mapsUrl?: string;
  preferredDate: string;
  preferredTimeWindow: string;
  addressAndInstructions: string;
  status: "New Booking" | "Contacted" | "Confirmed" | "Completed" | "Cancelled";
  adminNotes?: string;
  syncedToGoogleSheets: boolean;
  googleSheetError?: string;
}

export interface BusinessSettings {
  googleSheetWebhookUrl: string;
  whatsappNumber: string;
  phoneDisplay: string;
  email: string;
  updatedAt?: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "bookings.json");
const SETTINGS_FILE_PATH = path.join(process.cwd(), "data", "business-settings.json");

async function ensureDataDir(): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
}

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE_PATH);
  } catch {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify([], null, 2), "utf8");
  }
}

export async function getBusinessSettings(): Promise<BusinessSettings> {
  // First attempt from Neon DB
  const neonSettings = await getBusinessSettingsFromNeon();
  if (neonSettings) {
    return neonSettings;
  }

  const defaults: BusinessSettings = {
    googleSheetWebhookUrl: process.env.GOOGLE_SHEET_WEBHOOK_URL || "",
    whatsappNumber:
      process.env.NEXT_PUBLIC_AQUASHINE_WHATSAPP ||
      siteConfig.contact.whatsappNumber ||
      "",
    phoneDisplay:
      process.env.NEXT_PUBLIC_AQUASHINE_PHONE ||
      siteConfig.contact.phoneDisplay ||
      "",
    email:
      process.env.NEXT_PUBLIC_AQUASHINE_EMAIL ||
      siteConfig.contact.email ||
      "",
  };

  try {
    const raw = await fs.readFile(SETTINGS_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<BusinessSettings>;
    return {
      googleSheetWebhookUrl:
        parsed.googleSheetWebhookUrl?.trim() || defaults.googleSheetWebhookUrl,
      whatsappNumber:
        parsed.whatsappNumber?.trim() || defaults.whatsappNumber,
      phoneDisplay: parsed.phoneDisplay?.trim() || defaults.phoneDisplay,
      email: parsed.email?.trim() || defaults.email,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return defaults;
  }
}

export async function saveBusinessSettings(
  input: Partial<BusinessSettings>
): Promise<BusinessSettings> {
  const current = await getBusinessSettings();
  const next: BusinessSettings = {
    googleSheetWebhookUrl:
      typeof input.googleSheetWebhookUrl === "string"
        ? input.googleSheetWebhookUrl.trim()
        : current.googleSheetWebhookUrl,
    whatsappNumber:
      typeof input.whatsappNumber === "string"
        ? input.whatsappNumber.replace(/[^\d+]/g, "").trim()
        : current.whatsappNumber,
    phoneDisplay:
      typeof input.phoneDisplay === "string"
        ? input.phoneDisplay.trim()
        : current.phoneDisplay,
    email:
      typeof input.email === "string" ? input.email.trim() : current.email,
    updatedAt: new Date().toISOString(),
  };

  // Save to Neon DB if connected
  await saveBusinessSettingsToNeon(next);

  // Save to local file backup
  try {
    await ensureDataDir();
    await fs.writeFile(SETTINGS_FILE_PATH, JSON.stringify(next, null, 2), "utf8");
  } catch (err) {
    console.error("Local settings write error:", err);
  }

  return next;
}

export async function getAllBookings(): Promise<BookingRecord[]> {
  // If Neon DB is configured, read directly from Postgres
  const neonBookings = await getBookingsFromNeon();
  if (neonBookings !== null) {
    return neonBookings;
  }

  // Fallback to local JSON file
  try {
    await ensureDataFile();
    const content = await fs.readFile(DATA_FILE_PATH, "utf8");
    const data = JSON.parse(content || "[]");
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error reading bookings file:", err);
    return [];
  }
}

export async function updateBookingRecord(
  id: string,
  updates: {
    status?: BookingRecord["status"];
    adminNotes?: string;
  }
): Promise<BookingRecord | null> {
  // Update in Neon DB
  await updateBookingInNeon(id, updates);

  // Update in local file backup
  try {
    await ensureDataFile();
    const content = await fs.readFile(DATA_FILE_PATH, "utf8");
    const bookings: BookingRecord[] = JSON.parse(content || "[]");
    const index = bookings.findIndex((b) => b.id === id || b.enquiryRef === id);
    if (index !== -1) {
      if (updates.status) {
        bookings[index].status = updates.status;
      }
      if (typeof updates.adminNotes === "string") {
        bookings[index].adminNotes = updates.adminNotes;
      }
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(bookings, null, 2), "utf8");
      return bookings[index];
    }
  } catch (err) {
    console.error("Error updating local bookings file:", err);
  }

  const all = await getAllBookings();
  return all.find((b) => b.id === id || b.enquiryRef === id) || null;
}

export async function updateBookingStatus(
  id: string,
  newStatus: BookingRecord["status"]
): Promise<boolean> {
  const updated = await updateBookingRecord(id, { status: newStatus });
  return Boolean(updated);
}

/**
 * Sends a booking row to the configured Google Sheet via Google Apps Script Webhook.
 */
export async function sendToGoogleSheetWebhook(
  record: BookingRecord,
  overrideWebhookUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const settings = await getBusinessSettings();
  const webhookUrl = (overrideWebhookUrl || settings.googleSheetWebhookUrl || "").trim();

  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    return {
      success: false,
      error: "Google Sheet Webhook URL is not configured yet.",
    };
  }

  try {
    const combinedNotes = [
      record.scopeSize ? `[Scope: ${record.scopeSize}]` : "",
      record.addressAndInstructions || "",
    ]
      .filter(Boolean)
      .join(" — ");

    const payload = {
      timestamp: record.formattedDate,
      submittedAt: record.submittedAt,
      enquiryRef: record.enquiryRef,
      fullName: record.fullName,
      phone: record.phone,
      preferredContact: record.preferredContact,
      locality: record.locality,
      exactAddress: record.exactAddress || "",
      geoCoordinates: record.geoCoordinates || "",
      mapsUrl: record.mapsUrl || "",
      categoryName: record.categoryName,
      serviceName:
        record.serviceNames && record.serviceNames.length > 0
          ? record.serviceNames.join(" + ")
          : record.serviceName,
      addOnNames: record.addOnNames.join(", ") || "None",
      scopeSize: record.scopeSize || "",
      preferredDate: record.preferredDate,
      preferredTimeWindow: record.preferredTimeWindow,
      propertyType: record.propertyType,
      addressAndInstructions: combinedNotes,
      status: record.status,
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { success: false, error: `HTTP ${res.status}: ${text.slice(0, 100)}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Google Sheets webhook error:", message);
    return { success: false, error: message };
  }
}

export async function syncBookingByIdToGoogleSheet(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const bookings = await getAllBookings();
  const index = bookings.findIndex((b) => b.id === id || b.enquiryRef === id);
  if (index === -1) {
    return { success: false, error: "Booking not found" };
  }

  const result = await sendToGoogleSheetWebhook(bookings[index]);
  const isSuccess = result.success;
  const errorMsg = result.error;

  // Update in Neon
  await updateBookingInNeon(id, {
    syncedToGoogleSheets: isSuccess,
    googleSheetError: errorMsg,
  });

  // Update in local file
  try {
    bookings[index].syncedToGoogleSheets = isSuccess;
    bookings[index].googleSheetError = errorMsg;
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(bookings, null, 2), "utf8");
  } catch (err) {
    console.error("Local sync write error:", err);
  }

  return result;
}

export async function saveBooking(input: {
  fullName: string;
  phone: string;
  preferredContact?: string;
  categoryId?: string;
  serviceId?: string;
  serviceIds?: string[];
  addOnIds?: string[];
  scopeSize?: string;
  propertyType?: string;
  locality?: string;
  exactAddress?: string;
  geoCoordinates?: string;
  mapsUrl?: string;
  preferredDate?: string;
  preferredTimeWindow?: string;
  addressAndInstructions?: string;
}): Promise<BookingRecord> {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const enquiryRef = `AQS-${datePart}-${randomSuffix}`;

  const rawServiceIds =
    Array.isArray(input.serviceIds) && input.serviceIds.length > 0
      ? input.serviceIds
      : input.serviceId
      ? [input.serviceId]
      : [];

  const primarySlug = rawServiceIds[0] || input.serviceId || "";
  const primaryService = getServiceBySlug(primarySlug);

  const serviceNames = rawServiceIds
    .map((slug) => getServiceBySlug(slug)?.name || slug)
    .filter(Boolean);

  const categoryId =
    input.categoryId || primaryService?.categoryId || "water-tank-and-water-care";
  const category = getCategoryById(categoryId);

  const addOnNames = (input.addOnIds || [])
    .map((slug) => getServiceBySlug(slug)?.name || slug)
    .filter(Boolean);

  const formattedDate = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const record: BookingRecord = {
    id: enquiryRef,
    enquiryRef,
    submittedAt: now.toISOString(),
    formattedDate,
    fullName: input.fullName,
    phone: input.phone,
    preferredContact: input.preferredContact || "WhatsApp",
    categoryId,
    categoryName: category?.name || categoryId,
    serviceId: primarySlug,
    serviceName: serviceNames[0] || primaryService?.name || primarySlug,
    serviceIds: rawServiceIds,
    serviceNames,
    addOnIds: input.addOnIds || [],
    addOnNames,
    scopeSize: input.scopeSize || "",
    propertyType: input.propertyType || "Apartment / Flat",
    locality: input.locality || "Viman Nagar",
    exactAddress: input.exactAddress || "",
    geoCoordinates: input.geoCoordinates || "",
    mapsUrl: input.mapsUrl || "",
    preferredDate: input.preferredDate || "",
    preferredTimeWindow:
      input.preferredTimeWindow || "Morning (9:00 AM – 12:00 PM)",
    addressAndInstructions: input.addressAndInstructions || "",
    status: "New Booking",
    adminNotes: "",
    syncedToGoogleSheets: false,
  };

  // Attempt Google Sheets webhook delivery
  const googleResult = await sendToGoogleSheetWebhook(record);
  record.syncedToGoogleSheets = googleResult.success;
  if (!googleResult.success) {
    record.googleSheetError = googleResult.error;
  }

  // 1. Save to Neon Serverless Postgres (Persistent Cloud DB)
  await insertBookingToNeon(record);

  // 2. Save to local JSON file backup
  try {
    await ensureDataFile();
    const existing = await getAllBookings();
    // Only push if not already in array from Neon fetch
    if (!existing.some((b) => b.id === record.id)) {
      existing.unshift(record);
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(existing, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Error saving booking locally:", err);
  }

  return record;
}
