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
import { Download, Printer, Send, Edit, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface InvoiceDetailsProps {
  invoice: Invoice;
  onBack: () => void;
  onPrint: () => void;
  onDownload: () => void;
  onSend: () => void;
  onEdit?: () => void;
}

export function InvoiceDetails({
  invoice,
  onBack,
  onPrint,
  onDownload,
  onSend,
  onEdit,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">
            Invoice #{invoice.id}
          </h2>
          <Badge className={getStatusColor(invoice.status)}>
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
        </div>
      </div>

      {/* Invoice Details */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Event Name</p>
              <p className="font-medium">{invoice.eventName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tax No.</p>
              <p className="font-medium">{invoice.taxNo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">
                {format(new Date(invoice.startDate), "MMM dd, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">End Date</p>
              <p className="font-medium">
                {format(new Date(invoice.endDate), "MMM dd, yyyy")}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Venue</p>
              <p className="font-medium">{invoice.venue}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Unit</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.unit}</TableCell>
                  <TableCell className="text-right">${item.amount}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${(item.unit * item.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col items-end space-y-2 mt-4 pt-4 border-t">
            <div className="flex items-center gap-8">
              <span className="text-sm font-medium">Sub Total:</span>
              <span className="text-sm">${invoice.subTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-sm font-medium">Tax (10%):</span>
              <span className="text-sm">${invoice.totalTax.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-8 border-t pt-2">
              <span className="text-base font-bold">Total:</span>
              <span className="text-base font-bold text-primary">
                ${invoice.total.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
