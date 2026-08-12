"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExpenseCategoryTable } from "@/components/admin/accounting/ExpenseCategoryTable";
import { ExpenseCategoryFormSheet } from "@/components/admin/accounting/ExpenseCategoryFormSheet";
import { ExpenseCategory } from "@/lib/types/accounting";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockCategories: ExpenseCategory[] = [
  { id: "1", name: "Travel", status: "Active", createdAt: "", updatedAt: "" },
  {
    id: "2",
    name: "Food & Beverage",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  { id: "3", name: "Venue", status: "Active", createdAt: "", updatedAt: "" },
];

export default function ExpenseCategoryPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [categories, setCategories] =
    useState<ExpenseCategory[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<ExpenseCategory | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (editingCategory) {
        setCategories(
          categories.map((c) =>
            c.id === editingCategory.id
              ? { ...c, ...data, updatedAt: new Date().toISOString() }
              : c,
          ),
        );
      } else {
        const newCategory: ExpenseCategory = {
          id: String(categories.length + 1),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setCategories([...categories, newCategory]);
      }
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingCategory(null);
    }
  };

  const handleEdit = (category: ExpenseCategory) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleStatusChange = (
    id: string,
    status: ExpenseCategory["status"],
  ) => {
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
          <h2 className="text-2xl font-bold tracking-tight">
            Expense Categories
          </h2>
          <p className="text-muted-foreground">
            Manage expense categories for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Expense Category"
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <ExpenseCategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <ExpenseCategoryFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
