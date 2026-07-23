export interface Location {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  description?: string;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: string;
  startDateTime: string;
  endDateTime: string;
  status: "Active" | "Inactive";
  maxBookings?: number;
  currentBookings?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Meeting {
  id: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  senderType: "Attendee" | "Exhibitor" | "Speaker" | "Delegate";
  receiverId: string;
  receiverName: string;
  receiverEmail: string;
  receiverType: "Attendee" | "Exhibitor" | "Speaker" | "Delegate";
  locationId: string;
  location?: Location;
  timeSlotId: string;
  timeSlot?: TimeSlot;
  status: "Pending" | "Confirmed" | "Rejected" | "Cancelled";
  message?: string;
  meetingDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NetworkingStats {
  totalMeetings: number;
  pendingMeetings: number;
  confirmedMeetings: number;
  rejectedMeetings: number;
  totalLocations: number;
  totalTimeSlots: number;
}

export interface MeetingRequest {
  id: string;
  sender: {
    id: string;
    name: string;
    email: string;
    type: string;
  };
  receiver: {
    id: string;
    name: string;
    email: string;
    type: string;
  };
  location: {
    id: string;
    name: string;
  };
  timeSlot: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };
  status: "Pending" | "Confirmed" | "Rejected" | "Cancelled";
  message?: string;
  createdAt: string;
}
