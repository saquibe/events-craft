"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PresentationTable } from "@/components/admin/presentation/PresentationTable";
import { Presentation } from "@/lib/types/presentation";

// Mock presentations
const mockPresentations: Presentation[] = [
  {
    id: "1",
    type: "Paper",
    presenterName: "Dr. Sarah Johnson",
    presenterEmail: "sarah@example.com",
    abstractId: "ABS014",
    topic: "AI in Healthcare",
    dateTime: "2025-08-13T09:00:00",
    location: "Hall C",
    status: "Submitted",
    fileUrl: "/files/paper1.pdf",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "Paper",
    presenterName: "Prof. Robert Lee",
    presenterEmail: "robert@example.com",
    abstractId: "ABS015",
    topic: "Machine Learning Applications",
    dateTime: "2025-08-13T10:30:00",
    location: "Hall D",
    status: "Pending",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "Paper",
    presenterName: "Dr. Emily Davis",
    presenterEmail: "emily@example.com",
    abstractId: "ABS016",
    topic: "Data Science in Medicine",
    dateTime: "2025-08-13T14:00:00",
    location: "Hall E",
    status: "Submitted",
    fileUrl: "/files/paper2.pdf",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function PaperPage() {
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
        <h2 className="text-2xl font-bold tracking-tight">Paper</h2>
        <p className="text-muted-foreground">
          Manage paper submissions for Event #{eventId}
        </p>
      </div>

      <PresentationTable
        presentations={presentations}
        type="Paper"
        onSendReminder={handleSendReminder}
        onDownload={handleDownload}
        onCopyLink={handleCopyLink}
      />
    </div>
  );
}
