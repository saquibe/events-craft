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
import { ProfileTable } from "./ProfileTable";
import { LicenseTable } from "./LicenseTable";
import { OrganizerFormSheet } from "./OrganizerFormSheet";
import type { Organizer, OrganizerFormData } from "./types";

interface OrganizerTabProps {
  organizer: Organizer | null;
  onUpdateOrganizer: (id: string, data: Partial<Organizer>) => void;
}

export function OrganizerTab({
  organizer,
  onUpdateOrganizer,
}: OrganizerTabProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingOrganizer, setEditingOrganizer] = useState<Organizer | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = (data: OrganizerFormData) => {
    if (editingOrganizer) {
      onUpdateOrganizer(editingOrganizer.id, data);
    } else if (organizer) {
      onUpdateOrganizer(organizer.id, data);
    } else {
      const newOrganizer: Organizer = {
        id: Date.now().toString(),
        ...data,
      };
      onUpdateOrganizer(newOrganizer.id, newOrganizer);
    }
    setIsSheetOpen(false);
    setEditingOrganizer(null);
  };

  const handleEdit = () => {
    if (organizer) {
      setEditingOrganizer(organizer);
      setIsSheetOpen(true);
    } else {
      setIsSheetOpen(true);
    }
  };

  return (
    <>
      <PageHeader
        title="Organizer Settings"
        action={
          <CreateButton
            onClick={handleEdit}
            label={organizer ? "Edit Organizer" : "Add Organizer"}
          />
        }
      />

      <p className="text-muted-foreground text-sm font-normal mb-6">
        The table below shows all of the organizer profile and license details.
      </p>

      {organizer ? (
        <SimpleTabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Sub-tabs - LEFT ALIGNED with bottom border */}
          <div className="border-b border-border">
            <div className="flex justify-start">
              <SimpleTabsList>
                <SimpleTabsTrigger value="profile">Profile</SimpleTabsTrigger>
                <SimpleTabsTrigger value="license">
                  EventsCraft License
                </SimpleTabsTrigger>
              </SimpleTabsList>
            </div>
          </div>

          <SimpleTabsContent value="profile" className="mt-6">
            <ProfileTable organizer={organizer} onEdit={handleEdit} />
          </SimpleTabsContent>

          <SimpleTabsContent value="license" className="mt-6">
            <LicenseTable organizer={organizer} onEdit={handleEdit} />
          </SimpleTabsContent>
        </SimpleTabs>
      ) : (
        <EmptyState
          title="No organizer profile"
          description="Configure your organizer profile to get started"
        />
      )}

      <OrganizerFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        editingOrganizer={editingOrganizer}
        onSave={handleSave}
      />
    </>
  );
}
