export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  website?: string;
  starCategory: "1 Star" | "2 Star" | "3 Star" | "4 Star" | "5 Star";
  images: string[];
  googleMap: string;
  checkInTime: string;
  checkOutTime: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface RoomType {
  id: string;
  hotelId: string;
  hotel?: Hotel;
  name: string;
  inventory: number;
  startDate: string;
  endDate: string;
  perNightCost: number;
  taxPercentage: number;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  attendeeName: string;
  attendeeEmail?: string;
  hotelId: string;
  hotel?: Hotel;
  roomTypeId: string;
  roomType?: RoomType;
  startDate: string;
  endDate: string;
  totalAmount?: number;
  status: "Confirmed" | "Pending" | "Cancelled" | "Checked-in" | "Checked-out";
  createdAt: string;
  updatedAt: string;
}

export interface AccommodationStats {
  totalHotels: number;
  totalRooms: number;
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  checkedIn: number;
}
