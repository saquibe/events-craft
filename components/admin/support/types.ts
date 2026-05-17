export interface SupportTicket {
  id: string;
  module: string;
  details: string;
  uploadImage: string;
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
}
