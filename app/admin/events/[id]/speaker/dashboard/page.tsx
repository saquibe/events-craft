"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Speaker } from "@/lib/types/speaker";
import { SpeakerDashboard } from "@/components/admin/speaker/SpeakerDashboard";
import { SpeakerTable } from "@/components/admin/speaker/SpeakerTable";
import { SpeakerFormSheet } from "@/components/admin/speaker/SpeakerFormSheet";
import { CreateButton } from "@/components/admin";

// Mock data - replace with actual API calls
const mockSpeakers: Speaker[] = [
  {
    id: "1",
    email: "abc@abc.com",
    prefix: "Dr.",
    firstName: "ABC",
    lastName: "XYZ",
    mobile: "7331131070",
    designation: "Resident Dr",
    company: "XYZ Hospital",
    profilePhoto: "",
    speakerTypeId: "1",
    speakerAcceptance: true,
    speakerEmail: true,
    registrationId: "REG001",
    status: "registered",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock speakers as needed
];

export default function SpeakerDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [speakers, setSpeakers] = useState<Speaker[]>(mockSpeakers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);

  const handleAddSpeaker = async (data: any) => {
    const newSpeaker: Speaker = {
      id: String(speakers.length + 1),
      ...data,
      registrationId: `REG${String(speakers.length + 1).padStart(3, "0")}`,
      status: "registered",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSpeakers([...speakers, newSpeaker]);
  };

  const handleEditSpeaker = async (data: any) => {
    if (editingSpeaker) {
      setSpeakers(
        speakers.map((s) =>
          s.id === editingSpeaker.id
            ? { ...s, ...data, updatedAt: new Date().toISOString() }
            : s,
        ),
      );
    }
  };

  const handleDeleteSpeaker = (id: string) => {
    setSpeakers(speakers.filter((s) => s.id !== id));
  };

  const handleStatusChange = (id: string, status: Speaker["status"]) => {
    setSpeakers(
      speakers.map((s) =>
        s.id === id ? { ...s, status, updatedAt: new Date().toISOString() } : s,
      ),
    );
  };

  const handleResendInvite = (id: string) => {
    console.log("Resend invite for speaker:", id);
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Speakers</h2>
          <p className="text-muted-foreground">
            Manage speakers for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Speaker"
          onClick={() => {
            setEditingSpeaker(null);
            setIsFormOpen(true);
          }}
        />
      </div> */}

      {/* Dashboard Stats */}
      <SpeakerDashboard speakers={speakers} />

      {/* Speaker Table */}
      <div className="mt-8">
        <SpeakerTable
          speakers={speakers}
          onEdit={(speaker) => {
            setEditingSpeaker(speaker);
            setIsFormOpen(true);
          }}
          onDelete={handleDeleteSpeaker}
          onStatusChange={handleStatusChange}
          onResendInvite={handleResendInvite}
        />
      </div>

      {/* Form Sheet */}
      <SpeakerFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        speaker={editingSpeaker}
        onSubmit={editingSpeaker ? handleEditSpeaker : handleAddSpeaker}
      />
    </div>
  );
}
