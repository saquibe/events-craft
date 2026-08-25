"use client";

import { EventList } from "@/lib/types/rsvp";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface EventListTableProps {
  events: EventList[];
  onEdit: (event: EventList) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: EventList["status"]) => void;
}

export function EventListTable({
  events,
  onEdit,
  onDelete,
  onStatusChange,
}: EventListTableProps) {
  const columns = [
    {
      key: "profileName",
      header: "Profile Name",
      cell: (event: EventList) => (
        <span className="font-medium text-foreground text-base">
          {event.profileName}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (event: EventList) => <StatusBadge status={event.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (event: EventList) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(event),
            },
            {
              label: event.status === "Active" ? "Suspend" : "Activate",
              icon:
                event.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  event.id,
                  event.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(event.id),
              variant: "destructive",
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
      searchFields={["profileName"]}
      searchPlaceholder="Search events..."
      emptyMessage="No events found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Event List ({events.length})
          </h3>
        </div>
      )}
    />
  );
}
