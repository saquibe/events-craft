"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { speakerTypes } from "@/lib/data/speaker-types";
import type { SpeakerType } from "@/lib/types/speaker";
import { SpeakerTypeTable } from "@/components/admin/speaker/SpeakerTypeTable";

export default function SpeakerTypesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [types, setTypes] = useState<SpeakerType[]>(speakerTypes);

  const handleEdit = (type: SpeakerType) => {
    console.log("Edit speaker type:", type);
  };

  const handleDelete = (id: string) => {
    setTypes(types.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Speaker Types</h2>
          <p className="text-muted-foreground">
            Manage speaker categories for Event #{eventId}
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Type
        </Button>
      </div>

      <SpeakerTypeTable
        types={types}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
