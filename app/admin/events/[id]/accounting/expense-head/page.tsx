"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExpenseHeadTable } from "@/components/admin/accounting/ExpenseHeadTable";
import { ExpenseHeadFormSheet } from "@/components/admin/accounting/ExpenseHeadFormSheet";
import { ExpenseHead, ExpenseCategory } from "@/lib/types/accounting";
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
];

const mockExpenseHeads: ExpenseHead[] = [];

export default function ExpenseHeadPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [expenseHeads, setExpenseHeads] =
    useState<ExpenseHead[]>(mockExpenseHeads);
  const [categories] = useState<ExpenseCategory[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpenseHead, setEditingExpenseHead] =
    useState<ExpenseHead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (editingExpenseHead) {
        setExpenseHeads(
          expenseHeads.map((e) =>
            e.id === editingExpenseHead.id
              ? { ...e, ...data, updatedAt: new Date().toISOString() }
              : e,
          ),
        );
      } else {
        const newExpenseHead: ExpenseHead = {
          id: String(expenseHeads.length + 1),
          ...data,
          amountPerUnit: parseFloat(data.amountPerUnit),
          unitQuantity: parseFloat(data.unitQuantity),
          taxPercentage: parseFloat(data.taxPercentage),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setExpenseHeads([...expenseHeads, newExpenseHead]);
      }
    } catch (error) {
      console.error("Error saving expense head:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingExpenseHead(null);
    }
  };

  const handleEdit = (expenseHead: ExpenseHead) => {
    setEditingExpenseHead(expenseHead);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this expense head?")) {
      setExpenseHeads(expenseHeads.filter((e) => e.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: ExpenseHead["status"]) => {
    setExpenseHeads(
      expenseHeads.map((e) =>
        e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Expense Heads</h2>
          <p className="text-muted-foreground">
            Manage expense heads for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Expense Head"
          onClick={() => {
            setEditingExpenseHead(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <ExpenseHeadTable
        expenseHeads={expenseHeads}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <ExpenseHeadFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        expenseHead={editingExpenseHead}
        categories={categories}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
