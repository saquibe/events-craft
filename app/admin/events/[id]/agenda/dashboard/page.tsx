"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { AgendaDashboard } from "@/components/admin/agenda/AgendaDashboard";
import { AgendaStats } from "@/lib/types/agenda";

// Mock stats - replace with actual data
const mockStats: AgendaStats = {
  totalSessions: 24,
  totalTopics: 68,
  totalHalls: 8,
  totalTracks: 4,
  upcomingSessions: 12,
  completedSessions: 8,
};

export default function AgendaDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  return (
    <div className="space-y-6">
      <AgendaDashboard stats={mockStats} />
    </div>
  );
}
