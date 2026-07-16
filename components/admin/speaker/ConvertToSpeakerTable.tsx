"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../common/StatusBadge";
import type { ConvertToSpeakerData } from "@/lib/types/speaker";
import { UserPlus, Edit } from "lucide-react";
import { PaginatedTable } from "@/components/paginated-table";

interface ConvertToSpeakerTableProps {
  attendees: ConvertToSpeakerData[];
  onConvert: (id: string) => void;
  onEdit: (id: string) => void;
}

export function ConvertToSpeakerTable({
  attendees,
  onConvert,
  onEdit,
}: ConvertToSpeakerTableProps) {
  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (attendee: ConvertToSpeakerData) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${attendee.name}`}
            />
            <AvatarFallback>
              {attendee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground text-base">
            {attendee.name}
          </span>
        </div>
      ),
    },
    {
      key: "registration",
      header: "Registration",
      cell: (attendee: ConvertToSpeakerData) => (
        <span className="text-muted-foreground text-base">
          {attendee.registration}
        </span>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (attendee: ConvertToSpeakerData) => (
        <span className="text-muted-foreground text-base">
          {attendee.email}
        </span>
      ),
    },
    {
      key: "mobile",
      header: "Mobile",
      cell: (attendee: ConvertToSpeakerData) => (
        <span className="text-muted-foreground text-base">
          {attendee.mobile}
        </span>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      cell: (attendee: ConvertToSpeakerData) => (
        <span className="text-muted-foreground text-base">
          {attendee.designation}
        </span>
      ),
    },
    {
      key: "company",
      header: "Company",
      cell: (attendee: ConvertToSpeakerData) => (
        <span className="text-muted-foreground text-base">
          {attendee.company}
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (attendee: ConvertToSpeakerData) => (
        <StatusBadge status={attendee.type as any} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (attendee: ConvertToSpeakerData) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(attendee.id)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            onClick={() => onConvert(attendee.id)}
            color="primary"
            className="cursor-pointer"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Convert
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PaginatedTable
      data={attendees}
      columns={columns}
      searchFields={["name", "email", "designation", "company"]}
      searchPlaceholder="Search attendees..."
      emptyMessage="No attendees found to convert"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Convert to Speaker ({attendees.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Convert registered attendees to speakers
          </p>
        </div>
      )}
    />
  );
}
