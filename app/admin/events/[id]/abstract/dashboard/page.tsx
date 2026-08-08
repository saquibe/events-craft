"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  FileCheck,
  Plus,
} from "lucide-react";
import { AbstractTable } from "@/components/admin/abstract/AbstractTable";
import { CategoryTable } from "@/components/admin/abstract/CategoryTable";
import { AbstractReviewerTable } from "@/components/admin/abstract/AbstractReviewerTable";
import { AbstractApproverTable } from "@/components/admin/abstract/AbstractApproverTable";
import { PresentationJudgeTable } from "@/components/admin/abstract/PresentationJudgeTable";
import { CategoryFormSheet } from "@/components/admin/abstract/CategoryFormSheet";
import { AbstractReviewerFormSheet } from "@/components/admin/abstract/AbstractReviewerFormSheet";
import { AbstractApproverFormSheet } from "@/components/admin/abstract/AbstractApproverFormSheet";
import { PresentationJudgeFormSheet } from "@/components/admin/abstract/PresentationJudgeFormSheet";
import { AbstractSettings } from "@/components/admin/abstract/AbstractSettings";
import {
  Category,
  AbstractReviewer,
  AbstractApprover,
  PresentationJudge,
  Abstract as AbstractType,
  AbstractStats,
} from "@/lib/types/abstract";

// Mock data
const mockStats: AbstractStats = {
  totalAbstracts: 45,
  pendingReview: 12,
  reviewed: 18,
  accepted: 10,
  rejected: 5,
  totalCategories: 4,
};

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

const mockAbstracts: AbstractType[] = [
  {
    id: "1",
    submittedBy: "m@n.com",
    presenterName: "Mintu Nath",
    coAuthors: ["Dr. Sarah Johnson"],
    abstractTitle: "dsjkdfo dsjfklsdjf. dsjfklsdf",
    abstractDetails: "Detailed abstract content...",
    wordCount: 250,
    categoryId: "1",
    category: mockCategories[0],
    optionName: "ePoster",
    abstractNumber: "ABS001",
    status: "Pending Review",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockReviewers: AbstractReviewer[] = [];
const mockApprovers: AbstractApprover[] = [];
const mockJudges: PresentationJudge[] = [];

const mockSettings = {
  submissionFormOpenDate: "2025-12-01",
  submissionFormCloseDate: "2026-01-15",
  judgingFormOpenDate: "2026-01-20",
  judgingFormCloseDate: "2026-02-15",
  submissionLimitPerCategory: 50,
};

export default function AbstractDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [activeTab, setActiveTab] = useState("abstracts");
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [abstracts, setAbstracts] = useState<AbstractType[]>(mockAbstracts);
  const [reviewers, setReviewers] = useState<AbstractReviewer[]>(mockReviewers);
  const [approvers, setApprovers] = useState<AbstractApprover[]>(mockApprovers);
  const [judges, setJudges] = useState<PresentationJudge[]>(mockJudges);
  const [settings, setSettings] = useState(mockSettings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formType, setFormType] = useState<
    "category" | "reviewer" | "approver" | "judge"
  >("category");

  const statItems = [
    {
      title: "Total Abstracts",
      value: mockStats.totalAbstracts,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Pending Review",
      value: mockStats.pendingReview,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Reviewed",
      value: mockStats.reviewed,
      icon: FileCheck,
      color: "bg-purple-500",
    },
    {
      title: "Accepted",
      value: mockStats.accepted,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Rejected",
      value: mockStats.rejected,
      icon: XCircle,
      color: "bg-red-500",
    },
  ];

  const handleOpenForm = (
    type: "category" | "reviewer" | "approver" | "judge",
    item?: any,
  ) => {
    setFormType(type);
    setEditingItem(item || null);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: any) => {
    // Handle form submission based on type
    if (formType === "category") {
      if (editingItem) {
        setCategories(
          categories.map((c) =>
            c.id === editingItem.id ? { ...c, ...data } : c,
          ),
        );
      } else {
        setCategories([
          ...categories,
          {
            id: String(categories.length + 1),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    } else if (formType === "reviewer") {
      if (editingItem) {
        setReviewers(
          reviewers.map((r) =>
            r.id === editingItem.id ? { ...r, ...data } : r,
          ),
        );
      } else {
        setReviewers([
          ...reviewers,
          {
            id: String(reviewers.length + 1),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    } else if (formType === "approver") {
      if (editingItem) {
        setApprovers(
          approvers.map((a) =>
            a.id === editingItem.id ? { ...a, ...data } : a,
          ),
        );
      } else {
        setApprovers([
          ...approvers,
          {
            id: String(approvers.length + 1),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    } else if (formType === "judge") {
      if (editingItem) {
        setJudges(
          judges.map((j) => (j.id === editingItem.id ? { ...j, ...data } : j)),
        );
      } else {
        setJudges([
          ...judges,
          {
            id: String(judges.length + 1),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleStatusChange = (id: string, status: any) => {
    // Handle status change based on type
    if (formType === "category") {
      setCategories(
        categories.map((c) => (c.id === id ? { ...c, status } : c)),
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Abstract Management
        </h2>
        <p className="text-muted-foreground">
          Manage abstracts, categories, reviewers, and judges for Event #
          {eventId}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statItems.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="abstracts">Abstracts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="reviewers">Abstract Reviewers</TabsTrigger>
          <TabsTrigger value="approvers">Abstract Approvers</TabsTrigger>
          <TabsTrigger value="judges">Presentation Judges</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="abstracts" className="mt-6">
          <AbstractTable
            abstracts={abstracts}
            onSendEmail={(id) => alert(`Email sent for abstract ${id}`)}
            onSuspend={(id) => alert(`Abstract ${id} suspended`)}
            onExport={() => alert("Exporting abstracts...")}
            onSendUpdateEmail={() => alert("Update email sent to all authors")}
          />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button onClick={() => handleOpenForm("category")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
          <CategoryTable
            categories={categories}
            onEdit={(category) => handleOpenForm("category", category)}
            onStatusChange={(id, status) => {
              setCategories(
                categories.map((c) => (c.id === id ? { ...c, status } : c)),
              );
            }}
          />
        </TabsContent>

        <TabsContent value="reviewers" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button onClick={() => handleOpenForm("reviewer")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Reviewer
            </Button>
          </div>
          <AbstractReviewerTable
            reviewers={reviewers}
            onEdit={(reviewer) => handleOpenForm("reviewer", reviewer)}
            onDelete={(id) =>
              setReviewers(reviewers.filter((r) => r.id !== id))
            }
            onStatusChange={(id, status) => {
              setReviewers(
                reviewers.map((r) => (r.id === id ? { ...r, status } : r)),
              );
            }}
          />
        </TabsContent>

        <TabsContent value="approvers" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button onClick={() => handleOpenForm("approver")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Approver
            </Button>
          </div>
          <AbstractApproverTable
            approvers={approvers}
            onEdit={(approver) => handleOpenForm("approver", approver)}
            onDelete={(id) =>
              setApprovers(approvers.filter((a) => a.id !== id))
            }
            onStatusChange={(id, status) => {
              setApprovers(
                approvers.map((a) => (a.id === id ? { ...a, status } : a)),
              );
            }}
          />
        </TabsContent>

        <TabsContent value="judges" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button onClick={() => handleOpenForm("judge")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Judge
            </Button>
          </div>
          <PresentationJudgeTable
            judges={judges}
            onEdit={(judge) => handleOpenForm("judge", judge)}
            onDelete={(id) => setJudges(judges.filter((j) => j.id !== id))}
            onStatusChange={(id, status) => {
              setJudges(
                judges.map((j) => (j.id === id ? { ...j, status } : j)),
              );
            }}
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <AbstractSettings settings={settings} onSave={setSettings} />
        </TabsContent>
      </Tabs>

      {/* Form Sheet */}
      {formType === "category" && (
        <CategoryFormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          category={editingItem}
          onSubmit={handleSubmit}
        />
      )}
      {formType === "reviewer" && (
        <AbstractReviewerFormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          reviewer={editingItem}
          categories={categories}
          onSubmit={handleSubmit}
        />
      )}
      {formType === "approver" && (
        <AbstractApproverFormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          approver={editingItem}
          categories={categories}
          onSubmit={handleSubmit}
        />
      )}
      {formType === "judge" && (
        <PresentationJudgeFormSheet
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          judge={editingItem}
          categories={categories}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
