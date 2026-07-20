"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { StallTable } from "@/components/admin/exhibitor/StallTable";
import { StallFormSheet } from "@/components/admin/exhibitor/StallFormSheet";
import { Stall, Hall, StallType } from "@/lib/types/exhibitor";
import { CreateButton } from "@/components/admin";

const mockHalls: Hall[] = [
  { id: "1", name: "Hall A", status: "Active", createdAt: "", updatedAt: "" },
  { id: "2", name: "Hall B", status: "Active", createdAt: "", updatedAt: "" },
];

const mockStallTypes: StallType[] = [
  { id: "1", name: "Shell Scheme", createdAt: "", updatedAt: "" },
  { id: "2", name: "Bare Space", createdAt: "", updatedAt: "" },
  { id: "3", name: "Table Space", createdAt: "", updatedAt: "" },
];

const mockStalls: Stall[] = [
  {
    id: "1",
    name: "Stall 1",
    number: "S001",
    size: 10,
    stallTypeId: "1",
    hallId: "1",
    visibility: "Visible",
    availability: "Onsale",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

export default function ExhibitionStallsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [stalls, setStalls] = useState<Stall[]>(mockStalls);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStall, setEditingStall] = useState<Stall | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingStall) {
      setStalls(
        stalls.map((s) =>
          s.id === editingStall.id
            ? { ...s, ...data, updatedAt: new Date().toISOString() }
            : s,
        ),
      );
    } else {
      const newStall: Stall = {
        id: String(stalls.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setStalls([...stalls, newStall]);
    }
    setIsFormOpen(false);
    setEditingStall(null);
  };

  const handleEdit = (stall: Stall) => {
    setEditingStall(stall);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setStalls(stalls.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Exhibition Stalls
          </h2>
          <p className="text-muted-foreground">
            Manage exhibition stalls for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Stall"
          onClick={() => {
            setEditingStall(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <StallTable stalls={stalls} onEdit={handleEdit} onDelete={handleDelete} />

      <StallFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        stall={editingStall}
        halls={mockHalls}
        stallTypes={mockStallTypes}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
