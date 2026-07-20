"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExhibitionHallTable } from "@/components/admin/exhibitor/ExhibitionHallTable";
import { ExhibitionHallFormSheet } from "@/components/admin/exhibitor/ExhibitionHallFormSheet";
import { Hall } from "@/lib/types/exhibitor";
import { CreateButton } from "@/components/admin";

const mockHalls: Hall[] = [
  { id: "1", name: "Hall A", status: "Active", createdAt: "", updatedAt: "" },
  { id: "2", name: "Hall B", status: "Active", createdAt: "", updatedAt: "" },
];

export default function ExhibitionHallsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [halls, setHalls] = useState<Hall[]>(mockHalls);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHall, setEditingHall] = useState<Hall | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingHall) {
      setHalls(
        halls.map((h) =>
          h.id === editingHall.id
            ? { ...h, ...data, updatedAt: new Date().toISOString() }
            : h,
        ),
      );
    } else {
      const newHall: Hall = {
        id: String(halls.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setHalls([...halls, newHall]);
    }
    setIsFormOpen(false);
    setEditingHall(null);
  };

  const handleEdit = (hall: Hall) => {
    setEditingHall(hall);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setHalls(halls.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Exhibition Halls
          </h2>
          <p className="text-muted-foreground">
            Manage exhibition halls for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Hall"
          onClick={() => {
            setEditingHall(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <ExhibitionHallTable
        halls={halls}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ExhibitionHallFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        hall={editingHall}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
