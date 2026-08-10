"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ItemCategoryTable } from "@/components/admin/emanual/ItemCategoryTable";
import { ItemCategoryFormSheet } from "@/components/admin/emanual/ItemCategoryFormSheet";
import { ItemCategory } from "@/lib/types/emanual";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockCategories: ItemCategory[] = [
  {
    id: "1",
    name: "Electronics",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Furniture",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Stationery",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

export default function ItemCategoryPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [categories, setCategories] = useState<ItemCategory[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ItemCategory | null>(
    null,
  );

  const handleSubmit = async (data: any) => {
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, ...data, updatedAt: new Date().toISOString() }
            : c,
        ),
      );
    } else {
      const newCategory: ItemCategory = {
        id: String(categories.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCategories([...categories, newCategory]);
    }
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: ItemCategory) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleStatusChange = (id: string, status: ItemCategory["status"]) => {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Item Categories</h2>
          <p className="text-muted-foreground">
            Manage item categories for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Item Category"
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <ItemCategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <ItemCategoryFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
