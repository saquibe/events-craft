"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PresentationDashboard } from "@/components/admin/presentation/PresentationDashboard";
import { PresentationTable } from "@/components/admin/presentation/PresentationTable";
import { Presentation } from "@/lib/types/presentation";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

// Mock stats
const mockStats = {
  totalSubmissions: 45,
  totalTalks: 18,
  totalPapers: 15,
  totalEPosters: 12,
  pendingTalks: 5,
  pendingPapers: 4,
  pendingEPosters: 3,
};

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
    id: "4",
    type: "ePoster",
    presenterName: "Prof. Michael Chen",
    presenterEmail: "michael@example.com",
    abstractId: "ABS015",
    topic: "Digital Transformation",
    dateTime: "2025-08-13T14:00:00",
    location: "Hall D",
    status: "Pending",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function PresentationDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [presentations, setPresentations] =
    useState<Presentation[]>(mockPresentations);

  const handleSendReminder = (id: string) => {
    const presentation = presentations.find((p) => p.id === id);
    if (presentation) {
      console.log(`Sending reminder to ${presentation.presenterEmail}`);
      alert(`Reminder sent to ${presentation.presenterEmail}`);
    }
  };

  const handleDownload = (id: string) => {
    const presentation = presentations.find((p) => p.id === id);
    if (presentation) {
      console.log(
        `Downloading ${presentation.type} from ${presentation.presenterName}`,
      );
      alert(`Downloading ${presentation.type}...`);
    }
  };

  const handleCopyLink = (id: string) => {
    const presentation = presentations.find((p) => p.id === id);
    if (presentation) {
      const link = `https://eventscraft.com/presentation/${presentation.id}`;
      navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      <PresentationDashboard stats={mockStats} />

      <div className="mt-8">
        <SimpleTabs defaultValue="talk" className="w-full">
          <SimpleTabsList>
            <SimpleTabsTrigger value="talk">Invited Talk</SimpleTabsTrigger>

            <SimpleTabsTrigger value="paper">Paper</SimpleTabsTrigger>

            <SimpleTabsTrigger value="eposter">ePoster</SimpleTabsTrigger>
          </SimpleTabsList>

          <SimpleTabsContent value="talk">
            <PresentationTable
              presentations={presentations}
              type="Talk"
              onSendReminder={handleSendReminder}
              onDownload={handleDownload}
              onCopyLink={handleCopyLink}
            />
          </SimpleTabsContent>

          <SimpleTabsContent value="paper">
            <PresentationTable
              presentations={presentations}
              type="Paper"
              onSendReminder={handleSendReminder}
              onDownload={handleDownload}
              onCopyLink={handleCopyLink}
            />
          </SimpleTabsContent>

          <SimpleTabsContent value="eposter">
            <PresentationTable
              presentations={presentations}
              type="ePoster"
              onSendReminder={handleSendReminder}
              onDownload={handleDownload}
              onCopyLink={handleCopyLink}
            />
          </SimpleTabsContent>
        </SimpleTabs>
      </div>
    </div>
  );
}
