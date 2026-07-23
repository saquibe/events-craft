"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BookingTable } from "@/components/admin/accommodation/BookingTable";
import { BookingFormSheet } from "@/components/admin/accommodation/BookingFormSheet";
import { Booking, Hotel, RoomType } from "@/lib/types/accommodation";
import { CreateButton } from "@/components/admin";

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

const mockRoomTypes: RoomType[] = [
  {
    id: "1",
    hotelId: "1",
    hotel: mockHotels[0],
    name: "Deluxe Room",
    inventory: 20,
    startDate: "2026-01-15",
    endDate: "2026-01-20",
    perNightCost: 150,
    taxPercentage: 12,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockBookings: Booking[] = [
  {
    id: "1",
    attendeeName: "John Doe",
    attendeeEmail: "john@example.com",
    hotelId: "1",
    hotel: mockHotels[0],
    roomTypeId: "1",
    roomType: mockRoomTypes[0],
    startDate: "2026-01-15",
    endDate: "2026-01-17",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function BookingsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingBooking) {
      setBookings(
        bookings.map((b) =>
          b.id === editingBooking.id
            ? { ...b, ...data, updatedAt: new Date().toISOString() }
            : b,
        ),
      );
    } else {
      const newBooking: Booking = {
        id: String(bookings.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setBookings([...bookings, newBooking]);
    }
    setIsFormOpen(false);
    setEditingBooking(null);
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setIsFormOpen(true);
  };

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status, updatedAt: new Date().toISOString() } : b,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>
          <p className="text-muted-foreground">
            Manage room bookings for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Booking"
          onClick={() => {
            setEditingBooking(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <BookingTable
        bookings={bookings}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      <BookingFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        booking={editingBooking}
        hotels={mockHotels}
        roomTypes={mockRoomTypes}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
