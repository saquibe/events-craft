"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PresentationTable } from "@/components/admin/presentation/PresentationTable";
import { Presentation } from "@/lib/types/presentation";

// Mock presentations
const mockPresentations: Presentation[] = [
  {
    id: "1",
    type: "ePoster",
    presenterName: "Prof. Michael Chen",
    presenterEmail: "michael@example.com",
    abstractId: "ABS016",
    topic: "Digital Transformation",
    dateTime: "2025-08-13T14:00:00",
    location: "Hall E",
    status: "Submitted",
    fileUrl: "/files/eposter1.pdf",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "ePoster",
    presenterName: "Dr. Emily Davis",
    presenterEmail: "emily@example.com",
    abstractId: "ABS017",
    topic: "Healthcare Innovations",
    dateTime: "2025-08-13T15:30:00",
    location: "Hall F",
    status: "Pending",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "ePoster",
    presenterName: "Prof. David Wilson",
    presenterEmail: "david@example.com",
    abstractId: "ABS018",
    topic: "Sustainable Technology",
    dateTime: "2025-08-14T10:00:00",
    location: "Hall G",
    status: "Submitted",
    fileUrl: "/files/eposter2.pdf",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function EPosterPage() {
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
        <h2 className="text-2xl font-bold tracking-tight">ePoster</h2>
        <p className="text-muted-foreground">
          Manage ePoster submissions for Event #{eventId}
        </p>
      </div>

      <PresentationTable
        presentations={presentations}
        type="ePoster"
        onSendReminder={handleSendReminder}
        onDownload={handleDownload}
        onCopyLink={handleCopyLink}
      />
    </div>
  );
}
