"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MeetingsTable } from "@/components/admin/networking/MeetingsTable";
import { MeetingRequestsTable } from "@/components/admin/networking/MeetingRequestsTable";
import { ScheduleMeetingFormSheet } from "@/components/admin/networking/ScheduleMeetingFormSheet";
import { Meeting } from "@/lib/types/networking";
import { CreateButton } from "@/components/admin";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

// Mock meetings
const mockMeetings: Meeting[] = [
  {
    id: "1",
    senderId: "1",
    senderName: "Mintu Nath",
    senderEmail: "abc@abc.com",
    senderType: "Attendee",
    receiverId: "2",
    receiverName: "Adil",
    receiverEmail: "adil@a.com",
    receiverType: "Exhibitor",
    locationId: "1",
    location: {
      id: "1",
      name: "Hall A",
      status: "Active",
      createdAt: "",
      updatedAt: "",
    },
    timeSlotId: "1",
    timeSlot: {
      id: "1",
      startDateTime: "2026-01-15T10:00:00",
      endDateTime: "2026-01-15T10:15:00",
      status: "Active",
      createdAt: "",
      updatedAt: "",
    },
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    senderId: "3",
    senderName: "Attendee User",
    senderEmail: "attendee@example.com",
    senderType: "Attendee",
    receiverId: "4",
    receiverName: "Exhibitor User",
    receiverEmail: "exhibitor@example.com",
    receiverType: "Exhibitor",
    locationId: "1",
    location: {
      id: "1",
      name: "Hall A",
      status: "Active",
      createdAt: "",
      updatedAt: "",
    },
    timeSlotId: "2",
    timeSlot: {
      id: "2",
      startDateTime: "2026-01-15T10:30:00",
      endDateTime: "2026-01-15T10:45:00",
      status: "Active",
      createdAt: "",
      updatedAt: "",
    },
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    senderId: "5",
    senderName: "Another User",
    senderEmail: "user@example.com",
    senderType: "Delegate",
    receiverId: "6",
    receiverName: "Speaker User",
    receiverEmail: "speaker@example.com",
    receiverType: "Speaker",
    locationId: "2",
    location: {
      id: "2",
      name: "Hall B",
      status: "Active",
      createdAt: "",
      updatedAt: "",
    },
    timeSlotId: "3",
    timeSlot: {
      id: "3",
      startDateTime: "2026-01-15T11:00:00",
      endDateTime: "2026-01-15T11:15:00",
      status: "Active",
      createdAt: "",
      updatedAt: "",
    },
    status: "Rejected",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function MeetingsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pendingMeetings = meetings.filter((m) => m.status === "Pending");
  const rejectedMeetings = meetings.filter((m) => m.status === "Rejected");

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

      // Find sender and receiver names
      const mockUsers = [
        { id: "1", name: "Mintu Nath", email: "abc@abc.com", type: "Attendee" },
        { id: "2", name: "Adil", email: "adil@a.com", type: "Exhibitor" },
        {
          id: "3",
          name: "Attendee User",
          email: "attendee@example.com",
          type: "Attendee",
        },
        {
          id: "4",
          name: "Exhibitor User",
          email: "exhibitor@example.com",
          type: "Exhibitor",
        },
        {
          id: "5",
          name: "Speaker User",
          email: "speaker@example.com",
          type: "Speaker",
        },
        {
          id: "6",
          name: "Delegate User",
          email: "delegate@example.com",
          type: "Delegate",
        },
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

      // Create new meeting
      const newMeeting: Meeting = {
        id: String(meetings.length + 1),
        senderId: data.senderId,
        senderName: sender?.name || "Unknown",
        senderEmail: sender?.email || "",
        senderType: (sender?.type as any) || "Attendee",
        receiverId: data.receiverId,
        receiverName: receiver?.name || "Unknown",
        receiverEmail: receiver?.email || "",
        receiverType: (receiver?.type as any) || "Attendee",
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
          <h2 className="text-2xl font-bold tracking-tight">Meetings</h2>
          <p className="text-muted-foreground">
            Manage networking meetings for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Schedule Meeting"
          onClick={() => setIsFormOpen(true)}
        />
      </div>

      <SimpleTabs defaultValue="all" className="w-full">
        <SimpleTabsList>
          <SimpleTabsTrigger value="all">All Meetings</SimpleTabsTrigger>

          <SimpleTabsTrigger value="pending">
            Pending Requests ({pendingMeetings.length})
          </SimpleTabsTrigger>

          <SimpleTabsTrigger value="rejected">
            Rejected Requests ({rejectedMeetings.length})
          </SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="all">
          <MeetingsTable
            meetings={meetings}
            onConfirm={handleConfirm}
            onReject={handleReject}
            onDelete={handleDelete}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="pending">
          <MeetingRequestsTable
            meetings={pendingMeetings}
            type="pending"
            onConfirm={handleConfirm}
            onReject={handleReject}
            onDelete={handleDelete}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="rejected">
          <MeetingRequestsTable
            meetings={rejectedMeetings}
            type="rejected"
            onDelete={handleDelete}
          />
        </SimpleTabsContent>
      </SimpleTabs>

      {/* Schedule Meeting Form Sheet */}
      <ScheduleMeetingFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleScheduleMeeting}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
