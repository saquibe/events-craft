"use client";

import { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { CreateButton } from "../common/CreateButton";
import { OrganizerFormSheet } from "./OrganizerFormSheet";
import type { Organizer } from "./types";
import { Button } from "@/components/ui/button";

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

  const handleSave = (data: Omit<Organizer, "id">) => {
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
            label={organizer ? "Edit Settings" : "Configure Organizer"}
          />
        }
      />

      <p className="text-muted-foreground text-sm mb-6">
        Configure your organizer profile, license details, and social media
        links.
      </p>

      {organizer ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Section */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Profile</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">
                  Organizer Name
                </span>
                <p className="text-foreground font-medium">
                  {organizer.orgName || "-"}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">About</span>
                <p className="text-foreground">{organizer.orgAbout || "-"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Website</span>
                <p className="text-foreground">{organizer.orgWebsite || "-"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Tax ID</span>
                <p className="text-foreground">{organizer.orgTaxId || "-"}</p>
              </div>
            </div>
          </div>

          {/* License Section */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">
              EventsCraft License
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">
                  Organizer Code
                </span>
                <p className="text-foreground font-mono">
                  {organizer.orgCode || "-"}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Validity Period
                </span>
                <p className="text-foreground">
                  {organizer.orgValidFrom
                    ? new Date(organizer.orgValidFrom).toLocaleDateString()
                    : "-"}
                  {" → "}
                  {organizer.orgValidTill
                    ? new Date(organizer.orgValidTill).toLocaleDateString()
                    : "-"}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Total Events
                </span>
                <p className="text-foreground font-semibold text-xl">
                  {organizer.orgEventNo || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Address</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Address</span>
                <p className="text-foreground">
                  {organizer.orgAddress1 && `${organizer.orgAddress1}, `}
                  {organizer.orgAddress2 && `${organizer.orgAddress2}, `}
                  {organizer.orgCity && `${organizer.orgCity}, `}
                  {organizer.orgState && `${organizer.orgState}, `}
                  {organizer.orgCountry && `${organizer.orgCountry}`}
                  {organizer.orgZip && ` - ${organizer.orgZip}`}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Social Media</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Facebook</span>
                <p className="text-foreground">{organizer.orgFb || "-"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">LinkedIn</span>
                <p className="text-foreground">{organizer.orgLin || "-"}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  X (Twitter)
                </span>
                <p className="text-foreground">{organizer.orgX || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground mb-4">
            No organizer profile configured yet.
          </p>
          <Button onClick={handleEdit} color="primary">
            Configure Organizer
          </Button>
        </div>
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
