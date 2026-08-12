"use client";

import { Invoice } from "@/lib/types/accounting";
import { PaginatedTable } from "@/components/paginated-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, Printer, Send } from "lucide-react";
import { format } from "date-fns";

interface InvoiceTableProps {
  invoices: Invoice[];
  onView: (id: string) => void;
  onPrint: (id: string) => void;
  onDownload: (id: string) => void;
  onSend: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function InvoiceTable({
  invoices,
  onView,
  onPrint,
  onDownload,
  onSend,
  onEdit,
}: InvoiceTableProps) {
  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "Draft":
        return "bg-gray-500/10 text-gray-600 border-gray-200";
      case "Sent":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "Paid":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "Overdue":
        return "bg-red-500/10 text-red-600 border-red-200";
      default:
        return "";
    }
  };

  const columns = [
    {
      key: "eventName",
      header: "Event Name",
      cell: (invoice: Invoice) => (
        <span className="font-medium text-foreground text-base">
          {invoice.eventName}
        </span>
      ),
    },
    {
      key: "dates",
      header: "Dates",
      cell: (invoice: Invoice) => (
        <div>
          <p className="text-muted-foreground text-base">
            {format(new Date(invoice.startDate), "MMM dd, yyyy")}
          </p>
          <p className="text-muted-foreground text-base">
            to {format(new Date(invoice.endDate), "MMM dd, yyyy")}
          </p>
        </div>
      ),
    },
    {
      key: "venue",
      header: "Venue",
      cell: (invoice: Invoice) => (
        <span className="text-muted-foreground text-base">{invoice.venue}</span>
      ),
    },
    {
      key: "taxNo",
      header: "Tax No.",
      cell: (invoice: Invoice) => (
        <span className="text-muted-foreground text-base font-mono">
          {invoice.taxNo}
        </span>
      ),
    },
    {
      key: "total",
      header: "Total",
      cell: (invoice: Invoice) => (
        <span className="font-semibold text-base">${invoice.total}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (invoice: Invoice) => (
        <Badge className={getStatusColor(invoice.status)}>
          {invoice.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (invoice: Invoice) => (
        <div className="flex items-center justify-end gap-1">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(invoice.id)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => onView(invoice.id)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onPrint(invoice.id)}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDownload(invoice.id)}
          >
            <Download className="h-4 w-4" />
          </Button>
          {invoice.status === "Draft" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSend(invoice.id)}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <PaginatedTable
      data={invoices}
      columns={columns}
      searchFields={["eventName", "venue", "taxNo"]}
      searchPlaceholder="Search invoices..."
      emptyMessage="No invoices found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            All Invoices ({invoices.length})
          </h3>
        </div>
      )}
    />
  );
}
