export interface Event {
  id: string;
  eventName: string;
  eventLogo: string;
  venueName: string;
  timeZone: string;
  startDateTime: string;
  endDateTime: string;
  eventType: string;
  status: "Draft" | "Published" | "Completed" | "Draft Deleted";
  city: string;
}

export interface Team {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  designation: string;
  mobile: string;
  location: string;
  profilePhoto: string;
  role: string;
  status: "active" | "inactive";
}

export interface Venue {
  id: string;
  venueName: string;
  venueAddress: string;
  city: string;
  country: string;
  website: string;
  venueImage: string;
  googleMapLink: string;
  distanceFrom: { from: string; unit: string }[];
  status: "Active" | "Inactive";
}

export interface SupportTicket {
  id: string;
  module: string;
  details: string;
  uploadImage: string;
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
}
