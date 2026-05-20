"use client";

import { useState } from "react";
import {
  SimpleTabs,
  SimpleTabsList,
  SimpleTabsTrigger,
  SimpleTabsContent,
} from "@/components/ui/simple-tabs";
import { PageHeader } from "../common/PageHeader";
import { CreateButton } from "../common/CreateButton";
import { EmptyState } from "../common/EmptyState";
import { EventsTable } from "./EventsTable";
import { EventFormSheet } from "./EventFormSheet";
import type { Event } from "../common/types";

interface EventsTabProps {
  events: Event[];
  venues: { id: string; venueName: string }[];
  onUpdateEvent: (id: string, data: Partial<Event>) => void;
  onDeleteEvent: (id: string) => void;
}

export function EventsTab({
  events,
  venues,
  onUpdateEvent,
  onDeleteEvent,
}: EventsTabProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  const today = new Date();
  const upcomingEvents = events.filter(
    (e) => new Date(e.startDateTime) >= today,
  );
  const pastEvents = events.filter((e) => new Date(e.startDateTime) < today);

  const handleSave = (data: Omit<Event, "id" | "city">) => {
    if (editingEvent) {
      onUpdateEvent(editingEvent.id, data);
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...data,
        city: "Hyderabad",
      };
      onUpdateEvent(newEvent.id, newEvent);
    }
    setIsSheetOpen(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsSheetOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Events"
        action={
          <CreateButton
            onClick={() => setIsSheetOpen(true)}
            label="Create Event"
          />
        }
      />

      <p className="text-muted-foreground text-sm font-normal mb-6">
        The table below shows all of the events owned by Meety Events.
      </p>

      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        {/* Sub-tabs - LEFT ALIGNED with bottom border */}
        <div className="border-b border-border">
          <div className="flex justify-start">
            <SimpleTabsList>
              <SimpleTabsTrigger value="upcoming">
                Upcoming Events ({upcomingEvents.length})
              </SimpleTabsTrigger>
              <SimpleTabsTrigger value="past">
                Past Events ({pastEvents.length})
              </SimpleTabsTrigger>
            </SimpleTabsList>
          </div>
        </div>

        <SimpleTabsContent value="upcoming" className="mt-6">
          <EventsTable
            events={upcomingEvents}
            onEdit={handleEdit}
            onDelete={onDeleteEvent}
            onStatusChange={(id, status) => onUpdateEvent(id, { status })}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="past" className="mt-6">
          <EventsTable
            events={pastEvents}
            onEdit={handleEdit}
            onDelete={onDeleteEvent}
            onStatusChange={(id, status) => onUpdateEvent(id, { status })}
          />
        </SimpleTabsContent>
      </SimpleTabs>

      <EventFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        editingEvent={editingEvent}
        venues={venues}
        onSave={handleSave}
      />
    </>
  );
}
