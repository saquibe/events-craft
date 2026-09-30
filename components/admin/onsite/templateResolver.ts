// components/admin/onsite/templateResolver.ts
export interface BadgeTemplateContext {
  attendeeName?: string;
  attendeeProfile?: string;
  registrationNumber?: string;
  company?: string;
  city?: string;
  country?: string;
  eventName?: string;
  eventDate?: string;
  organizer?: string;
  badgeType?: string;
}

export function resolveBadgeTemplate(
  content: string,
  ctx: BadgeTemplateContext,
): string {
  if (!content) return "";

  return content.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key) => {
    const value = getBadgeValue(key, ctx);
    return value !== undefined && value !== null && value !== ""
      ? String(value)
      : match;
  });
}

function getBadgeValue(key: string, ctx: BadgeTemplateContext): any {
  switch (key) {
    case "fullName":
      return ctx.attendeeName;
    case "attendeeProfile":
      return ctx.attendeeProfile;
    case "registrationNumber":
      return ctx.registrationNumber;
    case "company":
    case "organization":
      return ctx.company;
    case "city":
      return ctx.city;
    case "country":
      return ctx.country;
    case "eventName":
      return ctx.eventName;
    case "eventDate":
      return ctx.eventDate;
    case "organizer":
      return ctx.organizer;
    case "badgeType":
      return ctx.badgeType;
    default:
      return undefined;
  }
}

export function formatBadgeDate(date?: string): string {
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
