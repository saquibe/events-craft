"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EventListTable } from "@/components/admin/rsvp/EventListTable";
import { EventListFormSheet } from "@/components/admin/rsvp/EventListFormSheet";
import { EventList } from "@/lib/types/rsvp";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockEvents: EventList[] = [
  {
    id: "1",
    profileName: "Wedding Guest",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    profileName: "Corporate Event",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

export default function EventListPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [events, setEvents] = useState<EventList[]>(mockEvents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventList | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id
            ? { ...e, ...data, updatedAt: new Date().toISOString() }
            : e,
        ),
      );
    } else {
      const newEvent: EventList = {
        id: String(events.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setEvents([...events, newEvent]);
    }
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: EventList) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleStatusChange = (id: string, status: EventList["status"]) => {
    setEvents(
      events.map((e) =>
        e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Event List</h2>
          <p className="text-muted-foreground">
            Manage event lists for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Event List"
          onClick={() => {
            setEditingEvent(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <EventListTable
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <EventListFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        event={editingEvent}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
