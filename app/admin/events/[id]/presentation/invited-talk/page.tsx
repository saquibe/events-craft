"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PresentationTable } from "@/components/admin/presentation/PresentationTable";
import { Presentation } from "@/lib/types/presentation";

// Mock presentations
const mockPresentations: Presentation[] = [
  {
    id: "1",
    type: "Talk",
    presenterName: "Mintu Nath",
    presenterEmail: "m@n.com",
    abstractId: "ABS012",
    topic: "dsfdsf dsgfdsf",
    dateTime: "2025-08-12T10:00:00",
    location: "Hall A",
    status: "Submitted",
    fileUrl: "/files/talk1.pdf",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "Talk",
    presenterName: "Adil A",
    presenterEmail: "adil@a.com",
    abstractId: "ABS013",
    topic: "Advanced Medical Research",
    dateTime: "2025-08-12T11:30:00",
    location: "Hall B",
    status: "Pending",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "Talk",
    presenterName: "Dr. Sarah Johnson",
    presenterEmail: "sarah@example.com",
    abstractId: "ABS014",
    topic: "AI in Healthcare",
    dateTime: "2025-08-13T09:00:00",
    location: "Hall C",
    status: "Submitted",
    fileUrl: "/files/talk2.pdf",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function InvitedTalkPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [presentations, setPresentations] =
    useState<Presentation[]>(mockPresentations);

  const handleSendReminder = (id: string) => {
    const presentation = presentations.find((p) => p.id === id);
    if (presentation) {
      alert(`Reminder sent to ${presentation.presenterEmail}`);
    }
  };

  const handleDownload = (id: string) => {
    alert("Downloading file...");
  };

  const handleCopyLink = (id: string) => {
    const link = `https://eventscraft.com/presentation/${id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Invited Talk</h2>
        <p className="text-muted-foreground">
          Manage invited talk submissions for Event #{eventId}
        </p>
      </div>

      <PresentationTable
        presentations={presentations}
        type="Talk"
        onSendReminder={handleSendReminder}
        onDownload={handleDownload}
        onCopyLink={handleCopyLink}
      />
    </div>
  );
}
