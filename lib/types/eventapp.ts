export interface AppHome {
  id: string;
  banner: string;
  featuredTiles: FeaturedTile[];
  bottomNavigation: BottomNavItem[];
  updatedAt: string;
}

export interface FeaturedTile {
  id: string;
  title: string;
  icon: string;
  pageLink: string;
  order: number;
  status: "Active" | "Inactive";
}

export interface BottomNavItem {
  id: string;
  label: string;
  icon: string;
  pageLink: string;
  order: number;
  status: "Active" | "Inactive";
}

export interface Branding {
  id: string;
  brandColor: string;
  textColor: string;
  secondaryTextColor: string;
  cardColor: string;
  backgroundColor: string;
  subBackgroundColor: string;
  updatedAt: string;
}

export interface AppModule {
  id: string;
  name: string;
  type:
    | "Information"
    | "Download"
    | "Link"
    | "Video"
    | "Contact Us"
    | "Text Box";
  icon?: string;
  content?: string;
  status: "Active" | "Inactive";
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface FixedModule {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export const FIXED_MODULES: FixedModule[] = [
  { id: "agenda", name: "Agenda", enabled: true, order: 1 },
  { id: "speaker", name: "Speaker", enabled: true, order: 2 },
  { id: "attendee", name: "Attendee", enabled: true, order: 3 },
  { id: "organizer", name: "Organizer", enabled: true, order: 4 },
  { id: "visitor", name: "Visitor", enabled: true, order: 5 },
  { id: "abstract", name: "Abstract", enabled: true, order: 6 },
  { id: "exhibitor", name: "Exhibitor", enabled: true, order: 7 },
  { id: "scan_lead", name: "Scan Lead", enabled: true, order: 8 },
  { id: "networking", name: "Networking", enabled: true, order: 9 },
  { id: "certificate", name: "Certificate", enabled: true, order: 10 },
  { id: "lead", name: "Lead", enabled: true, order: 11 },
  { id: "accommodation", name: "Accommodation", enabled: true, order: 12 },
  { id: "travel", name: "Travel", enabled: true, order: 13 },
  { id: "my_qr", name: "My QR", enabled: true, order: 14 },
];

export const MODULE_TYPES = [
  { id: "information", label: "Information" },
  { id: "download", label: "Download" },
  { id: "link", label: "Link" },
  { id: "video", label: "Video" },
  { id: "contact_us", label: "Contact Us" },
  { id: "text_box", label: "Text Box" },
];
