"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InvoiceTable } from "@/components/admin/accounting/InvoiceTable";
import { InvoiceFormSheet } from "@/components/admin/accounting/InvoiceFormSheet";
import { InvoiceDetails } from "@/components/admin/accounting/InvoiceDetails";
import { Invoice } from "@/lib/types/accounting";
import { CreateButton } from "@/components/admin/common/CreateButton";

const mockInvoices: Invoice[] = [
  {
    id: "1",
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
    subTotal: 5500,
    totalTax: 550,
    total: 6050,
    status: "Draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
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
    ],
    subTotal: 3000,
    totalTax: 300,
    total: 3300,
    status: "Sent",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function InvoicesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingInvoice) {
        setInvoices(
          invoices.map((i) =>
            i.id === editingInvoice.id
              ? {
                  ...i,
                  ...data,
                  status: "Draft",
                  updatedAt: new Date().toISOString(),
                }
              : i,
          ),
        );
      } else {
        const newInvoice: Invoice = {
          id: String(invoices.length + 1),
          ...data,
          status: "Draft",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setInvoices([...invoices, newInvoice]);
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingInvoice(null);
    }
  };

  const handleView = (id: string) => {
    const invoice = invoices.find((i) => i.id === id);
    if (invoice) {
      setViewingInvoice(invoice);
    }
  };

  const handleEdit = (id: string) => {
    const invoice = invoices.find((i) => i.id === id);
    if (invoice) {
      setEditingInvoice(invoice);
      setIsFormOpen(true);
    }
  };

  const handlePrint = (id: string) => {
    alert(`Printing invoice ${id}`);
  };

  const handleDownload = (id: string) => {
    alert(`Downloading invoice ${id}`);
  };

  const handleSend = (id: string) => {
    const invoice = invoices.find((i) => i.id === id);
    if (invoice) {
      setInvoices(
        invoices.map((i) =>
          i.id === id
            ? { ...i, status: "Sent", updatedAt: new Date().toISOString() }
            : i,
        ),
      );
      alert(`Invoice ${id} sent successfully!`);
    }
  };

  const handleBack = () => {
    setViewingInvoice(null);
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
          onClick={() => {
            setEditingInvoice(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <InvoiceTable
        invoices={invoices}
        onView={handleView}
        onPrint={handlePrint}
        onDownload={handleDownload}
        onSend={handleSend}
        onEdit={handleEdit}
      />

      <InvoiceFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        invoice={editingInvoice}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
