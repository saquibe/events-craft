"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RecordIncomeTable } from "@/components/admin/accounting/RecordIncomeTable";
import { RecordIncomeFormSheet } from "@/components/admin/accounting/RecordIncomeFormSheet";
import { RecordIncome } from "@/lib/types/accounting";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockRecords: RecordIncome[] = [];

export default function RecordIncomePage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [records, setRecords] = useState<RecordIncome[]>(mockRecords);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RecordIncome | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (editingRecord) {
        setRecords(
          records.map((r) =>
            r.id === editingRecord.id
              ? {
                  ...r,
                  ...data,
                  amountReceived: parseFloat(data.amountReceived),
                  updatedAt: new Date().toISOString(),
                }
              : r,
          ),
        );
      } else {
        const newRecord: RecordIncome = {
          id: String(records.length + 1),
          ...data,
          amountReceived: parseFloat(data.amountReceived),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setRecords([...records, newRecord]);
      }
    } catch (error) {
      console.error("Error saving record:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingRecord(null);
    }
  };

  const handleEdit = (record: RecordIncome) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: RecordIncome["status"]) => {
    setRecords(
      records.map((r) =>
        r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Record Income</h2>
          <p className="text-muted-foreground">
            Record sponsor income for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Record Income"
          onClick={() => {
            setEditingRecord(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <RecordIncomeTable
        records={records}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <RecordIncomeFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        income={editingRecord}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
