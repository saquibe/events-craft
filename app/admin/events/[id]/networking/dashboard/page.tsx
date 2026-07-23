"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NetworkingDashboard } from "@/components/admin/networking/NetworkingDashboard";
import { MeetingsTable } from "@/components/admin/networking/MeetingsTable";
import { ScheduleMeetingFormSheet } from "@/components/admin/networking/ScheduleMeetingFormSheet";
import { Meeting } from "@/lib/types/networking";
import { CreateButton } from "@/components/admin";

// Mock stats
const mockStats = {
  totalMeetings: 24,
  pendingMeetings: 8,
  confirmedMeetings: 12,
  rejectedMeetings: 4,
  totalLocations: 6,
  totalTimeSlots: 10,
};

// Mock meetings
const mockMeetings: Meeting[] = [];

export default function NetworkingDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = (id: string) => {
    setMeetings(
      meetings.map((m) =>
        m.id === id
          ? { ...m, status: "Confirmed", updatedAt: new Date().toISOString() }
          : m,
      ),
    );
  };

  const handleReject = (id: string) => {
    setMeetings(
      meetings.map((m) =>
        m.id === id
          ? { ...m, status: "Rejected", updatedAt: new Date().toISOString() }
          : m,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  const handleScheduleMeeting = async (data: any) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data for new meeting
      const mockUsers = [
        { id: "1", name: "Mintu Nath", email: "abc@abc.com", type: "Attendee" },
        { id: "2", name: "Adil", email: "adil@a.com", type: "Exhibitor" },
      ];

      const sender = mockUsers.find((u) => u.id === data.senderId);
      const receiver = mockUsers.find((u) => u.id === data.receiverId);

      const mockLocations = [
        { id: "1", name: "Hall A" },
        { id: "2", name: "Hall B" },
      ];
      const location = mockLocations.find((l) => l.id === data.locationId);

      const mockTimeSlots = [
        {
          id: "1",
          startDateTime: "2026-01-15T10:00:00",
          endDateTime: "2026-01-15T10:15:00",
        },
        {
          id: "2",
          startDateTime: "2026-01-15T10:30:00",
          endDateTime: "2026-01-15T10:45:00",
        },
      ];
      const timeSlot = mockTimeSlots.find((t) => t.id === data.timeSlotId);

      const newMeeting: Meeting = {
        id: String(meetings.length + 1),
        senderId: data.senderId,
        senderName: sender?.name || "Unknown",
        senderEmail: sender?.email || "",
        senderType: "Attendee",
        receiverId: data.receiverId,
        receiverName: receiver?.name || "Unknown",
        receiverEmail: receiver?.email || "",
        receiverType: "Exhibitor",
        locationId: data.locationId,
        location: {
          id: data.locationId,
          name: location?.name || "",
          status: "Active",
          createdAt: "",
          updatedAt: "",
        },
        timeSlotId: data.timeSlotId,
        timeSlot: {
          id: data.timeSlotId,
          startDateTime: timeSlot?.startDateTime || "",
          endDateTime: timeSlot?.endDateTime || "",
          status: "Active",
          createdAt: "",
          updatedAt: "",
        },
        status: "Pending",
        message: data.message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setMeetings([...meetings, newMeeting]);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Networking Dashboard
          </h2>
          <p className="text-muted-foreground">
            Overview of networking activities for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Schedule Meeting"
          onClick={() => setIsFormOpen(true)}
        />
      </div>

      <NetworkingDashboard stats={mockStats} />

      <div className="mt-8">
        <MeetingsTable
          meetings={meetings}
          onConfirm={handleConfirm}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      </div>

      <ScheduleMeetingFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleScheduleMeeting}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
