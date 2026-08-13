// components/admin/accounting/InvoiceDetails.tsx
"use client";

import { Invoice } from "@/lib/types/accounting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Printer,
  Send,
  Edit,
  ArrowLeft,
  Calendar,
  Building,
  FileText,
  CreditCard,
  AlertCircle,
  MapPin,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

interface InvoiceDetailsProps {
  invoice: Invoice;
  onBack: () => void;
  onPrint: () => void;
  onDownload: () => void;
  onSend: () => void;
  onEdit?: () => void;
  onMarkAsPaid?: () => void;
}

// Dummy event images based on event name
const getEventImage = (eventName: string) => {
  const images = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=400&fit=crop",
  ];

  // Use event name to deterministically select an image
  const index = eventName.length % images.length;
  return images[index];
};

export function InvoiceDetails({
  invoice,
  onBack,
  onPrint,
  onDownload,
  onSend,
  onEdit,
  onMarkAsPaid,
}: InvoiceDetailsProps) {
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

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return <CreditCard className="h-4 w-4" />;
      case "Overdue":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const eventImage = getEventImage(invoice.eventName);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">
            Invoice #{invoice.id}
          </h2>
          <Badge
            className={`${getStatusColor(invoice.status)} flex items-center gap-1`}
          >
            {getStatusIcon(invoice.status)}
            {invoice.status}
          </Badge>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onPrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          {invoice.status === "Draft" && (
            <Button size="sm" onClick={onSend}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          )}
          {invoice.status === "Sent" && onMarkAsPaid && (
            <Button
              size="sm"
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={onMarkAsPaid}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      {/* Event Header with Image */}
      <Card className="overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={eventImage}
            alt={invoice.eventName}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-3xl font-bold">{invoice.eventName}</h2>
            <div className="flex flex-wrap items-center gap-6 mt-2">
              <span className="flex items-center gap-2 text-white/90">
                <CalendarDays className="h-4 w-4" />
                {format(new Date(invoice.startDate), "MMM dd, yyyy")}
              </span>
              {invoice.venue && (
                <span className="flex items-center gap-2 text-white/90">
                  <MapPin className="h-4 w-4" />
                  {invoice.venue}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Invoice Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Invoice ID</p>
              <p className="font-medium">{invoice.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">
                {format(new Date(invoice.startDate), "MMM dd, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tax Number</p>
              <p className="font-medium">{invoice.taxNo || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                className={`${getStatusColor(invoice.status)} flex items-center gap-1 w-fit`}
              >
                {getStatusIcon(invoice.status)}
                {invoice.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="font-medium">
                {format(new Date(invoice.createdAt), "MMM dd, yyyy HH:mm")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {format(new Date(invoice.updatedAt), "MMM dd, yyyy HH:mm")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Item Name</TableHead>
                  <TableHead className="min-w-[150px]">Description</TableHead>
                  <TableHead className="text-right">Unit</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items && invoice.items.length > 0 ? (
                  invoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{item.unit}</TableCell>
                      <TableCell className="text-right">
                        ${item.amount?.toFixed(2) || "0.00"}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${(item.unit * item.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No items in this invoice
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Totals */}
          <div className="flex flex-col items-end space-y-2 mt-4 pt-4 border-t">
            <div className="flex items-center gap-8">
              <span className="text-sm font-medium">Sub Total:</span>
              <span className="text-sm">
                ${invoice.subTotal?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-sm font-medium">Tax (10%):</span>
              <span className="text-sm">
                ${invoice.totalTax?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex items-center gap-8 border-t pt-2">
              <span className="text-base font-bold">Total:</span>
              <span className="text-base font-bold text-primary">
                ${invoice.total?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
