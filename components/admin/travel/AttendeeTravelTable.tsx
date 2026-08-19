"use client";

import { AttendeeTravel } from "@/lib/types/travel";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";

interface AttendeeTravelTableProps {
  travels: AttendeeTravel[];
  onEdit: (travel: AttendeeTravel) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: AttendeeTravel["status"]) => void;
}

export function AttendeeTravelTable({
  travels,
  onEdit,
  onDelete,
  onStatusChange,
}: AttendeeTravelTableProps) {
  const columns = [
    {
      key: "attendee",
      header: "Attendee Name",
      cell: (travel: AttendeeTravel) => (
        <span className="font-medium text-foreground text-base">
          {travel.attendeeName}
        </span>
      ),
    },
    {
      key: "pickupDateTime",
      header: "Pickup Date & Time",
      cell: (travel: AttendeeTravel) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(travel.pickupDateTime), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "pickupLocation",
      header: "Pickup Location",
      cell: (travel: AttendeeTravel) => (
        <span className="text-muted-foreground text-base">
          {travel.pickupLocation}
        </span>
      ),
    },
    {
      key: "dropLocation",
      header: "Drop Location",
      cell: (travel: AttendeeTravel) => (
        <span className="text-muted-foreground text-base">
          {travel.dropLocation}
        </span>
      ),
    },
    {
      key: "agent",
      header: "Travel Agent",
      cell: (travel: AttendeeTravel) => (
        <span className="text-muted-foreground text-base">
          {travel.travelAgent?.name || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (travel: AttendeeTravel) => <StatusBadge status={travel.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (travel: AttendeeTravel) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(travel),
            },
            {
              label: travel.status === "Pending" ? "Assign" : "Complete",
              icon:
                travel.status === "Pending"
                  ? ActionIcons.activate
                  : ActionIcons.publish,
              onClick: () =>
                onStatusChange(
                  travel.id,
                  travel.status === "Pending"
                    ? "Assigned"
                    : travel.status === "Assigned"
                      ? "Completed"
                      : "Pending",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(travel.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={travels}
      columns={columns}
      searchFields={["attendeeName"]}
      searchPlaceholder="Search travels..."
      emptyMessage="No attendee travels found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Attendee Travel ({travels.length})
          </h3>
        </div>
      )}
    />
  );
}
