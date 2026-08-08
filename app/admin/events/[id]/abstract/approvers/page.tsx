"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AbstractApproverTable } from "@/components/admin/abstract/AbstractApproverTable";
import { AbstractApproverFormSheet } from "@/components/admin/abstract/AbstractApproverFormSheet";
import { AbstractApprover, Category } from "@/lib/types/abstract";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Medical Research",
    options: ["ePoster", "Paper", "Talk"],
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Technology",
    options: ["Poster", "Paper"],
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

const mockApprovers: AbstractApprover[] = [];

export default function AbstractApproversPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [approvers, setApprovers] = useState<AbstractApprover[]>(mockApprovers);
  const [categories] = useState<Category[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApprover, setEditingApprover] =
    useState<AbstractApprover | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingApprover) {
      setApprovers(
        approvers.map((a) =>
          a.id === editingApprover.id
            ? { ...a, ...data, updatedAt: new Date().toISOString() }
            : a,
        ),
      );
    } else {
      const newApprover: AbstractApprover = {
        id: String(approvers.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setApprovers([...approvers, newApprover]);
    }
    setIsFormOpen(false);
    setEditingApprover(null);
  };

  const handleEdit = (approver: AbstractApprover) => {
    setEditingApprover(approver);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setApprovers(approvers.filter((a) => a.id !== id));
  };

  const handleStatusChange = (
    id: string,
    status: AbstractApprover["status"],
  ) => {
    setApprovers(
      approvers.map((a) =>
        a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Abstract Approvers
          </h2>
          <p className="text-muted-foreground">
            Manage abstract approvers for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Approver"
          onClick={() => {
            setEditingApprover(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <AbstractApproverTable
        approvers={approvers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <AbstractApproverFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        approver={editingApprover}
        categories={categories}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
