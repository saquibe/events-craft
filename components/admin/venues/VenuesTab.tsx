"use client";

import { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { CreateButton } from "../common/CreateButton";
import { EmptyState } from "../common/EmptyState";
import { VenuesTable } from "./VenuesTable";
import { VenueFormSheet } from "./VenueFormSheet";
import type { Venue } from "./types";

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
      <p className="text-muted-foreground text-sm mb-6">
        The table below shows all of the venues available for your events.
      </p>

      {venues.length === 0 ? (
        <EmptyState
          title="No venues"
          description="Add your first venue to get started"
        />
      ) : (
        <VenuesTable
          venues={venues}
          onEdit={handleEdit}
          onDelete={onDeleteVenue}
          onStatusChange={(id, status) => onUpdateVenue(id, { status })}
        />
      )}

      <VenueFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        editingVenue={editingVenue}
        onSave={handleSave}
      />
    </>
  );
}
