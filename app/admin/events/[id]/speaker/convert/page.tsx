"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import type { ConvertToSpeakerData } from "@/lib/types/speaker";
import { ConvertToSpeakerTable } from "@/components/admin/speaker/ConvertToSpeakerTable";

const mockAttendees: ConvertToSpeakerData[] = [
  {
    id: "1",
    name: "Dr TES",
    registration: "REG034",
    email: "abc@abc.com",
    mobile: "7331131070",
    designation: "Resident Dr",
    company: "XYZ Hospital",
    type: "Attendee",
    status: "Registered",
  },
  {
    id: "2",
    name: "Dr WIAN",
    registration: "Pending Registration",
    email: "wer@wer.com",
    mobile: "7271717171",
    designation: "Sr Dr",
    company: "OIY Hospital",
    type: "Attendee",
    status: "Pending Registration",
  },
];

export default function ConvertToSpeakerPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [attendees, setAttendees] =
    useState<ConvertToSpeakerData[]>(mockAttendees);

  const handleConvert = (id: string) => {
    console.log("Convert attendee to speaker:", id);
    // Update the attendee type
    setAttendees(
      attendees.map((a) => (a.id === id ? { ...a, type: "Speaker" } : a)),
    );
  };

  const handleEdit = (id: string) => {
    console.log("Edit attendee:", id);
    // Open edit form
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Convert to Speaker
        </h2>
        <p className="text-muted-foreground">
          Convert registered attendees to speakers for Event #{eventId}
        </p>
      </div>

      <ConvertToSpeakerTable
        attendees={attendees}
        onConvert={handleConvert}
        onEdit={handleEdit}
      />
    </div>
  );
}
