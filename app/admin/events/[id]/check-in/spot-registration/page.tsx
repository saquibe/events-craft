"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SpotRegistrationFormSheet } from "@/components/admin/onsite/SpotRegistrationFormSheet";
import { AttendeeProfile, SpotRegistration } from "@/lib/types/onsite";
import SpotRegistrationTable from "@/components/admin/onsite/SpotRegistrationTable";
import { CreateButton } from "@/components/admin";
import { FormConfig } from "@/components/admin/common/FormBuilder";

const mockProfiles: AttendeeProfile[] = [
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

const mockRegistrations: SpotRegistration[] = [
  {
    id: "1",
    prefix: "Mr.",
    firstName: "Mintu",
    lastName: "Nath",
    email: "m@n.com",
    mobile: "",
    designation: "",
    company: "",
    photo: "",
    attendeeProfileId: "2",
    attendeeProfile: {
      id: "2",
      name: "Speaker",
      status: "Active",
      isDefault: true,
      canDelete: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    regNo: "REG001",
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function SpotRegistrationPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [registrations, setRegistrations] =
    useState<SpotRegistration[]>(mockRegistrations);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRegistration, setEditingRegistration] =
    useState<SpotRegistration | null>(null);
  const [formConfig, setFormConfig] = useState<FormConfig | undefined>(
    // Load from localStorage or API
    undefined,
  );

  const handleSubmit = async (data: any) => {
    if (editingRegistration) {
      setRegistrations(
        registrations.map((r) =>
          r.id === editingRegistration.id
            ? {
                ...r,
                ...data,
                attendeeProfile:
                  mockProfiles.find((p) => p.id === data.attendeeProfileId)
                    ?.name || "",
                dynamicFields: data.dynamicFields || {},
              }
            : r,
        ),
      );
    } else {
      const newRegistration: SpotRegistration = {
        id: String(registrations.length + 1),
        ...data,
        mobile: data.mobile || "",
        designation: data.designation || "",
        company: data.company || "",
        photo: data.profilePhoto || "",
        attendeeProfileId: data.attendeeProfileId,
        attendeeProfile:
          mockProfiles.find((p) => p.id === data.attendeeProfileId) ||
          undefined,
        regNo: `REG${String(registrations.length + 1).padStart(3, "0")}`,
        status: "Active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dynamicFields: data.dynamicFields || {},
      };
      setRegistrations([...registrations, newRegistration]);
    }
    setIsFormOpen(false);
    setEditingRegistration(null);
  };

  const handleEdit = (registration: any) => {
    setEditingRegistration(registration);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setRegistrations(registrations.filter((r) => r.id !== id));
  };

  const handleSendQR = (id: string) => {
    const registration = registrations.find((r) => r.id === id);
    if (registration) {
      alert(`QR Code sent to ${registration.email}`);
    }
  };

  const handleFormSave = (config: FormConfig) => {
    setFormConfig(config);
    // Save to localStorage or API
    localStorage.setItem("spotRegistrationFormConfig", JSON.stringify(config));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Spot Registration
          </h2>
          <p className="text-muted-foreground">
            Register attendees on-site for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Spot Registration"
          onClick={() => {
            setEditingRegistration(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <SpotRegistrationTable
        registrations={registrations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSendQR={handleSendQR}
      />

      <SpotRegistrationFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        registration={editingRegistration}
        profiles={mockProfiles}
        onSubmit={handleSubmit}
        formConfig={formConfig}
        onFormSave={handleFormSave}
      />
    </div>
  );
}
