"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Speaker } from "@/lib/types/speaker";
import { SpeakerTable } from "@/components/admin/speaker/SpeakerTable";
import { SpeakerFormSheet } from "@/components/admin/speaker/SpeakerFormSheet";

// Use the same mock data
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

export default function SpeakerListPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [speakers, setSpeakers] = useState<Speaker[]>(mockSpeakers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);

  // Same handlers as dashboard page

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Speaker List</h2>
          <p className="text-muted-foreground">
            All speakers for Event #{eventId}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingSpeaker(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Speaker
        </Button>
      </div>

      <SpeakerTable
        speakers={speakers}
        onEdit={(speaker) => {
          setEditingSpeaker(speaker);
          setIsFormOpen(true);
        }}
        onDelete={(id) => setSpeakers(speakers.filter((s) => s.id !== id))}
        onStatusChange={(id, status) => {
          setSpeakers(
            speakers.map((s) => (s.id === id ? { ...s, status } : s)),
          );
        }}
        onResendInvite={(id) => console.log("Resend invite:", id)}
      />

      <SpeakerFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        speaker={editingSpeaker}
        onSubmit={async (data) => {
          if (editingSpeaker) {
            setSpeakers(
              speakers.map((s) =>
                s.id === editingSpeaker.id
                  ? { ...s, ...data, updatedAt: new Date().toISOString() }
                  : s,
              ),
            );
          } else {
            const newSpeaker: Speaker = {
              id: String(speakers.length + 1),
              ...data,
              registrationId: `REG${String(speakers.length + 1).padStart(3, "0")}`,
              status: "registered",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            setSpeakers([...speakers, newSpeaker]);
          }
          setIsFormOpen(false);
        }}
      />
    </div>
  );
}
