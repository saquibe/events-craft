"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ScanCategory } from "@/lib/types/onsite";
import { ScanCategoryTable } from "@/components/admin/onsite/ScanCategoryTable";
import { ScanCategoryFormSheet } from "@/components/admin/onsite/ScanCategoryFormSheet";
import { CreateButton } from "@/components/admin";

const mockCategories: ScanCategory[] = [
  {
    id: "1",
    name: "Main Entrance",
    scanCode: "SCAN001",
    description: "Main event entrance scan point",
    scanMode: "Single",
    allowReentry: false,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "VIP Entrance",
    scanCode: "SCAN002",
    description: "VIP and speaker entrance",
    scanMode: "Multi",
    allowReentry: true,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ScanPointPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [categories, setCategories] = useState<ScanCategory[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ScanCategory | null>(
    null,
  );

  const handleSubmit = async (data: any) => {
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id ? { ...c, ...data } : c,
        ),
      );
    } else {
      const newCategory = {
        id: String(categories.length + 1),
        ...data,
      };
      setCategories([...categories, newCategory]);
    }
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleStatusChange = (id: string, status: "Active" | "Inactive") => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Scan Point</h2>
          <p className="text-muted-foreground">
            Manage scan categories for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Scan Category"
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <ScanCategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <ScanCategoryFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
