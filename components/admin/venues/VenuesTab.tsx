"use client";

import { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { CreateButton } from "../common/CreateButton";
import { EmptyState } from "../common/EmptyState";
import { VenuesTable } from "./VenuesTable";
import { VenueFormSheet } from "./VenueFormSheet";
import type { Venue } from "./types";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

interface VenuesTabProps {
  venues: Venue[];
  onUpdateVenue: (id: string, data: Partial<Venue>) => void;
  onDeleteVenue: (id: string) => void;
}

export function VenuesTab({
  venues,
  onUpdateVenue,
  onDeleteVenue,
}: VenuesTabProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [activeTab, setActiveTab] = useState("active");

  const activeVenues = venues.filter((venue) => venue.status === "Active");

  const suspendedVenues = venues.filter((venue) => venue.status === "Inactive");

  const handleSave = (data: Omit<Venue, "id">) => {
    if (editingVenue) {
      onUpdateVenue(editingVenue.id, data);
    } else {
      const newVenue: Venue = {
        id: Date.now().toString(),
        ...data,
      };
      onUpdateVenue(newVenue.id, newVenue);
    }
    setIsSheetOpen(false);
    setEditingVenue(null);
  };

  const handleEdit = (venue: Venue) => {
    setEditingVenue(venue);
    setIsSheetOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Venues"
        action={
          <CreateButton
            onClick={() => setIsSheetOpen(true)}
            label="Add Venue"
          />
        }
      />

      {/* Description text */}
      <p className="text-muted-foreground text-sm font-normal mb-6">
        The table below shows all of the venues available for your events.
      </p>

      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="border-b border-border">
          <div className="flex justify-start">
            <SimpleTabsList>
              <SimpleTabsTrigger value="active">
                Active ({activeVenues.length})
              </SimpleTabsTrigger>

              <SimpleTabsTrigger value="suspended">
                Suspended ({suspendedVenues.length})
              </SimpleTabsTrigger>
            </SimpleTabsList>
          </div>
        </div>

        <SimpleTabsContent value="active" className="mt-6">
          <VenuesTable
            venues={activeVenues}
            onEdit={handleEdit}
            onDelete={onDeleteVenue}
            onStatusChange={(id, status) => onUpdateVenue(id, { status })}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="suspended" className="mt-6">
          <VenuesTable
            venues={suspendedVenues}
            onEdit={handleEdit}
            onDelete={onDeleteVenue}
            onStatusChange={(id, status) => onUpdateVenue(id, { status })}
          />
        </SimpleTabsContent>
      </SimpleTabs>

      <VenueFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        editingVenue={editingVenue}
        onSave={handleSave}
      />
    </>
  );
}
