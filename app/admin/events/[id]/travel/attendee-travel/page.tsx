"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AttendeeTravelTable } from "@/components/admin/travel/AttendeeTravelTable";
import { AttendeeTravelFormSheet } from "@/components/admin/travel/AttendeeTravelFormSheet";
import { AttendeeTravel, TravelAgent } from "@/lib/types/travel";
import { CreateButton } from "@/components/admin";

const mockAgents: TravelAgent[] = [
  {
    id: "1",
    name: "Agent A",
    email: "agentA@example.com",
    mobile: "1234567890",
    companyName: "Travel Co",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Agent B",
    email: "agentB@example.com",
    mobile: "0987654321",
    companyName: "Tour Co",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

const mockTravels: AttendeeTravel[] = [];

export default function AttendeeTravelPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [travels, setTravels] = useState<AttendeeTravel[]>(mockTravels);
  const [agents] = useState<TravelAgent[]>(mockAgents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTravel, setEditingTravel] = useState<AttendeeTravel | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingTravel) {
        setTravels(
          travels.map((t) =>
            t.id === editingTravel.id
              ? { ...t, ...data, updatedAt: new Date().toISOString() }
              : t,
          ),
        );
      } else {
        const newTravel: AttendeeTravel = {
          id: String(travels.length + 1),
          ...data,
          status: "Pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setTravels([...travels, newTravel]);
      }
    } catch (error) {
      console.error("Error saving travel:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingTravel(null);
    }
  };

  const handleEdit = (travel: AttendeeTravel) => {
    setEditingTravel(travel);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this travel record?")) {
      setTravels(travels.filter((t) => t.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: AttendeeTravel["status"]) => {
    setTravels(
      travels.map((t) =>
        t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendee Travel</h2>
          <p className="text-muted-foreground">
            Manage attendee travel arrangements for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Travel"
          onClick={() => {
            setEditingTravel(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <AttendeeTravelTable
        travels={travels}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <AttendeeTravelFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        travel={editingTravel}
        agents={agents}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
