"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Mail, CheckCircle, XCircle, Clock } from "lucide-react";
import { PaginatedTable } from "@/components/paginated-table";

// Mock email history data
const mockEmailHistory = [
  {
    id: "1",
    subject: "Welcome to Tech Conference 2026",
    recipient: "john@example.com",
    recipientName: "John Doe",
    sentAt: "2026-01-15T10:30:00",
    status: "sent",
    opens: 45,
    clicks: 12,
  },
  {
    id: "2",
    subject: "Speaker Invitation Letter",
    recipient: "sarah@example.com",
    recipientName: "Sarah Smith",
    sentAt: "2026-01-14T15:20:00",
    status: "opened",
    opens: 23,
    clicks: 8,
  },
  {
    id: "3",
    subject: "Agenda Published Notification",
    recipient: "mike@example.com",
    recipientName: "Mike Johnson",
    sentAt: "2026-01-13T09:15:00",
    status: "failed",
    opens: 0,
    clicks: 0,
  },
];

export default function EmailHistoryPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge color="success">Sent</Badge>;
      case "opened":
        return <Badge color="warning">Opened</Badge>;
      case "clicked":
        return <Badge color="success">Clicked</Badge>;
      case "failed":
        return <Badge color="destructive">Failed</Badge>;
      default:
        return <Badge color="secondary">Unknown</Badge>;
    }
  };

  const columns = [
    {
      key: "subject",
      header: "Subject",
      cell: (item: any) => (
        <span className="font-medium text-foreground text-base">
          {item.subject}
        </span>
      ),
    },
    {
      key: "recipient",
      header: "Recipient",
      cell: (item: any) => (
        <div>
          <p className="text-base font-medium">{item.recipientName}</p>
          <p className="text-sm text-muted-foreground">{item.recipient}</p>
        </div>
      ),
    },
    {
      key: "sentAt",
      header: "Sent At",
      cell: (item: any) => (
        <span className="text-muted-foreground text-base">
          {new Date(item.sentAt).toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item: any) => getStatusBadge(item.status),
    },
    {
      key: "opens",
      header: "Opens",
      cell: (item: any) => (
        <span className="text-muted-foreground text-base">{item.opens}</span>
      ),
    },
    {
      key: "clicks",
      header: "Clicks",
      cell: (item: any) => (
        <span className="text-muted-foreground text-base">{item.clicks}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (item: any) => (
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Email History</h2>
          <p className="text-muted-foreground">
            View all sent emails for Event #{eventId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-base">
            <Mail className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold">142</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Opened</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">14</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email History Table */}
      <PaginatedTable
        data={mockEmailHistory}
        columns={columns}
        searchFields={["subject", "recipient", "recipientName"]}
        searchPlaceholder="Search email history..."
        emptyMessage="No emails found"
        renderHeader={() => (
          <div>
            <h3 className="text-lg font-semibold">
              Email History ({mockEmailHistory.length})
            </h3>
          </div>
        )}
      />
    </div>
  );
}
