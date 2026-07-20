"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CategoryTable } from "@/components/admin/exhibitor/CategoryTable";
import { CategoryFormSheet } from "@/components/admin/exhibitor/CategoryFormSheet";
import { Category } from "@/lib/types/exhibitor";
import { CreateButton } from "@/components/admin";

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

export default function CategoriesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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
      const newCategory: Category = {
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

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage exhibitor categories for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Category"
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
