"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RoomTypeTable } from "@/components/admin/accommodation/RoomTypeTable";
import { RoomTypeFormSheet } from "@/components/admin/accommodation/RoomTypeFormSheet";
import { RoomType, Hotel } from "@/lib/types/accommodation";
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

export default function RoomTypesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [roomTypes, setRoomTypes] = useState<RoomType[]>(mockRoomTypes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingRoomType) {
      setRoomTypes(
        roomTypes.map((r) =>
          r.id === editingRoomType.id
            ? { ...r, ...data, updatedAt: new Date().toISOString() }
            : r,
        ),
      );
    } else {
      const newRoomType: RoomType = {
        id: String(roomTypes.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setRoomTypes([...roomTypes, newRoomType]);
    }
    setIsFormOpen(false);
    setEditingRoomType(null);
  };

  const handleEdit = (roomType: RoomType) => {
    setEditingRoomType(roomType);
    setIsFormOpen(true);
  };

  const handleStatusChange = (id: string, status: RoomType["status"]) => {
    setRoomTypes(
      roomTypes.map((r) =>
        r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Room Types</h2>
          <p className="text-muted-foreground">
            Manage room types for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Room Type"
          onClick={() => {
            setEditingRoomType(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <RoomTypeTable
        roomTypes={roomTypes}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />

      <RoomTypeFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        roomType={editingRoomType}
        hotels={mockHotels}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
