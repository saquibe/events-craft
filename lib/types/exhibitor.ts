export interface Category {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Hall {
  id: string;
  name: string;
  floorPlan?: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface StallType {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stall {
  id: string;
  name: string;
  number: string;
  size: number;
  stallTypeId: string;
  stallType?: StallType;
  description?: string;
  hallId: string;
  hall?: Hall;
  visibility: "Visible" | "Hidden";
  availability: "Reserved" | "Onsale" | "Blocked" | "Sold";
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Exhibitor {
  id: string;
  companyName: string;
  categoryId: string;
  category?: Category;
  logo?: string;
  address: string;
  taxId?: string;
  hallId: string;
  hall?: Hall;
  stallId: string;
  stall?: Stall;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactMobile?: string;
  activityModule: {
    attendeeRegistration: boolean;
    visitorRegistration: boolean;
    exhibitorBadge: boolean;
    meetingPlanner: boolean;
    leadManagement: boolean;
    inquiries: boolean;
    promotionalBanner: boolean;
    exhibitorManual: boolean;
  };
  brandingModule: {
    videoQuota: boolean;
    productServiceQuota: boolean;
  };
  status: "Active" | "Inactive";
  sendEmail: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExhibitorBadgeQuota {
  id: string;
  exhibitorId: string;
  exhibitor?: Exhibitor;
  quota: number;
  startDateTime: string;
  endDateTime: string;
  status: "Active" | "Inactive";
  sendEmail: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AttendeeRegistrationQuota {
  id: string;
  exhibitorId: string;
  exhibitor?: Exhibitor;
  quota: number;
  startDateTime: string;
  endDateTime: string;
  status: "Active" | "Inactive";
  sendEmail: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VisitorRegistrationQuota {
  id: string;
  exhibitorId: string;
  exhibitor?: Exhibitor;
  quota: number;
  startDateTime: string;
  endDateTime: string;
  status: "Active" | "Inactive";
  sendEmail: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExhibitorStats {
  totalExhibitors: number;
  activeExhibitors: number;
  totalCategories: number;
  totalHalls: number;
  totalStalls: number;
  occupiedStalls: number;
  availableStalls: number;
}
