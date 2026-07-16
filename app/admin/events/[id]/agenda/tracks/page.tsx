"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TrackTable } from "@/components/admin/agenda/TrackTable";
import { TrackFormSheet } from "@/components/admin/agenda/TrackFormSheet";
import { Track } from "@/lib/types/agenda";
import { CreateButton } from "@/components/admin/common/CreateButton";

// Mock data
const mockTracks: Track[] = [
  {
    id: "1",
    name: "Medical Track",
    description: "Medical and healthcare sessions",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Technology Track",
    description: "Technology and innovation sessions",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function TracksPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingTrack) {
      setTracks(
        tracks.map((t) =>
          t.id === editingTrack.id
            ? { ...t, ...data, updatedAt: new Date().toISOString() }
            : t,
        ),
      );
    } else {
      const newTrack: Track = {
        id: String(tracks.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTracks([...tracks, newTrack]);
    }
    setIsFormOpen(false);
    setEditingTrack(null);
  };

  const handleEdit = (track: Track) => {
    setEditingTrack(track);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setTracks(tracks.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tracks</h2>
          <p className="text-muted-foreground">
            Manage tracks for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Track"
          onClick={() => {
            setEditingTrack(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <TrackTable tracks={tracks} onEdit={handleEdit} onDelete={handleDelete} />

      <TrackFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        track={editingTrack}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
