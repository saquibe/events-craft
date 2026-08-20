// app/lib/types/certificate.ts

export interface CertificateField {
  id: string;
  type: "text" | "image" | "shape";
  label: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: "normal" | "italic";
  textDecoration?: "none" | "underline" | "line-through";
  color?: string;
  backgroundColor?: string;
  alignment?: "left" | "center" | "right";
  isVisible: boolean;
  isEditable: boolean;
  imageUrl?: string;
  rotation?: number;
  opacity?: number;
  zIndex?: number;
}

export interface CertificateDesign {
  id: string;
  name: string;
  description?: string;
  size: {
    width: number;
    height: number;
    unit: "mm" | "px" | "in";
  };
  orientation: "portrait" | "landscape";
  background: {
    type: "image" | "color" | "gradient" | "none";
    value: string;
    imageUrl?: string;
    gradientDirection?: "horizontal" | "vertical" | "diagonal";
  };
  fields: CertificateField[];
  settings: {
    borderRadius: number;
    padding: number;
    borderWidth?: number;
    borderColor?: string;
    shadow?: boolean;
  };
  fontFamily?: string;
  primaryColor?: string;
  secondaryColor?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface Certificate {
  id: string;
  name: string;
  designId: string;
  design?: CertificateDesign;
  attendeeProfile:
    | "Delegate"
    | "Faculty"
    | "Committee"
    | "Speaker"
    | "Organizer"
    | "Exhibitor"
    | "Staff"
    | "VIP";
  attendance: "Conference" | "Workshop" | "Poster" | "Paper" | "All";
  assignedTo: string[];
  sentTo: string[];
  status: "draft" | "assigned" | "sent" | "generated" | "failed";
  sentAt?: string;
  generatedAt?: string;
  template?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  design: Partial<CertificateDesign>;
  previewImage?: string;
  category: "professional" | "creative" | "minimal" | "award" | "participation";
  isDefault: boolean;
  createdAt: string;
}

export interface AttendeeForCertificate {
  id: string;
  name: string;
  email: string;
  registrationNumber: string;
  profile:
    | "Delegate"
    | "Faculty"
    | "Committee"
    | "Speaker"
    | "Organizer"
    | "Exhibitor"
    | "Staff"
    | "VIP";
  city: string;
  country: string;
  phone?: string;
  organization?: string;
  designation?: string;
  customFields: Record<string, string>;
  // Abstract related
  abstractTitle?: string;
  abstractCategory?: string;
  abstractSubCategory?: string;
  // Workshop related
  workshopTitle?: string;
  workshopCategory?: string;
  workshopSubCategory?: string;
  // Poster related
  posterTitle?: string;
  posterCategory?: string;
  posterSubCategory?: string;
  // Paper related
  paperTitle?: string;
  paperCategory?: string;
  paperSubCategory?: string;
}

export interface AttendanceData {
  attendeeId: string;
  conferenceAttended: boolean;
  workshopAttended: boolean;
  posterPresented: boolean;
  paperPresented: boolean;
  conferenceDate?: string;
  workshopDate?: string;
  posterDate?: string;
  paperDate?: string;
  conferenceSession?: string;
  workshopSession?: string;
  posterSession?: string;
  paperSession?: string;
}

export interface CertificateAnalytics {
  totalCertificates: number;
  totalAssigned: number;
  totalSent: number;
  totalGenerated: number;
  byType: {
    Conference: number;
    Workshop: number;
    Poster: number;
    Paper: number;
  };
  byStatus: {
    draft: number;
    assigned: number;
    sent: number;
    generated: number;
    failed: number;
  };
  byProfile: {
    Delegate: number;
    Faculty: number;
    Committee: number;
    Speaker: number;
    Organizer: number;
    Exhibitor: number;
    Staff: number;
    VIP: number;
  };
  recentActivity: {
    id: string;
    action: "assigned" | "sent" | "generated" | "created" | "updated";
    certificateName: string;
    attendeeName: string;
    timestamp: string;
  }[];
}

export interface CertificateGenerationRequest {
  certificateId: string;
  attendeeIds: string[];
  options?: {
    includeSignature?: boolean;
    includeSeal?: boolean;
    format?: "pdf" | "png" | "svg";
    quality?: "high" | "medium" | "low";
  };
}

export interface CertificateGenerationResponse {
  success: boolean;
  certificateId: string;
  generatedIds: string[];
  failedIds?: string[];
  urls?: string[];
  error?: string;
}

export interface CertificateEmailRequest {
  certificateId: string;
  attendeeIds: string[];
  subject?: string;
  message?: string;
  ccEmails?: string[];
  bccEmails?: string[];
}

export interface CertificateEmailResponse {
  success: boolean;
  sentCount: number;
  failedCount: number;
  failedEmails?: string[];
}

// Utility types
export type CertificateSortField =
  | "name"
  | "createdAt"
  | "status"
  | "attendeeProfile"
  | "attendance";
export type CertificateSortOrder = "asc" | "desc";

export interface CertificateFilter {
  search?: string;
  status?: Certificate["status"][];
  attendeeProfile?: Certificate["attendeeProfile"][];
  attendance?: Certificate["attendance"][];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface CertificateFieldPreset {
  id: string;
  label: string;
  category:
    | "User Info"
    | "Abstract"
    | "Workshop"
    | "Poster"
    | "Paper"
    | "Event Info"
    | "Custom";
  field: string;
  content: string;
  defaultFontSize?: number;
  defaultAlignment?: "left" | "center" | "right";
  isRequired?: boolean;
}

export const CERTIFICATE_FIELD_PRESETS: CertificateFieldPreset[] = [
  // User Info
  {
    id: "fullName",
    label: "Full Name",
    category: "User Info",
    field: "fullName",
    content: "{{fullName}}",
    defaultFontSize: 32,
    defaultAlignment: "center",
  },
  {
    id: "registrationNumber",
    label: "Registration Number",
    category: "User Info",
    field: "registrationNumber",
    content: "{{registrationNumber}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },
  {
    id: "attendeeProfile",
    label: "Attendee Profile",
    category: "User Info",
    field: "attendeeProfile",
    content: "{{attendeeProfile}}",
    defaultFontSize: 16,
    defaultAlignment: "center",
  },
  {
    id: "city",
    label: "City",
    category: "User Info",
    field: "city",
    content: "{{city}}",
    defaultFontSize: 12,
    defaultAlignment: "center",
  },
  {
    id: "country",
    label: "Country",
    category: "User Info",
    field: "country",
    content: "{{country}}",
    defaultFontSize: 12,
    defaultAlignment: "center",
  },
  {
    id: "email",
    label: "Email",
    category: "User Info",
    field: "email",
    content: "{{email}}",
    defaultFontSize: 12,
    defaultAlignment: "center",
  },
  {
    id: "organization",
    label: "Organization",
    category: "User Info",
    field: "organization",
    content: "{{organization}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },
  {
    id: "designation",
    label: "Designation",
    category: "User Info",
    field: "designation",
    content: "{{designation}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },
  {
    id: "customField1",
    label: "Custom Field 1",
    category: "User Info",
    field: "customField1",
    content: "{{customField1}}",
    defaultFontSize: 12,
    defaultAlignment: "center",
  },
  {
    id: "customField2",
    label: "Custom Field 2",
    category: "User Info",
    field: "customField2",
    content: "{{customField2}}",
    defaultFontSize: 12,
    defaultAlignment: "center",
  },
  {
    id: "customField3",
    label: "Custom Field 3",
    category: "User Info",
    field: "customField3",
    content: "{{customField3}}",
    defaultFontSize: 12,
    defaultAlignment: "center",
  },
  {
    id: "customField4",
    label: "Custom Field 4",
    category: "User Info",
    field: "customField4",
    content: "{{customField4}}",
    defaultFontSize: 12,
    defaultAlignment: "center",
  },
  {
    id: "customField5",
    label: "Custom Field 5",
    category: "User Info",
    field: "customField5",
    content: "{{customField5}}",
    defaultFontSize: 12,
    defaultAlignment: "center",
  },

  // Abstract
  {
    id: "abstractTitle",
    label: "Abstract Title",
    category: "Abstract",
    field: "abstractTitle",
    content: "{{abstractTitle}}",
    defaultFontSize: 18,
    defaultAlignment: "center",
  },
  {
    id: "abstractCategory",
    label: "Abstract Category",
    category: "Abstract",
    field: "abstractCategory",
    content: "{{abstractCategory}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },
  {
    id: "abstractSubCategory",
    label: "Abstract Sub-category",
    category: "Abstract",
    field: "abstractSubCategory",
    content: "{{abstractSubCategory}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },

  // Workshop
  {
    id: "workshopTitle",
    label: "Workshop Title",
    category: "Workshop",
    field: "workshopTitle",
    content: "{{workshopTitle}}",
    defaultFontSize: 18,
    defaultAlignment: "center",
  },
  {
    id: "workshopCategory",
    label: "Workshop Category",
    category: "Workshop",
    field: "workshopCategory",
    content: "{{workshopCategory}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },
  {
    id: "workshopSubCategory",
    label: "Workshop Sub-category",
    category: "Workshop",
    field: "workshopSubCategory",
    content: "{{workshopSubCategory}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },

  // Poster
  {
    id: "posterTitle",
    label: "Poster Title",
    category: "Poster",
    field: "posterTitle",
    content: "{{posterTitle}}",
    defaultFontSize: 18,
    defaultAlignment: "center",
  },
  {
    id: "posterCategory",
    label: "Poster Category",
    category: "Poster",
    field: "posterCategory",
    content: "{{posterCategory}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },
  {
    id: "posterSubCategory",
    label: "Poster Sub-category",
    category: "Poster",
    field: "posterSubCategory",
    content: "{{posterSubCategory}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },

  // Paper
  {
    id: "paperTitle",
    label: "Paper Title",
    category: "Paper",
    field: "paperTitle",
    content: "{{paperTitle}}",
    defaultFontSize: 18,
    defaultAlignment: "center",
  },
  {
    id: "paperCategory",
    label: "Paper Category",
    category: "Paper",
    field: "paperCategory",
    content: "{{paperCategory}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },
  {
    id: "paperSubCategory",
    label: "Paper Sub-category",
    category: "Paper",
    field: "paperSubCategory",
    content: "{{paperSubCategory}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },

  // Event Info
  {
    id: "eventName",
    label: "Event Name",
    category: "Event Info",
    field: "eventName",
    content: "{{eventName}}",
    defaultFontSize: 24,
    defaultAlignment: "center",
  },
  {
    id: "eventDate",
    label: "Event Date",
    category: "Event Info",
    field: "eventDate",
    content: "{{eventDate}}",
    defaultFontSize: 16,
    defaultAlignment: "center",
  },
  {
    id: "eventVenue",
    label: "Event Venue",
    category: "Event Info",
    field: "eventVenue",
    content: "{{eventVenue}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },
  {
    id: "eventOrganizer",
    label: "Event Organizer",
    category: "Event Info",
    field: "eventOrganizer",
    content: "{{eventOrganizer}}",
    defaultFontSize: 14,
    defaultAlignment: "center",
  },
];

export const CERTIFICATE_SIZE_PRESETS = {
  A4: { width: 210, height: 297, label: "A4" },
  A5: { width: 148, height: 210, label: "A5" },
  A6: { width: 105, height: 148, label: "A6" },
  Letter: { width: 215.9, height: 279.4, label: "Letter" },
  Legal: { width: 215.9, height: 355.6, label: "Legal" },
};

export const CERTIFICATE_TEMPLATES: CertificateTemplate[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and professional design with elegant borders",
    category: "professional",
    isDefault: true,
    design: {
      background: {
        type: "color",
        value: "#ffffff",
      },
      settings: {
        borderRadius: 0,
        padding: 40,
        borderWidth: 2,
        borderColor: "#e8752a",
        shadow: true,
      },
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "creative",
    name: "Creative",
    description: "Modern and creative design with gradient accents",
    category: "creative",
    isDefault: false,
    design: {
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        gradientDirection: "diagonal",
      },
      settings: {
        borderRadius: 12,
        padding: 35,
        shadow: true,
      },
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and minimal design with lots of whitespace",
    category: "minimal",
    isDefault: false,
    design: {
      background: {
        type: "color",
        value: "#fafafa",
      },
      settings: {
        borderRadius: 8,
        padding: 50,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        shadow: false,
      },
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "award",
    name: "Award",
    description: "Premium design with gold accents for awards",
    category: "award",
    isDefault: false,
    design: {
      background: {
        type: "gradient",
        value: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
        gradientDirection: "diagonal",
      },
      settings: {
        borderRadius: 16,
        padding: 40,
        borderWidth: 3,
        borderColor: "#d97706",
        shadow: true,
      },
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "participation",
    name: "Participation",
    description: "Friendly design for participation certificates",
    category: "participation",
    isDefault: false,
    design: {
      background: {
        type: "color",
        value: "#ffffff",
      },
      settings: {
        borderRadius: 10,
        padding: 35,
        borderWidth: 2,
        borderColor: "#8b5cf6",
        shadow: true,
      },
    },
    createdAt: new Date().toISOString(),
  },
];
