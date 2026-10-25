import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { BookingRecord, BusinessSettings } from "./bookings-store";
import { siteConfig } from "@/data/site-config";

let cachedSql: NeonQueryFunction<false, false> | null = null;
let schemaInitialized = false;

export function getDb(): NeonQueryFunction<false, false> | null {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || !databaseUrl.trim()) {
    return null;
  }

  if (!cachedSql) {
    cachedSql = neon(databaseUrl.trim());
  }

  return cachedSql;
}

export async function ensureNeonTables(): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;
  if (schemaInitialized) return true;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id TEXT PRIMARY KEY,
        enquiry_ref TEXT UNIQUE NOT NULL,
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        formatted_date TEXT NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        preferred_contact TEXT NOT NULL,
        category_id TEXT NOT NULL,
        category_name TEXT NOT NULL,
        service_id TEXT NOT NULL,
        service_name TEXT NOT NULL,
        service_ids JSONB DEFAULT '[]'::jsonb,
        service_names JSONB DEFAULT '[]'::jsonb,
        add_on_ids JSONB DEFAULT '[]'::jsonb,
        add_on_names JSONB DEFAULT '[]'::jsonb,
        scope_size TEXT,
        property_type TEXT NOT NULL,
        locality TEXT NOT NULL,
        exact_address TEXT,
        geo_coordinates TEXT,
        maps_url TEXT,
        preferred_date TEXT NOT NULL,
        preferred_time_window TEXT NOT NULL,
        address_and_instructions TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'New Booking',
        admin_notes TEXT,
        synced_to_google_sheets BOOLEAN DEFAULT FALSE,
        google_sheet_error TEXT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS business_settings (
        id INT PRIMARY KEY DEFAULT 1,
        google_sheet_webhook_url TEXT,
        whatsapp_number TEXT,
        phone_display TEXT,
        email TEXT,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    schemaInitialized = true;
    return true;
  } catch (err) {
    console.error("Failed to initialize Neon Postgres tables:", err);
    return false;
  }
}

function mapRowToBooking(row: any): BookingRecord {
  return {
    id: row.id,
    enquiryRef: row.enquiry_ref,
    submittedAt: row.submitted_at instanceof Date ? row.submitted_at.toISOString() : String(row.submitted_at),
    formattedDate: row.formatted_date,
    fullName: row.full_name,
    phone: row.phone,
    preferredContact: row.preferred_contact,
    categoryId: row.category_id,
    categoryName: row.category_name,
    serviceId: row.service_id,
    serviceName: row.service_name,
    serviceIds: Array.isArray(row.service_ids) ? row.service_ids : [],
    serviceNames: Array.isArray(row.service_names) ? row.service_names : [],
    addOnIds: Array.isArray(row.add_on_ids) ? row.add_on_ids : [],
    addOnNames: Array.isArray(row.add_on_names) ? row.add_on_names : [],
    scopeSize: row.scope_size || undefined,
    propertyType: row.property_type,
    locality: row.locality,
    exactAddress: row.exact_address || undefined,
    geoCoordinates: row.geo_coordinates || undefined,
    mapsUrl: row.maps_url || undefined,
    preferredDate: row.preferred_date,
    preferredTimeWindow: row.preferred_time_window,
    addressAndInstructions: row.address_and_instructions,
    status: row.status as BookingRecord["status"],
    adminNotes: row.admin_notes || undefined,
    syncedToGoogleSheets: Boolean(row.synced_to_google_sheets),
    googleSheetError: row.google_sheet_error || undefined,
  };
}

export async function insertBookingToNeon(record: BookingRecord): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;

  await ensureNeonTables();

  try {
    await sql`
      INSERT INTO bookings (
        id, enquiry_ref, submitted_at, formatted_date, full_name, phone,
        preferred_contact, category_id, category_name, service_id, service_name,
        service_ids, service_names, add_on_ids, add_on_names, scope_size,
        property_type, locality, exact_address, geo_coordinates, maps_url,
        preferred_date, preferred_time_window, address_and_instructions,
        status, admin_notes, synced_to_google_sheets, google_sheet_error
      ) VALUES (
        ${record.id},
        ${record.enquiryRef},
        ${record.submittedAt},
        ${record.formattedDate},
        ${record.fullName},
        ${record.phone},
        ${record.preferredContact},
        ${record.categoryId},
        ${record.categoryName},
        ${record.serviceId},
        ${record.serviceName},
        ${JSON.stringify(record.serviceIds || [])},
        ${JSON.stringify(record.serviceNames || [])},
        ${JSON.stringify(record.addOnIds || [])},
        ${JSON.stringify(record.addOnNames || [])},
        ${record.scopeSize || null},
        ${record.propertyType},
        ${record.locality},
        ${record.exactAddress || null},
        ${record.geoCoordinates || null},
        ${record.mapsUrl || null},
        ${record.preferredDate},
        ${record.preferredTimeWindow},
        ${record.addressAndInstructions},
        ${record.status},
        ${record.adminNotes || null},
        ${record.syncedToGoogleSheets},
        ${record.googleSheetError || null}
      )
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        admin_notes = EXCLUDED.admin_notes,
        synced_to_google_sheets = EXCLUDED.synced_to_google_sheets,
        google_sheet_error = EXCLUDED.google_sheet_error;
    `;
    return true;
  } catch (err) {
    console.error("Neon DB insert error:", err);
    return false;
  }
}

export async function getBookingsFromNeon(): Promise<BookingRecord[] | null> {
  const sql = getDb();
  if (!sql) return null;

  await ensureNeonTables();

  try {
    const rows = await sql`
      SELECT * FROM bookings
      ORDER BY submitted_at DESC;
    `;

    return rows.map(mapRowToBooking);
  } catch (err) {
    console.error("Neon DB fetch error:", err);
    return null;
  }
}

export async function updateBookingInNeon(
  id: string,
  updates: {
    status?: BookingRecord["status"];
    adminNotes?: string;
    syncedToGoogleSheets?: boolean;
    googleSheetError?: string;
  }
): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;

  await ensureNeonTables();

  try {
    if (updates.status && updates.adminNotes !== undefined) {
      await sql`
        UPDATE bookings
        SET status = ${updates.status}, admin_notes = ${updates.adminNotes}
        WHERE id = ${id} OR enquiry_ref = ${id};
      `;
    } else if (updates.status) {
      await sql`
        UPDATE bookings
        SET status = ${updates.status}
        WHERE id = ${id} OR enquiry_ref = ${id};
      `;
    } else if (updates.adminNotes !== undefined) {
      await sql`
        UPDATE bookings
        SET admin_notes = ${updates.adminNotes}
        WHERE id = ${id} OR enquiry_ref = ${id};
      `;
    }

    if (updates.syncedToGoogleSheets !== undefined) {
      await sql`
        UPDATE bookings
        SET synced_to_google_sheets = ${updates.syncedToGoogleSheets},
            google_sheet_error = ${updates.googleSheetError || null}
        WHERE id = ${id} OR enquiry_ref = ${id};
      `;
    }

    return true;
  } catch (err) {
    console.error("Neon DB update error:", err);
    return false;
  }
}

export async function getBusinessSettingsFromNeon(): Promise<BusinessSettings | null> {
  const sql = getDb();
  if (!sql) return null;

  await ensureNeonTables();

  try {
    const rows = await sql`
      SELECT * FROM business_settings
      WHERE id = 1
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return {
      googleSheetWebhookUrl: row.google_sheet_webhook_url || "",
      whatsappNumber: row.whatsapp_number || "",
      phoneDisplay: row.phone_display || "",
      email: row.email || "",
      updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
    };
  } catch (err) {
    console.error("Neon DB settings fetch error:", err);
    return null;
  }
}

export async function saveBusinessSettingsToNeon(
  settings: Partial<BusinessSettings>
): Promise<boolean> {
  const sql = getDb();
  if (!sql) return false;

  await ensureNeonTables();

  try {
    await sql`
      INSERT INTO business_settings (
        id, google_sheet_webhook_url, whatsapp_number, phone_display, email, updated_at
      ) VALUES (
        1,
        ${settings.googleSheetWebhookUrl || null},
        ${settings.whatsappNumber || null},
        ${settings.phoneDisplay || null},
        ${settings.email || null},
        NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        google_sheet_webhook_url = COALESCE(EXCLUDED.google_sheet_webhook_url, business_settings.google_sheet_webhook_url),
        whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, business_settings.whatsapp_number),
        phone_display = COALESCE(EXCLUDED.phone_display, business_settings.phone_display),
        email = COALESCE(EXCLUDED.email, business_settings.email),
        updated_at = NOW();
    `;
    return true;
  } catch (err) {
    console.error("Neon DB settings save error:", err);
    return false;
  }
}

