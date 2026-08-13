// app/admin/events/[id]/accounting/invoices/[invoiceId]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { InvoiceDetails } from "@/components/admin/accounting/InvoiceDetails";
import { Invoice } from "@/lib/types/accounting";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id as string;
  const invoiceId = params?.invoiceId as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load invoice from localStorage
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      try {
        const invoices = JSON.parse(storedInvoices);
        const found = invoices.find((inv: Invoice) => inv.id === invoiceId);
        setInvoice(found || null);
      } catch (e) {
        console.error("Error loading invoice:", e);
      }
    }
    setLoading(false);
  }, [invoiceId]);

  const handleBack = () => {
    router.push(`/admin/events/${eventId}/accounting/invoices`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Downloading invoice ${invoiceId}`);
  };

  const handleSend = () => {
    if (!invoice) return;
    // Update invoice status in localStorage
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      try {
        const invoices = JSON.parse(storedInvoices);
        const updated = invoices.map((inv: Invoice) =>
          inv.id === invoiceId
            ? {
                ...inv,
                status: "Sent" as const,
                updatedAt: new Date().toISOString(),
              }
            : inv,
        );
        localStorage.setItem("invoices", JSON.stringify(updated));
        setInvoice({ ...invoice, status: "Sent" });
        alert(`Invoice ${invoiceId} sent successfully!`);
      } catch (e) {
        console.error("Error updating invoice:", e);
      }
    }
  };

  const handleEdit = () => {
    router.push(
      `/admin/events/${eventId}/accounting/invoices/${invoiceId}/edit`,
    );
  };

  const handleMarkAsPaid = () => {
    if (!invoice) return;
    // Update invoice status in localStorage
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      try {
        const invoices = JSON.parse(storedInvoices);
        const updated = invoices.map((inv: Invoice) =>
          inv.id === invoiceId
            ? {
                ...inv,
                status: "Paid" as const,
                updatedAt: new Date().toISOString(),
              }
            : inv,
        );
        localStorage.setItem("invoices", JSON.stringify(updated));
        setInvoice({ ...invoice, status: "Paid" });
        alert(`Invoice ${invoiceId} marked as paid!`);
      } catch (e) {
        console.error("Error updating invoice:", e);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold mb-2">Invoice Not Found</h3>
          <p className="text-muted-foreground mb-4">
            The invoice you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={handleBack}>Back to Invoices</Button>
        </div>
      </div>
    );
  }

  return (
    <InvoiceDetails
      invoice={invoice}
      onBack={handleBack}
      onPrint={handlePrint}
      onDownload={handleDownload}
      onSend={handleSend}
      onEdit={handleEdit}
      onMarkAsPaid={handleMarkAsPaid}
    />
  );
}
