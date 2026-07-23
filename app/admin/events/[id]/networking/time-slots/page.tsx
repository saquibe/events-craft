"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TimeSlotTable } from "@/components/admin/networking/TimeSlotTable";
import { TimeSlotFormSheet } from "@/components/admin/networking/TimeSlotFormSheet";
import { TimeSlot } from "@/lib/types/networking";
import { CreateButton } from "@/components/admin";

const mockTimeSlots: TimeSlot[] = [
  {
    id: "1",
    startDateTime: "2026-01-15T10:00:00",
    endDateTime: "2026-01-15T10:15:00",
    status: "Active",
    maxBookings: 10,
    currentBookings: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    startDateTime: "2026-01-15T10:30:00",
    endDateTime: "2026-01-15T10:45:00",
    status: "Active",
    maxBookings: 10,
    currentBookings: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function TimeSlotsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTimeSlot, setEditingTimeSlot] = useState<TimeSlot | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingTimeSlot) {
      setTimeSlots(
        timeSlots.map((t) =>
          t.id === editingTimeSlot.id
            ? { ...t, ...data, updatedAt: new Date().toISOString() }
            : t,
        ),
      );
    } else {
      const newTimeSlot: TimeSlot = {
        id: String(timeSlots.length + 1),
        ...data,
        currentBookings: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTimeSlots([...timeSlots, newTimeSlot]);
    }
    setIsFormOpen(false);
    setEditingTimeSlot(null);
  };

  const handleEdit = (timeSlot: TimeSlot) => {
    setEditingTimeSlot(timeSlot);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setTimeSlots(timeSlots.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Time Slots</h2>
          <p className="text-muted-foreground">
            Manage meeting time slots for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Time Slot"
          onClick={() => {
            setEditingTimeSlot(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <TimeSlotTable
        timeSlots={timeSlots}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TimeSlotFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        timeSlot={editingTimeSlot}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
