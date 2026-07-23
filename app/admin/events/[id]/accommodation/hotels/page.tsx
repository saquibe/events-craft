"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HotelTable } from "@/components/admin/accommodation/HotelTable";
import { HotelFormSheet } from "@/components/admin/accommodation/HotelFormSheet";
import { Hotel } from "@/lib/types/accommodation";
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

export default function HotelsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingHotel) {
      setHotels(
        hotels.map((h) =>
          h.id === editingHotel.id
            ? { ...h, ...data, updatedAt: new Date().toISOString() }
            : h,
        ),
      );
    } else {
      const newHotel: Hotel = {
        id: String(hotels.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setHotels([...hotels, newHotel]);
    }
    setIsFormOpen(false);
    setEditingHotel(null);
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setIsFormOpen(true);
  };

  const handleStatusChange = (id: string, status: Hotel["status"]) => {
    setHotels(
      hotels.map((h) =>
        h.id === id ? { ...h, status, updatedAt: new Date().toISOString() } : h,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Hotels</h2>
          <p className="text-muted-foreground">
            Manage hotels for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Hotel"
          onClick={() => {
            setEditingHotel(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <HotelTable
        hotels={hotels}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />

      <HotelFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        hotel={editingHotel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
