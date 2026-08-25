"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle, Clock, Calendar, Plus } from "lucide-react";
import { RSVP, RSVPStatus, RSVPStats } from "@/lib/types/rsvp";

const mockStats: RSVPStats = {
  totalRSVP: 45,
  confirmedRSVP: 28,
  pendingRSVP: 17,
  totalEvents: 8,
};

const mockStatuses: RSVPStatus[] = [
  { id: "1", name: "Yes", status: "Active", createdAt: "", updatedAt: "" },
  { id: "2", name: "No", status: "Active", createdAt: "", updatedAt: "" },
  { id: "3", name: "Maybe", status: "Active", createdAt: "", updatedAt: "" },
];

const mockRSVPs: RSVP[] = [
  {
    id: "1",
    name: "Mintu Nath",
    email: "m@n.com",
    mobile: "7331131070",
    attendeeProfile: "Wedding Guest",
    rsvpStatus: "Yes",
    note: "Will attend",
    sendInvitation: true,
    confirmation: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function RSVPDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [activeTab, setActiveTab] = useState("rsvp");
  const [rsvps, setRsvps] = useState<RSVP[]>(mockRSVPs);
  const [statuses] = useState<RSVPStatus[]>(mockStatuses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRSVP, setEditingRSVP] = useState<RSVP | null>(null);

  const statItems = [
    {
      title: "Total RSVP",
      value: mockStats.totalRSVP,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Confirmed",
      value: mockStats.confirmedRSVP,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: mockStats.pendingRSVP,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Total Events",
      value: mockStats.totalEvents,
      icon: Calendar,
      color: "bg-purple-500",
    },
  ];

  const handleSubmit = async (data: any) => {
    if (editingRSVP) {
      setRsvps(
        rsvps.map((r) =>
          r.id === editingRSVP.id
            ? { ...r, ...data, updatedAt: new Date().toISOString() }
            : r,
        ),
      );
    } else {
      const newRSVP: RSVP = {
        id: String(rsvps.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setRsvps([...rsvps, newRSVP]);
    }
    setIsFormOpen(false);
    setEditingRSVP(null);
  };

  const handleEdit = (rsvp: RSVP) => {
    setEditingRSVP(rsvp);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setRsvps(rsvps.filter((r) => r.id !== id));
  };

  const handleSendInvitation = (id: string) => {
    const rsvp = rsvps.find((r) => r.id === id);
    if (rsvp) {
      alert(`Invitation sent to ${rsvp.email}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">RSVP</h2>
        <p className="text-muted-foreground">
          Manage RSVPs for Event #{eventId}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      {/* <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="rsvp">RSVP Status</TabsTrigger>
          <TabsTrigger value="event-list">Event List</TabsTrigger>
          <TabsTrigger value="invitation-design">Invitation Design</TabsTrigger>
          <TabsTrigger value="scan-point">Scan Point</TabsTrigger>
          <TabsTrigger value="data-import">Data Import</TabsTrigger>
        </TabsList>

        <TabsContent value="rsvp" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => {
                setEditingRSVP(null);
                setIsFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add RSVP
            </Button>
          </div>
          <RSVPTable
            rsvps={rsvps}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSendInvitation={handleSendInvitation}
          />

          <RSVPFormSheet
            open={isFormOpen}
            onOpenChange={setIsFormOpen}
            rsvp={editingRSVP}
            statuses={statuses}
            onSubmit={handleSubmit}
          />
        </TabsContent>

        <TabsContent value="event-list" className="mt-6">
          <EventListTab />
        </TabsContent>

        <TabsContent value="invitation-design" className="mt-6">
          <InvitationDesignTab />
        </TabsContent>

        <TabsContent value="scan-point" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            <Button variant="outline" asChild>
              <a href={`/admin/events/${eventId}/check-in/scan-point`}>
                Go to Scan Point
              </a>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="data-import" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            <Button variant="outline" asChild>
              <a href={`/admin/events/${eventId}/check-in/data-import`}>
                Go to Data Import
              </a>
            </Button>
          </div>
        </TabsContent>
      </Tabs> */}
    </div>
  );
}
