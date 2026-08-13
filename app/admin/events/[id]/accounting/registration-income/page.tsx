"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RegistrationIncomeTable } from "@/components/admin/accounting/RegistrationIncomeTable";
import { RegistrationIncomeFormSheet } from "@/components/admin/accounting/RegistrationIncomeFormSheet";
import { RegistrationIncome } from "@/lib/types/accounting";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockIncomes: RegistrationIncome[] = [];

export default function RegistrationIncomePage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [incomes, setIncomes] = useState<RegistrationIncome[]>(mockIncomes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<RegistrationIncome | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (editingIncome) {
        setIncomes(
          incomes.map((i) =>
            i.id === editingIncome.id
              ? {
                  ...i,
                  ...data,
                  proposedAmount: parseFloat(data.proposedAmount),
                  receivedAmount: parseFloat(data.receivedAmount),
                  updatedAt: new Date().toISOString(),
                }
              : i,
          ),
        );
      } else {
        const newIncome: RegistrationIncome = {
          id: String(incomes.length + 1),
          ...data,
          proposedAmount: parseFloat(data.proposedAmount),
          receivedAmount: parseFloat(data.receivedAmount),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setIncomes([...incomes, newIncome]);
      }
    } catch (error) {
      console.error("Error saving income:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingIncome(null);
    }
  };

  const handleEdit = (income: RegistrationIncome) => {
    setEditingIncome(income);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setIncomes(incomes.filter((i) => i.id !== id));
    }
  };

  const handleStatusChange = (
    id: string,
    status: RegistrationIncome["status"],
  ) => {
    setIncomes(
      incomes.map((i) =>
        i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Registration Income
          </h2>
          <p className="text-muted-foreground">
            Manage registration income for Event #{eventId}
          </p>
        </div>
        {/* <CreateButton
          label="Add Registration Income"
          onClick={() => {
            setEditingIncome(null);
            setIsFormOpen(true);
          }}
        /> */}
      </div>

      <RegistrationIncomeTable
        incomes={incomes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <RegistrationIncomeFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        income={editingIncome}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
