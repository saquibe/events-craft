export interface TravelForm {
  id: string;
  pickupDateTime: string;
  pickupLocation: string;
  dropLocation: string;
  formConfig: any; // Form builder config for additional fields
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface TravelEnquiry {
  id: string;
  name: string;
  email: string;
  regNo: string;
  pickupDateTime: string;
  pickupLocation: string;
  dropLocation: string;
  formData?: Record<string, any>; // Dynamic form data
  travelAgentId?: string;
  travelAgent?: TravelAgent;
  status: "Pending" | "Assigned" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface TravelAgent {
  id: string;
  name: string;
  email: string;
  mobile: string;
  companyName: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface AttendeeTravel {
  id: string;
  attendeeName: string;
  pickupDateTime: string;
  pickupLocation: string;
  dropLocation: string;
  travelAgentId?: string;
  travelAgent?: TravelAgent;
  status: "Pending" | "Assigned" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface TravelStats {
  totalEnquiries: number;
  pendingEnquiries: number;
  assignedEnquiries: number;
  completedEnquiries: number;
  totalAgents: number;
  activeAgents: number;
}
