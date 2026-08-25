"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RSVPStatusTable } from "@/components/admin/rsvp/RSVPStatusTable";
import { RSVPFormSheet } from "@/components/admin/rsvp/RSVPFormSheet";
import { CreateButton } from "@/components/admin/common/CreateButton";

// Mock RSVP data
const mockRSVPs = [
  {
    id: "1",
    name: "Mintu Nath",
    email: "m@n.com",
    mobile: "7331131070",
    attendeeProfile: "Wedding Guest",
    rsvpStatus: "Yes",
    note: "Will attend with family",
    sendInvitation: true,
    confirmation: true,
  },
  {
    id: "2",
    name: "Adil A",
    email: "adil@a.com",
    mobile: "7271717171",
    attendeeProfile: "Corporate Guest",
    rsvpStatus: "No",
    note: "Unable to attend",
    sendInvitation: false,
    confirmation: false,
  },
];

export default function RSVPStatusPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [rsvps, setRsvps] = useState(mockRSVPs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRSVP, setEditingRSVP] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    if (editingRSVP) {
      setRsvps(
        rsvps.map((r) => (r.id === editingRSVP.id ? { ...r, ...data } : r)),
      );
    } else {
      const newRSVP = {
        id: String(rsvps.length + 1),
        ...data,
      };
      setRsvps([...rsvps, newRSVP]);
    }
    setIsFormOpen(false);
    setEditingRSVP(null);
  };

  const handleEdit = (rsvp: any) => {
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

  // Create status options for the dropdown
  const statusOptions = [
    { id: "yes", name: "Yes" },
    { id: "no", name: "No" },
    { id: "maybe", name: "Maybe" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">RSVP Status</h2>
          <p className="text-muted-foreground">
            Manage RSVP responses for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add RSVP"
          onClick={() => {
            setEditingRSVP(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <RSVPStatusTable
        rsvps={rsvps}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSendInvitation={handleSendInvitation}
      />

      <RSVPFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        rsvp={editingRSVP}
        statuses={statusOptions}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
