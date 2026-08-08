"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { AbstractTable } from "@/components/admin/abstract/AbstractTable";
import { Abstract, Category } from "@/lib/types/abstract";

// Mock categories
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
  {
    id: "3",
    name: "Healthcare",
    options: ["ePoster", "Talk"],
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

// Mock abstracts
const mockAbstracts: Abstract[] = [
  {
    id: "1",
    submittedBy: "m@n.com",
    presenterName: "Mintu Nath",
    coAuthors: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
    abstractTitle: "Innovations in Medical Research",
    abstractDetails:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    wordCount: 250,
    categoryId: "1",
    category: mockCategories[0],
    optionName: "ePoster",
    abstractNumber: "ABS001",
    status: "Pending Review",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    submittedBy: "adil@a.com",
    presenterName: "Adil A",
    coAuthors: ["Dr. Emily Davis"],
    abstractTitle: "Advanced Research in Medical Technology",
    abstractDetails:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    wordCount: 320,
    categoryId: "1",
    category: mockCategories[0],
    optionName: "Paper",
    abstractNumber: "ABS002",
    status: "Reviewed",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    submittedBy: "sarah@example.com",
    presenterName: "Dr. Sarah Johnson",
    coAuthors: [],
    abstractTitle: "Healthcare Innovation Through Technology",
    abstractDetails:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    wordCount: 180,
    categoryId: "2",
    category: mockCategories[1],
    optionName: "Poster",
    abstractNumber: "ABS003",
    status: "Accepted",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    submittedBy: "michael@example.com",
    presenterName: "Prof. Michael Chen",
    coAuthors: ["Dr. Robert Lee"],
    abstractTitle: "Future of Medical Research",
    abstractDetails:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    wordCount: 450,
    categoryId: "3",
    category: mockCategories[2],
    optionName: "Talk",
    abstractNumber: "ABS004",
    status: "Rejected",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    submittedBy: "priya@example.com",
    presenterName: "Dr. Priya Sharma",
    coAuthors: ["Dr. Amit Patel", "Dr. Neha Gupta"],
    abstractTitle: "Digital Transformation in Healthcare",
    abstractDetails:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    wordCount: 290,
    categoryId: "2",
    category: mockCategories[1],
    optionName: "Paper",
    abstractNumber: "ABS005",
    status: "Pending Review",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    submittedBy: "raj@example.com",
    presenterName: "Prof. Raj Kumar",
    coAuthors: [],
    abstractTitle: "Medical Ethics in Modern Practice",
    abstractDetails:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    wordCount: 210,
    categoryId: "3",
    category: mockCategories[2],
    optionName: "ePoster",
    abstractNumber: "ABS006",
    status: "Reviewed",
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function AbstractPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [abstracts, setAbstracts] = useState<Abstract[]>(mockAbstracts);

  const handleSendEmail = (id: string) => {
    const abstract = abstracts.find((a) => a.id === id);
    if (abstract) {
      alert(
        `Email sent to ${abstract.presenterName} (${abstract.submittedBy})`,
      );
    }
  };

  const handleSuspend = (id: string) => {
    const abstract = abstracts.find((a) => a.id === id);
    if (abstract) {
      const newStatus =
        abstract.status === "Accepted" ? "Rejected" : "Accepted";
      setAbstracts(
        abstracts.map((a) =>
          a.id === id
            ? {
                ...a,
                status: newStatus as any,
                updatedAt: new Date().toISOString(),
              }
            : a,
        ),
      );
      alert(
        `${abstract.abstractNumber} ${newStatus === "Accepted" ? "accepted" : "suspended"} successfully!`,
      );
    }
  };

  const handleExport = () => {
    alert("Exporting abstracts to CSV...");
  };

  const handleSendUpdateEmail = () => {
    alert("Update email sent to all authors!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Abstracts</h2>
          <p className="text-muted-foreground">
            Manage all abstracts for Event #{eventId}
          </p>
        </div>
        {/* <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Abstract
        </Button> */}
      </div>

      <AbstractTable
        abstracts={abstracts}
        onSendEmail={handleSendEmail}
        onSuspend={handleSuspend}
        onExport={handleExport}
        onSendUpdateEmail={handleSendUpdateEmail}
      />
    </div>
  );
}
