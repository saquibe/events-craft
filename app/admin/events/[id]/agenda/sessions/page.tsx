"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SessionTable } from "@/components/admin/agenda/SessionTable";
import { SessionFormSheet } from "@/components/admin/agenda/SessionFormSheet";
import { Session, Hall, Track } from "@/lib/types/agenda";

// Mock data
const mockHalls: Hall[] = [
  { id: "1", name: "Hall A", capacity: 200, createdAt: "", updatedAt: "" },
  { id: "2", name: "Hall B", capacity: 150, createdAt: "", updatedAt: "" },
];

const mockTracks: Track[] = [
  { id: "1", name: "Medical Track", createdAt: "", updatedAt: "" },
  { id: "2", name: "Technology Track", createdAt: "", updatedAt: "" },
];

const mockSessions: Session[] = [
  {
    id: "1",
    name: "Medical Conference 2026",
    chairperson: ["Dr. Smith"],
    trackId: "1",
    track: mockTracks[0],
    hallId: "1",
    hall: mockHalls[0],
    sessionDate: "2026-01-15",
    startTime: "09:00",
    endTime: "10:30",
    status: "scheduled",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function SessionsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingSession) {
      setSessions(
        sessions.map((s) =>
          s.id === editingSession.id
            ? { ...s, ...data, updatedAt: new Date().toISOString() }
            : s,
        ),
      );
    } else {
      const newSession: Session = {
        id: String(sessions.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setSessions([...sessions, newSession]);
    }
    setIsFormOpen(false);
    setEditingSession(null);
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const handleStatusChange = (id: string, status: Session["status"]) => {
    setSessions(
      sessions.map((s) =>
        s.id === id ? { ...s, status, updatedAt: new Date().toISOString() } : s,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sessions</h2>
          <p className="text-muted-foreground">
            Manage sessions for Event #{eventId}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingSession(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Session
        </Button>
      </div>

      <SessionTable
        sessions={sessions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <SessionFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        session={editingSession}
        halls={mockHalls}
        tracks={mockTracks}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
