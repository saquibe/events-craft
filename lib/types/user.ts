export interface User {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  designation?: string;
  company?: string;
  profilePhoto?: string;
  category: "Attendee" | "Delegate";
  createdBy: "Self" | "Admin";
  createdAt: string;
  updatedAt: string;
  status: "Active" | "Suspended";
  lastLogin?: string;
}

export interface UserFormData {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  designation?: string;
  company?: string;
  profilePhoto?: string;
  category: "Attendee" | "Delegate";
}
