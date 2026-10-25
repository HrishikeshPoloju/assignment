"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  Settings,
  Send,
  AlertCircle,
  Copy,
  Check,
  Database,
} from "lucide-react";
import { BookingRecord, BusinessSettings } from "@/lib/bookings-store";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [googleSheetsInfo, setGoogleSheetsInfo] = useState<{
    configured: boolean;
    webhookUrlMasked: string | null;
  }>({ configured: false, webhookUrlMasked: null });
  const [dbInfo, setDbInfo] = useState<{
    type: string;
    connected: boolean;
  }>({ type: "Checking...", connected: false });

  const [settingsForm, setSettingsForm] = useState<BusinessSettings>({
    googleSheetWebhookUrl: "",
    whatsappNumber: "",
    phoneDisplay: "",
    email: "",
  });

  const [showSetupModal, setShowSetupModal] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [testingSheet, setTestingSheet] = useState(false);
  const [settingsFeedback, setSettingsFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [syncingBookingId, setSyncingBookingId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>("");
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.set("search", search);
      if (statusFilter !== "ALL") query.set("status", statusFilter);

      const res = await fetch(`/api/admin/bookings?${query.toString()}`);
      const data = await res.json();
      if (data.ok) {
        setBookings(data.bookings || []);
        if (data.googleSheets) {
          setGoogleSheetsInfo(data.googleSheets);
        }
        if (data.database) {
          setDbInfo(data.database);
        }
        if (data.settings) {
          setSettingsForm({
            googleSheetWebhookUrl: data.settings.googleSheetWebhookUrl || "",
            whatsappNumber: data.settings.whatsappNumber || "",
            phoneDisplay: data.settings.phoneDisplay || "",
            email: data.settings.email || "",
          });
        }
      }
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings();
  };

  const handleStatusChange = async (
    id: string,
    newStatus: BookingRecord["status"]
  ) => {
    setStatusUpdatingId(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleSaveAdminNote = async (id: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, adminNotes: noteDraft }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, adminNotes: noteDraft } : b))
        );
        setEditingNoteId(null);
      }
    } catch (err) {
      console.error("Failed to save note", err);
    }
  };

  const handleSyncSingleBooking = async (bookingId: string) => {
    setSyncingBookingId(bookingId);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync_booking", bookingId }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId
              ? { ...b, syncedToGoogleSheets: true, googleSheetError: undefined }
              : b
          )
        );
      } else {
        setShowSetupModal(true);
        setSettingsFeedback({
          type: "error",
          text:
            data.message ||
            "Please configure your Google Sheet Webhook URL first.",
        });
      }
    } catch {
      // ignore
    } finally {
      setSyncingBookingId(null);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsFeedback(null);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_settings",
          ...settingsForm,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSettingsFeedback({
          type: "success",
          text: "Settings saved! All new bookings will use this configuration.",
        });
        await fetchBookings();
      } else {
        setSettingsFeedback({
          type: "error",
          text: data.message || "Could not save settings.",
        });
      }
    } catch {
      setSettingsFeedback({
        type: "error",
        text: "Network error while saving settings.",
      });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleTestGoogleSheet = async () => {
    setTestingSheet(true);
    setSettingsFeedback(null);
    try {
      // First save current webhook URL
      await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_settings",
          ...settingsForm,
        }),
      });

      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test_google_sheet",
          googleSheetWebhookUrl: settingsForm.googleSheetWebhookUrl,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSettingsFeedback({
          type: "success",
          text: data.message,
        });
        await fetchBookings();
      } else {
        setSettingsFeedback({
          type: "error",
          text:
            data.message ||
            "Could not connect to Google Sheet. Check your Web App URL.",
        });
      }
    } catch {
      setSettingsFeedback({
        type: "error",
        text: "Failed to test Google Sheet connection.",
      });
    } finally {
      setTestingSheet(false);
    }
  };

  const handleCopyPhone = async (id: string, phone: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhoneId(id);
      setTimeout(() => setCopiedPhoneId(null), 2000);
    } catch {
      // ignore
    }
  };

  const newCount = bookings.filter((b) => b.status === "New Booking").length;
  const contactedCount = bookings.filter((b) => b.status === "Contacted").length;
  const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
  const completedCount = bookings.filter((b) => b.status === "Completed").length;

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10 sm:py-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-[#E6F2EE] px-2.5 py-1 text-xs font-semibold text-[#123B46]">
                COO &amp; Operations Dashboard
              </span>
              <span className="text-xs text-[#5D6B70]">
                AquaShine Facility Care • Viman Nagar, Pune
              </span>
            </div>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-[#123B46] sm:text-3xl">
              Customer Bookings &amp; Lead Management
            </h1>
            <p className="mt-1 text-sm text-[#5D6B70]">
              View every customer booking, exact GPS location, service scope, and Google Sheet sync status in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold ${
                dbInfo.connected
                  ? "border-[#188038]/30 bg-[#E6F4EA] text-[#188038]"
                  : "border-amber-300 bg-amber-50 text-amber-800"
              }`}
              title={
                dbInfo.connected
                  ? "Connected to Neon Serverless Postgres Cloud Database"
                  : "Using local JSON storage fallback. Set DATABASE_URL to connect Neon DB."
              }
            >
              <Database className="h-3.5 w-3.5 shrink-0" />
              <span>{dbInfo.connected ? "Neon DB Connected" : "Local File Storage"}</span>
            </div>

            <button
              onClick={() => {
                setSettingsFeedback(null);
                setShowSetupModal(true);
              }}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                googleSheetsInfo.configured
                  ? "border-[#188038]/30 bg-[#E6F4EA] text-[#188038]"
                  : "border-[#123B46] bg-white text-[#123B46] hover:bg-[#E6F2EE]"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>
                {googleSheetsInfo.configured
                  ? "Google Sheet Connected"
                  : "Configure Google Sheet & Contact"}
              </span>
            </button>

            <a
              href="/api/admin/bookings?format=csv"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-[#D0DDD8] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#172A30] shadow-2xs hover:bg-[#F8FAF9]"
            >
              <Download className="h-4 w-4 text-[#5D6B70]" />
              <span>Export CSV</span>
            </a>

            <button
              onClick={fetchBookings}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#123B46] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0D2C35]"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Google Sheet Connection Banner */}
        {!googleSheetsInfo.configured && (
          <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#25AFA5]/40 bg-white p-4 shadow-2xs sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F2EE] text-[#123B46]">
                <FileSpreadsheet className="h-5 w-5 text-[#25AFA5]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#172A30]">
                  Connect Your Google Sheet in 1 Click
                </p>
                <p className="text-xs text-[#5D6B70]">
                  All bookings are already saved safely on this dashboard. Paste your Google Apps Script URL here anytime to sync every booking row to Google Sheets automatically.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSettingsFeedback(null);
                setShowSetupModal(true);
              }}
              className="shrink-0 rounded-xl bg-[#123B46] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0D2C35]"
            >
              Connect Google Sheet Now
            </button>
          </div>
        )}

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#5D6B70]">
                Total Bookings
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F2EE] text-xs font-bold text-[#123B46]">
                {bookings.length}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-[#123B46]">
              {bookings.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#5D6B70]">
                New (Action Needed)
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FEF7E0] text-xs font-bold text-[#B06000]">
                {newCount}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-[#B06000]">{newCount}</p>
          </div>

          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#5D6B70]">
                Contacted / Quoted
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F2EE] text-xs font-bold text-[#123B46]">
                {contactedCount}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-[#123B46]">
              {contactedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3EAE7] bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#5D6B70]">
                Confirmed / Completed
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F4EA] text-xs font-bold text-[#188038]">
                {confirmedCount + completedCount}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-[#188038]">
              {confirmedCount + completedCount}
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#E3EAE7] bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#5D6B70]" />
            <input
              type="search"
              placeholder="Search by customer name, phone, GPS address, locality, or booking ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#E3EAE7] bg-[#F8FAF9] py-2 pr-4 pl-10 text-sm text-[#172A30] placeholder:text-[#5D6B70] focus:border-[#123B46] focus:bg-white focus:outline-none"
            />
          </form>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#5D6B70]" />
            <span className="text-xs font-semibold text-[#5D6B70]">Status:</span>
            {[
              "ALL",
              "New Booking",
              "Contacted",
              "Confirmed",
              "Completed",
              "Cancelled",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? "bg-[#123B46] font-semibold text-white"
                    : "bg-[#F8FAF9] text-[#172A30] hover:bg-[#E6F2EE]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#E3EAE7] bg-white shadow-2xs">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="mx-auto h-8 w-8 animate-spin text-[#25AFA5]" />
              <p className="mt-3 text-sm text-[#5D6B70]">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6F2EE] text-[#123B46]">
                <Clock className="h-6 w-6 text-[#25AFA5]" />
              </div>
              <h3 className="mt-3 text-base font-bold text-[#172A30]">
                No Bookings Found
              </h3>
              <p className="mt-1 text-sm text-[#5D6B70]">
                {search || statusFilter !== "ALL"
                  ? "Try adjusting your search query or status filter."
                  : "When a customer submits the booking form on /contact, their full details will appear here immediately."}
              </p>
              <Link
                href="/contact#booking-form"
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#123B46] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0D2C35]"
              >
                Open Customer Booking Form
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#172A30]">
                <thead className="border-b border-[#E3EAE7] bg-[#F8FAF9] text-xs font-semibold text-[#5D6B70] uppercase">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">
                      Booking Ref &amp; Sheet Sync
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Customer &amp; GPS Location
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Service, Scope &amp; Add-Ons
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Schedule &amp; Notes
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Status
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right">
                      Quick Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3EAE7]">
                  {bookings.map((b) => {
                    const cleanPhone = b.phone.replace(/\D/g, "");
                    const waNumber = cleanPhone.startsWith("91")
                      ? cleanPhone
                      : `91${cleanPhone}`;
                    const waText = encodeURIComponent(
                      `Hello ${b.fullName}, this is AquaShine Facility Care regarding your booking (${b.enquiryRef}) for *${b.serviceName}*${b.scopeSize ? ` (${b.scopeSize})` : ""} in ${b.locality} on ${b.preferredDate}. We are calling/messaging to confirm your slot and quotation.`
                    );
                    const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

                    return (
                      <tr key={b.id} className="hover:bg-[#F8FAF9]/80">
                        {/* Ref & Date */}
                        <td className="px-5 py-4 align-top">
                          <span className="font-mono text-xs font-bold text-[#123B46]">
                            {b.enquiryRef}
                          </span>
                          <p className="mt-1 text-xs text-[#5D6B70]">
                            {b.formattedDate}
                          </p>
                          {b.syncedToGoogleSheets ? (
                            <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-[#E6F4EA] px-2 py-0.5 text-[10px] font-semibold text-[#188038]">
                              <CheckCircle2 className="h-3 w-3" />
                              Synced to Google Sheet
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSyncSingleBooking(b.id)}
                              disabled={syncingBookingId === b.id}
                              className="mt-1.5 inline-flex items-center gap-1 rounded border border-[#D0DDD8] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#123B46] hover:bg-[#E6F2EE]"
                            >
                              <FileSpreadsheet className="h-3 w-3 text-[#25AFA5]" />
                              <span>
                                {syncingBookingId === b.id
                                  ? "Syncing..."
                                  : "Push to Sheet"}
                              </span>
                            </button>
                          )}
                        </td>

                        {/* Customer Details & GPS */}
                        <td className="px-5 py-4 align-top">
                          <p className="font-bold text-[#172A30]">{b.fullName}</p>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <span className="text-xs font-medium text-[#123B46]">
                              {b.phone}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyPhone(b.id, b.phone)}
                              title="Copy phone number"
                              className="rounded p-0.5 text-[#5D6B70] hover:bg-[#E6F2EE] hover:text-[#123B46]"
                            >
                              {copiedPhoneId === b.id ? (
                                <Check className="h-3 w-3 text-[#188038]" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>

                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className="inline-block rounded-md bg-[#E6F2EE] px-2 py-0.5 text-[11px] font-semibold text-[#123B46]">
                              📍 {b.locality}
                            </span>
                            {b.mapsUrl && (
                              <a
                                href={b.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={b.exactAddress || "Open in Google Maps"}
                                className="inline-flex items-center gap-1 rounded-md bg-[#188038]/15 px-2 py-0.5 text-[11px] font-bold text-[#188038] hover:bg-[#188038]/25"
                              >
                                <span>Open GPS Map</span>
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            )}
                          </div>
                          {b.exactAddress && (
                            <p className="mt-1 max-w-[240px] text-[11px] leading-snug text-[#5D6B70]">
                              {b.exactAddress}
                            </p>
                          )}
                        </td>

                        {/* Service, Scope & Addons */}
                        <td className="px-5 py-4 align-top">
                          {b.serviceNames && b.serviceNames.length > 0 ? (
                            <div className="space-y-1">
                              {b.serviceNames.map((name, idx) => (
                                <p key={idx} className="font-semibold text-[#123B46] leading-tight">
                                  {idx > 0 && <span className="text-[#25AFA5] mr-1">+</span>}
                                  {name}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="font-semibold text-[#123B46]">
                              {b.serviceName}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-[#5D6B70]">
                            {b.categoryName}
                          </p>
                          {b.scopeSize && (
                            <span className="mt-1 inline-block rounded bg-[#E6F2EE] px-2 py-0.5 text-[11px] font-bold text-[#123B46]">
                              📏 {b.scopeSize}
                            </span>
                          )}
                          {b.addOnNames && b.addOnNames.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {b.addOnNames.map((addon) => (
                                <span
                                  key={addon}
                                  className="rounded border border-[#E3EAE7] bg-[#F8FAF9] px-1.5 py-0.5 text-[11px] font-medium text-[#172A30]"
                                >
                                  + {addon}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>

                        {/* Schedule, Customer Notes & Admin Notes */}
                        <td className="px-5 py-4 align-top">
                          <p className="text-xs font-semibold text-[#172A30]">
                            📅 {b.preferredDate || "Flexible"}
                          </p>
                          <p className="mt-0.5 text-xs text-[#5D6B70]">
                            ⏰ {b.preferredTimeWindow}
                          </p>
                          <p className="mt-0.5 text-xs text-[#5D6B70]">
                            🏠 {b.propertyType}
                          </p>
                          {b.addressAndInstructions && (
                            <p className="mt-1.5 max-w-[240px] rounded bg-[#F8FAF9] p-1.5 text-[11px] text-[#172A30]">
                              <strong>Client Note:</strong> &quot;
                              {b.addressAndInstructions}&quot;
                            </p>
                          )}

                          {/* Internal Admin Note */}
                          <div className="mt-2">
                            {editingNoteId === b.id ? (
                              <div className="flex flex-col gap-1.5">
                                <input
                                  type="text"
                                  value={noteDraft}
                                  onChange={(e) => setNoteDraft(e.target.value)}
                                  placeholder="e.g. Quoted ₹1,400, crew at 10am"
                                  className="w-full rounded-lg border border-[#123B46] bg-white px-2 py-1 text-xs"
                                />
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveAdminNote(b.id)}
                                    className="rounded bg-[#123B46] px-2 py-0.5 text-[10px] font-semibold text-white"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingNoteId(null)}
                                    className="text-[10px] text-[#5D6B70]"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingNoteId(b.id);
                                  setNoteDraft(b.adminNotes || "");
                                }}
                                className="text-[11px] font-medium text-[#197A73] hover:underline"
                              >
                                {b.adminNotes
                                  ? `📝 Staff Note: ${b.adminNotes}`
                                  : "+ Add Quote / Staff Note"}
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Status Select */}
                        <td className="px-5 py-4 align-top">
                          <select
                            value={b.status}
                            disabled={statusUpdatingId === b.id}
                            onChange={(e) =>
                              handleStatusChange(
                                b.id,
                                e.target.value as BookingRecord["status"]
                              )
                            }
                            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold focus:outline-none ${
                              b.status === "New Booking"
                                ? "border-[#B06000]/40 bg-[#FEF7E0] text-[#B06000]"
                                : b.status === "Contacted"
                                ? "border-[#123B46]/40 bg-[#E6F2EE] text-[#123B46]"
                                : b.status === "Confirmed"
                                ? "border-[#188038]/40 bg-[#E6F4EA] text-[#188038]"
                                : b.status === "Completed"
                                ? "border-[#188038]/40 bg-[#E6F4EA] text-[#188038]"
                                : "border-[#5D6B70]/30 bg-[#F8FAF9] text-[#5D6B70]"
                            }`}
                          >
                            <option value="New Booking">New Booking</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 align-top text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Send WhatsApp confirmation to customer"
                              className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#20ba59]"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${b.phone}`}
                              title="Call customer directly"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6F2EE] text-[#123B46] transition-colors hover:bg-[#25AFA5]/20"
                            >
                              <Phone className="h-4 w-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Live Business & Google Sheets Configuration Modal */}
      {showSetupModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#E3EAE7] bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-start justify-between border-b border-[#E3EAE7] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F2EE] text-[#123B46]">
                  <FileSpreadsheet className="h-5 w-5 text-[#25AFA5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#123B46]">
                    Google Sheets Sync &amp; Live Business Settings
                  </h3>
                  <p className="text-xs text-[#5D6B70]">
                    Configure your Google Sheet Webhook URL and official WhatsApp contact number
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSetupModal(false)}
                className="rounded-lg p-1.5 text-[#5D6B70] hover:bg-[#F8FAF9]"
              >
                ✕
              </button>
            </div>

            {settingsFeedback && (
              <div
                className={`mt-4 flex items-start gap-2 rounded-xl border p-3.5 text-xs font-medium ${
                  settingsFeedback.type === "success"
                    ? "border-[#188038]/30 bg-[#E6F4EA] text-[#188038]"
                    : "border-[#C5221F]/30 bg-[#FCE8E6] text-[#C5221F]"
                }`}
              >
                {settingsFeedback.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span>{settingsFeedback.text}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#172A30]">
                  Google Apps Script Web App URL (Google Sheet Webhook)
                </label>
                <p className="mt-0.5 text-[11px] text-[#5D6B70]">
                  Paste the Web App URL ending in <code>/exec</code> from your Google Sheet&apos;s Apps Script deployment.
                </p>
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  value={settingsForm.googleSheetWebhookUrl}
                  onChange={(e) =>
                    setSettingsForm((prev) => ({
                      ...prev,
                      googleSheetWebhookUrl: e.target.value,
                    }))
                  }
                  className="mt-1.5 w-full rounded-xl border border-[#D0DDD8] bg-[#F8FAF9] px-3.5 py-2.5 font-mono text-xs text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#172A30]">
                    Business WhatsApp Number (with 91)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 919876543210"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({
                        ...prev,
                        whatsappNumber: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#D0DDD8] bg-[#F8FAF9] px-3.5 py-2 text-xs text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172A30]">
                    Display Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    value={settingsForm.phoneDisplay}
                    onChange={(e) =>
                      setSettingsForm((prev) => ({
                        ...prev,
                        phoneDisplay: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-[#D0DDD8] bg-[#F8FAF9] px-3.5 py-2 text-xs text-[#172A30] focus:border-[#123B46] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#123B46] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0D2C35] disabled:opacity-60"
                >
                  <span>{savingSettings ? "Saving..." : "Save Configuration"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestGoogleSheet}
                  disabled={testingSheet || !settingsForm.googleSheetWebhookUrl}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#123B46] bg-[#E6F2EE] px-4 py-2.5 text-xs font-semibold text-[#123B46] hover:bg-[#25AFA5]/20 disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5 text-[#25AFA5]" />
                  <span>
                    {testingSheet
                      ? "Sending Test Row..."
                      : "Send Test Row to Google Sheet"}
                  </span>
                </button>
              </div>
            </form>

            {/* Neon DB Info */}
            <div className="mt-6 rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-4 text-xs leading-relaxed text-[#172A30]">
              <div className="flex items-center gap-2 font-bold text-[#123B46]">
                <Database className="h-4 w-4 text-[#197A73]" />
                <span>Neon Serverless Postgres Status: {dbInfo.connected ? "Connected ✅" : "Local Fallback Mode"}</span>
              </div>
              <p className="mt-1 text-[#5D6B70]">
                {dbInfo.connected
                  ? "All customer enquiries, booking records, and admin statuses are securely and permanently saved in your Neon Postgres cloud database."
                  : "To enable persistent cloud storage, create a free project at neon.tech and add your connection string as DATABASE_URL in your environment variables (in .env.local locally, or in Vercel project settings)."}
              </p>
            </div>

            {/* Quick 4-step instructions */}
            <div className="mt-4 rounded-2xl border border-[#E3EAE7] bg-[#F8FAF9] p-4 text-xs leading-relaxed text-[#172A30]">
              <p className="font-bold text-[#123B46]">
                2-Minute Google Sheet Setup Steps:
              </p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-[#5D6B70]">
                <li>
                  Open{" "}
                  <a
                    href="https://sheets.new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#123B46] underline"
                  >
                    sheets.new
                  </a>{" "}
                  and click <strong>Extensions &gt; Apps Script</strong>.
                </li>
                <li>
                  Paste the script from{" "}
                  <code className="rounded bg-[#E6F2EE] px-1 py-0.5 text-[#123B46]">
                    google-apps-script.js
                  </code>{" "}
                  and click <strong>Save</strong>.
                </li>
                <li>
                  Click <strong>Deploy &gt; New deployment</strong> &rarr; Select{" "}
                  <strong>Web app</strong> &rarr; Set <em>Execute as: Me</em> and{" "}
                  <em>Who has access: Anyone</em>.
                </li>
                <li>
                  Copy the generated <strong>Web app URL</strong> and paste it in the box above!
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
