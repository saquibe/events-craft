"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AbstractReviewerTable } from "@/components/admin/abstract/AbstractReviewerTable";
import { AbstractReviewerFormSheet } from "@/components/admin/abstract/AbstractReviewerFormSheet";
import { AbstractReviewer, Category } from "@/lib/types/abstract";
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

const mockReviewers: AbstractReviewer[] = [];

export default function AbstractReviewersPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [reviewers, setReviewers] = useState<AbstractReviewer[]>(mockReviewers);
  const [categories] = useState<Category[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReviewer, setEditingReviewer] =
    useState<AbstractReviewer | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingReviewer) {
      setReviewers(
        reviewers.map((r) =>
          r.id === editingReviewer.id
            ? { ...r, ...data, updatedAt: new Date().toISOString() }
            : r,
        ),
      );
    } else {
      const newReviewer: AbstractReviewer = {
        id: String(reviewers.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setReviewers([...reviewers, newReviewer]);
    }
    setIsFormOpen(false);
    setEditingReviewer(null);
  };

  const handleEdit = (reviewer: AbstractReviewer) => {
    setEditingReviewer(reviewer);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setReviewers(reviewers.filter((r) => r.id !== id));
  };

  const handleStatusChange = (
    id: string,
    status: AbstractReviewer["status"],
  ) => {
    setReviewers(
      reviewers.map((r) =>
        r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Abstract Reviewers
          </h2>
          <p className="text-muted-foreground">
            Manage abstract reviewers for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Reviewer"
          onClick={() => {
            setEditingReviewer(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <AbstractReviewerTable
        reviewers={reviewers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <AbstractReviewerFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        reviewer={editingReviewer}
        categories={categories}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
