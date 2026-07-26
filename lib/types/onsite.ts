export interface AttendeeProfile {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  isDefault: boolean;
  canDelete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Attendee {
  id: string;
  regNo: string;
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: "Male" | "Female" | "Other";
  badgeProfileId: string;
  badgeProfile?: AttendeeProfile;
  designation?: string;
  company?: string;
  photo?: string;
  source: "Import" | "Manual" | "Spot";
  printed: boolean;
  checkedIn: boolean;
  checkedInAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpotRegistration {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  designation?: string;
  company?: string;
  photo?: string;
  attendeeProfileId: string;
  attendeeProfile?: AttendeeProfile;
  regNo: string;
  qrCode?: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface ScanCategory {
  id: string;
  name: string;
  scanCode: string;
  description?: string;
  scanMode: "Single" | "Multi";
  allowReentry: boolean;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Privilege {
  id: string;
  badgeProfileId: string;
  badgeProfile?: AttendeeProfile;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OnsiteKey {
  id: string;
  userName: string;
  loginKey: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface OnsiteStats {
  totalAttendees: number;
  checkedIn: number;
  notCheckedIn: number;
  totalSpotRegistrations: number;
  totalScanCategories: number;
}
