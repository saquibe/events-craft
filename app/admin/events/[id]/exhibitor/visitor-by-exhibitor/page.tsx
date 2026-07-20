"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Phone, Calendar } from "lucide-react";
import { PaginatedTable } from "@/components/paginated-table";

interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  status: "Visited" | "Scheduled" | "Cancelled";
}

const mockVisitors: Visitor[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 891",
    visitDate: "2026-01-16",
    status: "Scheduled",
  },
];

export default function VisitorByExhibitorPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (visitor: Visitor) => (
        <span className="font-medium text-foreground">{visitor.name}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (visitor: Visitor) => (
        <span className="text-muted-foreground">{visitor.email}</span>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (visitor: Visitor) => (
        <span className="text-muted-foreground">{visitor.phone}</span>
      ),
    },
    {
      key: "visitDate",
      header: "Visit Date",
      cell: (visitor: Visitor) => (
        <span className="text-muted-foreground">{visitor.visitDate}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (visitor: Visitor) => (
        <span
          className={`text-sm ${
            visitor.status === "Visited"
              ? "text-green-600"
              : visitor.status === "Scheduled"
                ? "text-blue-600"
                : "text-red-600"
          }`}
        >
          {visitor.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Visitor by Exhibitor
        </h2>
        <p className="text-muted-foreground">
          View visitors associated with exhibitors for Event #{eventId}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Visitors</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visited</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Mail className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PaginatedTable
        data={mockVisitors}
        columns={columns}
        searchFields={["name", "email"]}
        searchPlaceholder="Search visitors..."
        emptyMessage="No visitors found"
        renderHeader={() => (
          <div>
            <h3 className="text-lg font-semibold">
              Visitors ({mockVisitors.length})
            </h3>
          </div>
        )}
      />
    </div>
  );
}
