"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExhibitorTable } from "@/components/admin/exhibitor/ExhibitorTable";
import { ExhibitorFormSheet } from "@/components/admin/exhibitor/ExhibitorFormSheet";
import type { Exhibitor, Category, Hall, Stall } from "@/lib/types/exhibitor";
import { CreateButton } from "@/components/admin";

// Use same mock data
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Technology",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Healthcare",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

const mockHalls: Hall[] = [
  { id: "1", name: "Hall A", status: "Active", createdAt: "", updatedAt: "" },
  { id: "2", name: "Hall B", status: "Active", createdAt: "", updatedAt: "" },
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

const mockExhibitors: Exhibitor[] = [];

export default function ExhibitorListPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>(mockExhibitors);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExhibitor, setEditingExhibitor] = useState<Exhibitor | null>(
    null,
  );

  const handleSubmit = async (data: any) => {
    if (editingExhibitor) {
      setExhibitors(
        exhibitors.map((e) =>
          e.id === editingExhibitor.id
            ? { ...e, ...data, updatedAt: new Date().toISOString() }
            : e,
        ),
      );
    } else {
      const newExhibitor: Exhibitor = {
        id: String(exhibitors.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setExhibitors([...exhibitors, newExhibitor]);
    }
    setIsFormOpen(false);
    setEditingExhibitor(null);
  };

  const handleEdit = (exhibitor: Exhibitor) => {
    setEditingExhibitor(exhibitor);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setExhibitors(exhibitors.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Exhibitor List</h2>
          <p className="text-muted-foreground">
            All exhibitors for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Exhibitor"
          onClick={() => {
            setEditingExhibitor(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <ExhibitorTable
        exhibitors={exhibitors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ExhibitorFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        exhibitor={editingExhibitor}
        categories={mockCategories}
        halls={mockHalls}
        stalls={mockStalls}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
