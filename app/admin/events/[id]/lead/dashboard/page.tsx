"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LeadDashboard } from "@/components/admin/lead/LeadDashboard";
import { LeadTable } from "@/components/admin/lead/LeadTable";
import { LeadFormSheet } from "@/components/admin/lead/LeadFormSheet";
import { Lead, LeadStats, LeadFormData } from "@/lib/types/lead";
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
  {
    id: "2",
    prefix: "Ms.",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya@example.com",
    mobile: "9876543210",
    exhibitorId: "2",
    exhibitorName: "Tech Corp",
    scannedAt: "2026-12-26T15:30:00",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    registrationId: "REG002",
  },
  {
    id: "3",
    prefix: "Dr.",
    firstName: "Raj",
    lastName: "Kumar",
    email: "raj@example.com",
    mobile: "8765432109",
    exhibitorId: "3",
    exhibitorName: "Health Solutions",
    scannedAt: "2026-12-25T11:00:00",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    registrationId: "REG003",
  },
];

// Mock stats
const mockStats: LeadStats = {
  totalLeads: 24,
  todayLeads: 5,
  thisWeekLeads: 18,
  thisMonthLeads: 24,
  exhibitorsWithLeads: 6,
};

export default function LeadDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddLead = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
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

  const handleExportLeads = () => {
    // In real app, this would generate a CSV/Excel export
    console.log("Exporting leads...");
    alert("Leads exported successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Manage leads captured at Event #{eventId}
          </p>
        </div>
        <CreateButton label="Add Lead" onClick={() => setIsFormOpen(true)} />
      </div>

      <LeadDashboard stats={mockStats} />

      <div className="mt-8">
        <LeadTable
          leads={leads}
          onDelete={handleDeleteLead}
          onExport={handleExportLeads}
        />
      </div>

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
