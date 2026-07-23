"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AccommodationDashboard } from "@/components/admin/accommodation/AccommodationDashboard";
import { HotelTable } from "@/components/admin/accommodation/HotelTable";
import { Hotel } from "@/lib/types/accommodation";

// Mock stats
const mockStats = {
  totalHotels: 4,
  totalRooms: 120,
  totalBookings: 45,
  confirmedBookings: 28,
  pendingBookings: 12,
  checkedIn: 5,
};

// Mock hotels
const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Palace Hotel",
    address: "123 Main Street",
    city: "Mumbai",
    country: "India",
    website: "https://grandpalace.com",
    starCategory: "5 Star",
    images: ["https://example.com/image1.jpg"],
    googleMap: "https://maps.google.com/embed?q=Grand+Palace+Hotel",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function AccommodationDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Accommodation</h2>
          <p className="text-muted-foreground">
            Manage hotels and bookings for Event #{eventId}
          </p>
        </div>
      </div>

      <AccommodationDashboard stats={mockStats} />

      <div className="mt-8">
        <HotelTable
          hotels={hotels}
          onEdit={() => {}}
          onStatusChange={() => {}}
        />
      </div>
    </div>
  );
}
