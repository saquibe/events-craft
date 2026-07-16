"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { speakerTypes } from "@/lib/data/speaker-types";
import type { SpeakerType } from "@/lib/types/speaker";
import { SpeakerTypeTable } from "@/components/admin/speaker/SpeakerTypeTable";
import { SpeakerTypeFormSheet } from "@/components/admin/speaker/SpeakerTypeFormSheet";
import { CreateButton } from "@/components/admin/common/CreateButton";

export default function SpeakerTypesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [types, setTypes] = useState<SpeakerType[]>(speakerTypes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingType, setEditingType] = useState<SpeakerType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNew = () => {
    setEditingType(null);
    setIsFormOpen(true);
  };

  const handleEdit = (type: SpeakerType) => {
    setEditingType(type);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this speaker type?")) {
      setTypes(types.filter((t) => t.id !== id));
    }
  };

  const handleSubmit = async (data: { name: string; description?: string }) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingType) {
        // Edit existing type
        setTypes(
          types.map((t) => (t.id === editingType.id ? { ...t, ...data } : t)),
        );
      } else {
        // Add new type
        const newType: SpeakerType = {
          id: String(types.length + 1),
          ...data,
        };
        setTypes([...types, newType]);
      }

      setIsFormOpen(false);
      setEditingType(null);
    } catch (error) {
      console.error("Error saving speaker type:", error);
    } finally {
      setIsSubmitting(false);
    }
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
        <CreateButton label="Add Type" onClick={handleAddNew} />
      </div>

      <SpeakerTypeTable
        types={types}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />

      <SpeakerTypeFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        type={editingType}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
