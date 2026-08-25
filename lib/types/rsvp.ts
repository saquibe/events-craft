export interface RSVPStatus {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface RSVP {
  id: string;
  name: string;
  email: string;
  mobile: string;
  attendeeProfile: string;
  rsvpStatus: string;
  note?: string;
  sendInvitation: boolean;
  confirmation: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventList {
  id: string;
  profileName: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface RSVPStats {
  totalRSVP: number;
  confirmedRSVP: number;
  pendingRSVP: number;
  totalEvents: number;
}

export interface InvitationField {
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
  color?: string;
  alignment?: "left" | "center" | "right";
  isVisible: boolean;
  isEditable: boolean;
  imageUrl?: string;
  backgroundColor?: string;
}

export interface InvitationDesign {
  id: string;
  name: string;
  size: {
    width: number;
    height: number;
    unit: "mm" | "px";
    preset?: "A4" | "A5" | "A6" | "custom";
  };
  orientation: "portrait" | "landscape";
  background: {
    type: "image" | "color" | "gradient" | "none";
    value: string;
    imageUrl?: string;
  };
  fields: InvitationField[];
  settings: {
    borderRadius: number;
    padding: number;
  };
  primaryColor?: string;
  secondaryColor?: string;
  createdAt: string;
  updatedAt: string;
}
