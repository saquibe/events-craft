"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExhibitorDashboard } from "@/components/admin/exhibitor/ExhibitorDashboard";
import { ExhibitorTable } from "@/components/admin/exhibitor/ExhibitorTable";
import { ExhibitorFormSheet } from "@/components/admin/exhibitor/ExhibitorFormSheet";
import type {
  Exhibitor,
  Category,
  Hall,
  Stall,
  ExhibitorStats,
} from "@/lib/types/exhibitor";

// Mock data
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

const mockStats: ExhibitorStats = {
  totalExhibitors: 0,
  activeExhibitors: 0,
  totalCategories: 2,
  totalHalls: 2,
  totalStalls: 1,
  occupiedStalls: 0,
  availableStalls: 1,
};

export default function ExhibitorDashboardPage() {
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
      {/* <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Exhibitors</h2>
          <p className="text-muted-foreground">
            Manage exhibitors for Event #{eventId}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingExhibitor(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Exhibitor
        </Button>
      </div> */}

      <ExhibitorDashboard stats={mockStats} />

      {/* <div className="mt-8">
        <ExhibitorTable
          exhibitors={exhibitors}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ExhibitorFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        exhibitor={editingExhibitor}
        categories={mockCategories}
        halls={mockHalls}
        stalls={mockStalls}
        onSubmit={handleSubmit}
      /> */}
    </div>
  );
}
