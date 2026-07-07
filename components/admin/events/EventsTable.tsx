"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import type { Event } from "../common/types";
import { formatDateRange } from "@/lib/date";
import { PaginatedTable } from "@/components/paginated-table";

interface EventsTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Event["status"]) => void;
}

export function EventsTable({
  events,
  onEdit,
  onDelete,
  onStatusChange,
}: EventsTableProps) {
  const columns = [
    {
      key: "event",
      header: "Event",
      cell: (event: Event) => (
        <div className="flex items-center gap-3">
          {event.eventLogo ? (
            <Image
              src={event.eventLogo}
              alt={event.eventName}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <span className="font-medium text-foreground text-base">
            {event.eventName}
          </span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (event: Event) => (
        <span className="text-muted-foreground text-base">
          {formatDateRange(event.startDateTime, event.endDateTime)}
        </span>
      ),
    },
    {
      key: "city",
      header: "City",
      cell: (event: Event) => (
        <span className="text-muted-foreground text-base">{event.city}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (event: Event) => (
        <span className="text-muted-foreground text-base">
          {event.eventType}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (event: Event) => <StatusBadge status={event.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (event: Event) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(event),
            },
            {
              label: "Suspend",
              icon: ActionIcons.suspend,
              onClick: () => onStatusChange(event.id, "Suspended"),
            },
            {
              label: "Draft",
              icon: ActionIcons.draft,
              onClick: () => onStatusChange(event.id, "Draft"),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={events}
      columns={columns}
      searchFields={["eventName"]}
      searchPlaceholder="Search events..."
      onRowClick={(event) => {
        window.location.href = `/admin/events/${event.id}`;
      }}
      emptyMessage="No events found"
    />
  );
}
