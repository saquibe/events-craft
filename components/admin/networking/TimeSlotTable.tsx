"use client";

import { TimeSlot } from "@/lib/types/networking";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface TimeSlotTableProps {
  timeSlots: TimeSlot[];
  onEdit: (timeSlot: TimeSlot) => void;
  onDelete: (id: string) => void;
}

export function TimeSlotTable({
  timeSlots,
  onEdit,
  onDelete,
}: TimeSlotTableProps) {
  const columns = [
    {
      key: "startDateTime",
      header: "Start Date & Time",
      cell: (timeSlot: TimeSlot) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(timeSlot.startDateTime), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "endDateTime",
      header: "End Date & Time",
      cell: (timeSlot: TimeSlot) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(timeSlot.endDateTime), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "maxBookings",
      header: "Max Bookings",
      cell: (timeSlot: TimeSlot) => (
        <span className="text-muted-foreground text-base">
          {timeSlot.maxBookings || "Unlimited"}
        </span>
      ),
    },
    {
      key: "currentBookings",
      header: "Current Bookings",
      cell: (timeSlot: TimeSlot) => (
        <span className="text-muted-foreground text-base">
          {timeSlot.currentBookings || 0}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: () => <Badge color="success">Active</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (timeSlot: TimeSlot) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(timeSlot),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(timeSlot.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={timeSlots}
      columns={columns}
      searchFields={[]}
      searchPlaceholder="Search time slots..."
      emptyMessage="No time slots found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Time Slots ({timeSlots.length})
          </h3>
        </div>
      )}
    />
  );
}
