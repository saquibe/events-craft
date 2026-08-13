// app/admin/events/[id]/accounting/invoices/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { InvoiceTable } from "@/components/admin/accounting/InvoiceTable";
import { InvoiceDetails } from "@/components/admin/accounting/InvoiceDetails";
import { Invoice } from "@/lib/types/accounting";
import { CreateButton } from "@/components/admin/common/CreateButton";
import { Plus } from "lucide-react";

// Initial mock data
const initialMockInvoices: Invoice[] = [
  {
    id: "INV-2026-001",
    eventName: "Medical Conference 2026",
    startDate: "2026-01-15",
    endDate: "2026-01-17",
    venue: "HITEX, Hyderabad",
    taxNo: "TAX12345",
    items: [
      {
        name: "Sponsorship Package",
        description: "Gold Sponsorship",
        unit: 1,
        amount: 5000,
      },
      {
        name: "Banner Display",
        description: "Main Hall Banner",
        unit: 2,
        amount: 500,
      },
    ],
    subTotal: 6000,
    totalTax: 600,
    total: 6600,
    status: "Draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "INV-2026-002",
    eventName: "Tech Summit 2026",
    startDate: "2026-02-10",
    endDate: "2026-02-12",
    venue: "Jio Convention Centre, Mumbai",
    taxNo: "TAX67890",
    items: [
      {
        name: "Exhibition Booth",
        description: "Standard Booth",
        unit: 1,
        amount: 3000,
      },
      {
        name: "Speaking Slot",
        description: "Keynote Session",
        unit: 1,
        amount: 2000,
      },
    ],
    subTotal: 5000,
    totalTax: 500,
    total: 5500,
    status: "Sent",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function InvoicesPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = (params?.id as string) || "";
  const [invoices, setInvoices] = useState<Invoice[]>(initialMockInvoices);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);

  // Load invoices from localStorage on mount
  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      try {
        const parsed = JSON.parse(storedInvoices);
        if (parsed.length > 0) {
          setInvoices(parsed);
        }
      } catch (e) {
        console.error("Error loading invoices from storage:", e);
      }
    }
  }, []);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const handleView = (id: string) => {
    router.push(`/admin/events/${eventId}/accounting/invoices/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/events/${eventId}/accounting/invoices/${id}/edit`);
  };

  const handleCreate = () => {
    router.push(`/admin/events/${eventId}/accounting/invoices/create`);
  };

  const handlePrint = (id: string) => {
    window.print();
  };

  const handleDownload = (id: string) => {
    alert(`Downloading invoice ${id}`);
  };

  const handleSend = (id: string) => {
    setInvoices(
      invoices.map((i) =>
        i.id === id
          ? { ...i, status: "Sent", updatedAt: new Date().toISOString() }
          : i,
      ),
    );
    alert(`Invoice ${id} sent successfully!`);
  };

  const handleMarkAsPaid = (id: string) => {
    setInvoices(
      invoices.map((i) =>
        i.id === id
          ? { ...i, status: "Paid", updatedAt: new Date().toISOString() }
          : i,
      ),
    );
    alert(`Invoice ${id} marked as paid!`);
  };

  const handleBack = () => {
    setViewingInvoice(null);
  };

  // Function to add a new invoice (called from the form)
  const addInvoice = (newInvoice: Invoice) => {
    setInvoices([...invoices, newInvoice]);
  };

  if (viewingInvoice) {
    return (
      <InvoiceDetails
        invoice={viewingInvoice}
        onBack={handleBack}
        onPrint={() => handlePrint(viewingInvoice.id)}
        onDownload={() => handleDownload(viewingInvoice.id)}
        onSend={() => handleSend(viewingInvoice.id)}
        onEdit={() => handleEdit(viewingInvoice.id)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">
            Manage sponsor invoices for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Create Invoice"
          onClick={handleCreate}
          // icon={<Plus className="h-4 w-4" />}
        />
      </div>

      <InvoiceTable
        invoices={invoices}
        onView={handleView}
        onPrint={handlePrint}
        onDownload={handleDownload}
        onSend={handleSend}
        onEdit={handleEdit}
        onMarkAsPaid={handleMarkAsPaid}
      />
    </div>
  );
}
