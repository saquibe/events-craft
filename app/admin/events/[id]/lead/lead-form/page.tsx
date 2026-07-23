"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadFormSheet } from "@/components/admin/lead/LeadFormSheet";
import { Lead, LeadFormData } from "@/lib/types/lead";
import { LeadTable } from "@/components/admin/lead/LeadTable";
import { CreateButton } from "@/components/admin";

// Mock exhibitors
const mockExhibitors = [
  { id: "1", name: "AB Company" },
  { id: "2", name: "Tech Corp" },
  { id: "3", name: "Health Solutions" },
  { id: "4", name: "Innovation Labs" },
];

// Mock leads
const mockLeads: Lead[] = [
  {
    id: "1",
    prefix: "Mr.",
    firstName: "Mintu",
    lastName: "Nath",
    email: "m@n.com",
    mobile: "7331131070",
    exhibitorId: "1",
    exhibitorName: "AB Company",
    scannedAt: "2026-12-26T17:00:00",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    registrationId: "REG001",
  },
];

export default function LeadFormPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddLead = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const exhibitor = mockExhibitors.find((e) => e.id === data.exhibitorId);

      const newLead: Lead = {
        id: String(leads.length + 1),
        ...data,
        exhibitorName: exhibitor?.name,
        scannedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        registrationId: `REG${String(leads.length + 1).padStart(3, "0")}`,
      };

      setLeads([newLead, ...leads]);
    } catch (error) {
      console.error("Error adding lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Lead Form</h2>
          <p className="text-muted-foreground">
            Add and manage leads for Event #{eventId}
          </p>
        </div>
        <CreateButton label="Add Lead" onClick={() => setIsFormOpen(true)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <LeadTable leads={leads} onDelete={handleDeleteLead} />
        </CardContent>
      </Card>

      <LeadFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleAddLead}
        isSubmitting={isSubmitting}
        exhibitors={mockExhibitors}
      />
    </div>
  );
}
