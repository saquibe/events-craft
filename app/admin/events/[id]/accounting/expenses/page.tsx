"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExpenseTable } from "@/components/admin/accounting/ExpenseTable";
import { ExpenseFormSheet } from "@/components/admin/accounting/ExpenseFormSheet";
import { Expense, ExpenseHead } from "@/lib/types/accounting";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockExpenseHeads: ExpenseHead[] = [
  {
    id: "1",
    categoryId: "1",
    name: "Hotel Stay",
    amountPerUnit: 100,
    unitQuantity: 5,
    unitType: "nights",
    taxPercentage: 18,
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

const mockExpenses: Expense[] = [];

export default function ExpensesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [expenseHeads] = useState<ExpenseHead[]>(mockExpenseHeads);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Calculate amounts
      const expenseHead = expenseHeads.find((e) => e.id === data.expenseHeadId);
      const amount = expenseHead
        ? expenseHead.amountPerUnit * parseFloat(data.totalUnit)
        : 0;
      const taxAmount = (amount * parseFloat(data.taxPercentage)) / 100;
      const totalAmount = amount + taxAmount;

      if (editingExpense) {
        setExpenses(
          expenses.map((e) =>
            e.id === editingExpense.id
              ? {
                  ...e,
                  ...data,
                  amount,
                  taxAmount,
                  totalAmount,
                  updatedAt: new Date().toISOString(),
                }
              : e,
          ),
        );
      } else {
        const newExpense: Expense = {
          id: String(expenses.length + 1),
          ...data,
          totalUnit: parseFloat(data.totalUnit),
          taxPercentage: parseFloat(data.taxPercentage),
          amount,
          taxAmount,
          totalAmount,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setExpenses([...expenses, newExpense]);
      }
    } catch (error) {
      console.error("Error saving expense:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingExpense(null);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: Expense["status"]) => {
    setExpenses(
      expenses.map((e) =>
        e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">
            Manage expenses for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Expense"
          onClick={() => {
            setEditingExpense(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <ExpenseTable
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <ExpenseFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        expense={editingExpense}
        expenseHeads={expenseHeads}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
