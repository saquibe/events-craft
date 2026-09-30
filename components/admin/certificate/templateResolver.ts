// components/admin/certificate/templateResolver.ts
import type { Attendee, AttendanceData } from "./CertificateContext";

export interface TemplateContext {
  attendee?: Attendee;
  attendance?: AttendanceData;
  eventName?: string;
  eventDate?: string;
  organizer?: string;
}

/**
 * Resolves {{variable}} placeholders in a string using the provided context.
 * Falls back to the original placeholder if the variable can't be resolved.
 */
export function resolveTemplate(content: string, ctx: TemplateContext): string {
  if (!content) return "";

  return content.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key) => {
    const value = getContextValue(key, ctx);
    return value !== undefined && value !== null && value !== ""
      ? String(value)
      : match; // keep {{key}} visible if unresolved
  });
}

function getContextValue(key: string, ctx: TemplateContext): any {
  const { attendee, attendance, eventName, eventDate, organizer } = ctx;

  // Attendee direct fields
  if (attendee) {
    switch (key) {
      case "fullName":
        return attendee.name;
      case "registrationNumber":
        return attendee.registrationNumber;
      case "attendeeProfile":
        return attendee.profile;
      case "city":
        return attendee.city;
      case "country":
        return attendee.country;
      case "email":
        return attendee.email;
    }
    // Custom fields: {{customField1}}, {{customField2}}, ...
    if (key.startsWith("customField")) {
      const idx = key.replace("customField", "");
      return attendee.customFields?.[idx];
    }
  }

  // Attendance fields
  if (attendance) {
    switch (key) {
      case "conferenceDate":
        return attendance.conferenceDate;
      case "workshopDate":
        return attendance.workshopDate;
      case "posterDate":
        return attendance.posterDate;
      case "paperDate":
        return attendance.paperDate;
    }
  }

  // Event context
  switch (key) {
    case "eventName":
      return eventName;
    case "eventDate":
      return eventDate;
    case "organizer":
      return organizer;
  }

  return undefined;
}

/**
 * Format a date string for display (falls back to raw string).
 */
export function formatDate(date?: string): string {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return date;
  }
}
