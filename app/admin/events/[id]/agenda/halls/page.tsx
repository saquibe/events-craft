"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HallTable } from "@/components/admin/agenda/HallTable";
import { HallFormSheet } from "@/components/admin/agenda/HallFormSheet";
import { Hall } from "@/lib/types/agenda";
import { CreateButton } from "@/components/admin";

// Mock data - replace with actual data
const mockHalls: Hall[] = [
  {
    id: "1",
    name: "Hall A",
    capacity: 200,
    description: "Main auditorium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Hall B",
    capacity: 150,
    description: "Conference hall",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function HallsPage() {
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
          <h2 className="text-2xl font-bold tracking-tight">Halls</h2>
          <p className="text-muted-foreground">
            Manage halls for Event #{eventId}
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

      <HallTable halls={halls} onEdit={handleEdit} onDelete={handleDelete} />

      <HallFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        hall={editingHall}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
