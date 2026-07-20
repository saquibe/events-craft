"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StallTypeTable } from "@/components/admin/exhibitor/StallTypeTable";
import { StallTypeFormSheet } from "@/components/admin/exhibitor/StallTypeFormSheet";
import { StallType } from "@/lib/types/exhibitor";

const mockStallTypes: StallType[] = [
  {
    id: "1",
    name: "Shell Scheme",
    description: "Standard shell scheme booth",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Bare Space",
    description: "Empty space for custom setup",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Table Space",
    description: "Table only setup",
    createdAt: "",
    updatedAt: "",
  },
];

export default function StallTypesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [stallTypes, setStallTypes] = useState<StallType[]>(mockStallTypes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStallType, setEditingStallType] = useState<StallType | null>(
    null,
  );

  const handleSubmit = async (data: any) => {
    if (editingStallType) {
      setStallTypes(
        stallTypes.map((s) =>
          s.id === editingStallType.id
            ? { ...s, ...data, updatedAt: new Date().toISOString() }
            : s,
        ),
      );
    } else {
      const newStallType: StallType = {
        id: String(stallTypes.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setStallTypes([...stallTypes, newStallType]);
    }
    setIsFormOpen(false);
    setEditingStallType(null);
  };

  const handleEdit = (stallType: StallType) => {
    setEditingStallType(stallType);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setStallTypes(stallTypes.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Stall Types</h2>
          <p className="text-muted-foreground">
            Manage stall types for Event #{eventId}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingStallType(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Stall Type
        </Button>
      </div>

      <StallTypeTable
        stallTypes={stallTypes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StallTypeFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        stallType={editingStallType}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
