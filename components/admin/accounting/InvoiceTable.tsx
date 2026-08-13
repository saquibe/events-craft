// components/admin/accounting/InvoiceTable.tsx
"use client";

import { Invoice } from "@/lib/types/accounting";
import { PaginatedTable } from "@/components/paginated-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
  Printer,
  Send,
  Pencil,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InvoiceTableProps {
  invoices: Invoice[];
  onView: (id: string) => void;
  onPrint: (id: string) => void;
  onDownload: (id: string) => void;
  onSend: (id: string) => void;
  onEdit?: (id: string) => void;
  onMarkAsPaid?: (id: string) => void;
}

export function InvoiceTable({
  invoices,
  onView,
  onPrint,
  onDownload,
  onSend,
  onEdit,
  onMarkAsPaid,
}: InvoiceTableProps) {
  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "Draft":
        return "bg-gray-500/10 text-gray-600 border-gray-200 hover:bg-gray-500/20";
      case "Sent":
        return "bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20";
      case "Paid":
        return "bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/20";
      case "Overdue":
        return "bg-red-500/10 text-red-600 border-red-200 hover:bg-red-500/20";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return <CreditCard className="h-3 w-3" />;
      case "Overdue":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  // Calculate item count
  const getItemCount = (invoice: Invoice) => {
    return invoice.items?.length || 0;
  };

  const columns = [
    {
      key: "invoiceInfo",
      header: "Invoice Info",
      cell: (invoice: Invoice) => (
        <div className="space-y-1">
          <div className="font-medium text-foreground">#{invoice.id}</div>
          <div className="text-sm text-muted-foreground">
            {invoice.eventName}
          </div>
          <div className="text-xs text-muted-foreground">
            {getItemCount(invoice)} item{getItemCount(invoice) !== 1 ? "s" : ""}
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (invoice: Invoice) => (
        <div className="text-sm">
          {format(new Date(invoice.startDate), "MMM dd, yyyy")}
        </div>
      ),
    },
    {
      key: "amounts",
      header: "Amounts",
      cell: (invoice: Invoice) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Subtotal:</span>
            <span className="text-sm">
              ${invoice.subTotal?.toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Tax:</span>
            <span className="text-sm">
              ${invoice.totalTax?.toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-sm">Total:</span>
            <span className="text-base text-primary">
              ${invoice.total?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (invoice: Invoice) => (
        <Badge
          className={`${getStatusColor(invoice.status)} flex items-center gap-1`}
        >
          {getStatusIcon(invoice.status)}
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
          {/* View Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(invoice.id)}
                  // className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Invoice</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Print Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPrint(invoice.id)}
                  // className="h-8 w-8 p-0"
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Print Invoice</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Edit Button */}
          {/* {onEdit && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(invoice.id)}
                    // className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Invoice</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )} */}

          {/* Download Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownload(invoice.id)}
                  // className="h-8 w-8 p-0"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download PDF</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Send Button - Only for Draft */}
          {/* {invoice.status === "Draft" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSend(invoice.id)}
                    // className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send Invoice</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )} */}

          {/* Mark as Paid Button - Only for Sent */}
          {/* {invoice.status === "Sent" && onMarkAsPaid && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMarkAsPaid(invoice.id)}
                    // className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                  >
                    <CreditCard className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mark as Paid</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )} */}
        </div>
      ),
    },
  ];

  // Summary statistics
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
  const draftCount = invoices.filter((inv) => inv.status === "Draft").length;
  const sentCount = invoices.filter((inv) => inv.status === "Sent").length;
  const paidCount = invoices.filter((inv) => inv.status === "Paid").length;
  const overdueCount = invoices.filter(
    (inv) => inv.status === "Overdue",
  ).length;

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Total Invoices</div>
          <div className="text-2xl font-bold">{totalInvoices}</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Total Amount</div>
          <div className="text-2xl font-bold text-primary">
            ${totalAmount.toFixed(2)}
          </div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Draft</div>
          <div className="text-2xl font-bold text-gray-600">{draftCount}</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Sent</div>
          <div className="text-2xl font-bold text-blue-600">{sentCount}</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Paid</div>
          <div className="text-2xl font-bold text-green-600">{paidCount}</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Overdue</div>
          <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
        </div>
      </div>

      <PaginatedTable
        data={invoices}
        columns={columns}
        searchFields={["eventName", "id"]}
        searchPlaceholder="Search invoices by event name or invoice number..."
        emptyMessage="No invoices found. Create your first invoice to get started."
        renderHeader={() => (
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                All Invoices ({invoices.length})
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage and track all your invoices
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
}
