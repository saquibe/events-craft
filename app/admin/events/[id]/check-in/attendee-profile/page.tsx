"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AttendeeProfileTable } from "@/components/admin/onsite/AttendeeProfileTable";
import { AttendeeProfileFormSheet } from "@/components/admin/onsite/AttendeeProfileFormSheet";
import { AttendeeProfile } from "@/lib/types/onsite";
import { CreateButton } from "@/components/admin";

const defaultProfiles: AttendeeProfile[] = [
  {
    id: "1",
    name: "Attendee",
    status: "Active",
    isDefault: true,
    canDelete: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Speaker",
    status: "Active",
    isDefault: true,
    canDelete: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Exhibitor",
    status: "Active",
    isDefault: true,
    canDelete: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Visitor",
    status: "Active",
    isDefault: true,
    canDelete: false,
    createdAt: "",
    updatedAt: "",
  },
];

export default function AttendeeProfilePage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [profiles, setProfiles] = useState<AttendeeProfile[]>(defaultProfiles);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<AttendeeProfile | null>(
    null,
  );

  const handleAddProfile = async (data: any) => {
    const newProfile: AttendeeProfile = {
      id: String(profiles.length + 1),
      ...data,
      isDefault: false,
      canDelete: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProfiles([...profiles, newProfile]);
  };

  const handleEditProfile = async (data: any) => {
    if (editingProfile) {
      setProfiles(
        profiles.map((p) =>
          p.id === editingProfile.id
            ? { ...p, ...data, updatedAt: new Date().toISOString() }
            : p,
        ),
      );
    }
  };

  const handleEdit = (profile: AttendeeProfile) => {
    setEditingProfile(profile);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Attendee Profile
          </h2>
          <p className="text-muted-foreground">
            Manage attendee profiles for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Profile"
          onClick={() => {
            setEditingProfile(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <AttendeeProfileTable profiles={profiles} onEdit={handleEdit} />

      <AttendeeProfileFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        profile={editingProfile}
        onSubmit={editingProfile ? handleEditProfile : handleAddProfile}
        isDefault={editingProfile?.isDefault}
      />
    </div>
  );
}
