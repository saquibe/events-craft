"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Phone, Calendar } from "lucide-react";
import { PaginatedTable } from "@/components/paginated-table";

interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: "Registered" | "Checked-in" | "Cancelled";
}

const mockAttendees: Attendee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    registrationDate: "2026-01-15",
    status: "Registered",
  },
];

export default function AttendeeByExhibitorPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (attendee: Attendee) => (
        <span className="font-medium text-foreground">{attendee.name}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (attendee: Attendee) => (
        <span className="text-muted-foreground">{attendee.email}</span>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (attendee: Attendee) => (
        <span className="text-muted-foreground">{attendee.phone}</span>
      ),
    },
    {
      key: "registrationDate",
      header: "Registration Date",
      cell: (attendee: Attendee) => (
        <span className="text-muted-foreground">
          {attendee.registrationDate}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (attendee: Attendee) => (
        <span
          className={`text-sm ${
            attendee.status === "Registered"
              ? "text-blue-600"
              : attendee.status === "Checked-in"
                ? "text-green-600"
                : "text-red-600"
          }`}
        >
          {attendee.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Attendee by Exhibitor
        </h2>
        <p className="text-muted-foreground">
          View attendees associated with exhibitors for Event #{eventId}
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
                <p className="text-sm text-muted-foreground">Total Attendees</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Mail className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Sent</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Phone className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contacts</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PaginatedTable
        data={mockAttendees}
        columns={columns}
        searchFields={["name", "email"]}
        searchPlaceholder="Search attendees..."
        emptyMessage="No attendees found"
        renderHeader={() => (
          <div>
            <h3 className="text-lg font-semibold">
              Attendees ({mockAttendees.length})
            </h3>
          </div>
        )}
      />
    </div>
  );
}
