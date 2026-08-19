"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TravelEnquiriesTable } from "@/components/admin/travel/TravelEnquiriesTable";
import { TravelEnquiryFormSheet } from "@/components/admin/travel/TravelEnquiryFormSheet";
import { TravelEnquiry, TravelAgent } from "@/lib/types/travel";
import { CreateButton } from "@/components/admin";

const mockAgents: TravelAgent[] = [
  {
    id: "1",
    name: "Agent A",
    email: "agentA@example.com",
    mobile: "1234567890",
    companyName: "Travel Co",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Agent B",
    email: "agentB@example.com",
    mobile: "0987654321",
    companyName: "Tour Co",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

const mockEnquiries: TravelEnquiry[] = [
  {
    id: "1",
    name: "Mintu Nath",
    email: "m@n.com",
    regNo: "REG001",
    pickupDateTime: "2026-01-15T10:00:00",
    pickupLocation: "HITEX, Hyderabad",
    dropLocation: "Hyderabad Airport",
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Adil A",
    email: "adil@a.com",
    regNo: "REG002",
    pickupDateTime: "2026-01-15T14:30:00",
    pickupLocation: "Jio Convention Centre, Mumbai",
    dropLocation: "Mumbai Airport",
    status: "Assigned",
    travelAgentId: "1",
    travelAgent: mockAgents[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function TravelEnquiriesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [enquiries, setEnquiries] = useState<TravelEnquiry[]>(mockEnquiries);
  const [agents] = useState<TravelAgent[]>(mockAgents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState<TravelEnquiry | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingEnquiry) {
        setEnquiries(
          enquiries.map((e) =>
            e.id === editingEnquiry.id
              ? { ...e, ...data, updatedAt: new Date().toISOString() }
              : e,
          ),
        );
      } else {
        const newEnquiry: TravelEnquiry = {
          id: String(enquiries.length + 1),
          ...data,
          status: "Pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setEnquiries([...enquiries, newEnquiry]);
      }
    } catch (error) {
      console.error("Error saving enquiry:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingEnquiry(null);
    }
  };

  const handleAssignAgent = (id: string, agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    setEnquiries(
      enquiries.map((e) =>
        e.id === id
          ? {
              ...e,
              travelAgentId: agentId,
              travelAgent: agent,
              status: "Assigned",
              updatedAt: new Date().toISOString(),
            }
          : e,
      ),
    );
    alert(`Agent ${agent?.name} assigned successfully!`);
  };

  const handleEdit = (enquiry: TravelEnquiry) => {
    setEditingEnquiry(enquiry);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      setEnquiries(enquiries.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Travel Enquiries
          </h2>
          <p className="text-muted-foreground">
            Manage travel enquiries for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Enquiry"
          onClick={() => {
            setEditingEnquiry(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <TravelEnquiriesTable
        enquiries={enquiries}
        agents={agents}
        onAssignAgent={handleAssignAgent}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TravelEnquiryFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        enquiry={editingEnquiry}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
