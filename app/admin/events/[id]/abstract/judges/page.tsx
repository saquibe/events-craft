"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PresentationJudgeTable } from "@/components/admin/abstract/PresentationJudgeTable";
import { PresentationJudgeFormSheet } from "@/components/admin/abstract/PresentationJudgeFormSheet";
import { PresentationJudge, Category } from "@/lib/types/abstract";
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

const mockJudges: PresentationJudge[] = [];

export default function PresentationJudgesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [judges, setJudges] = useState<PresentationJudge[]>(mockJudges);
  const [categories] = useState<Category[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJudge, setEditingJudge] = useState<PresentationJudge | null>(
    null,
  );

  const handleSubmit = async (data: any) => {
    if (editingJudge) {
      setJudges(
        judges.map((j) =>
          j.id === editingJudge.id
            ? { ...j, ...data, updatedAt: new Date().toISOString() }
            : j,
        ),
      );
    } else {
      const newJudge: PresentationJudge = {
        id: String(judges.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setJudges([...judges, newJudge]);
    }
    setIsFormOpen(false);
    setEditingJudge(null);
  };

  const handleEdit = (judge: PresentationJudge) => {
    setEditingJudge(judge);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setJudges(judges.filter((j) => j.id !== id));
  };

  const handleStatusChange = (
    id: string,
    status: PresentationJudge["status"],
  ) => {
    setJudges(
      judges.map((j) =>
        j.id === id ? { ...j, status, updatedAt: new Date().toISOString() } : j,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Presentation Judges
          </h2>
          <p className="text-muted-foreground">
            Manage presentation judges for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Judge"
          onClick={() => {
            setEditingJudge(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <PresentationJudgeTable
        judges={judges}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <PresentationJudgeFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        judge={editingJudge}
        categories={categories}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
