"use client";

import { Booking } from "@/lib/types/accommodation";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";

interface BookingTableProps {
  bookings: Booking[];
  onEdit: (booking: Booking) => void;
  onStatusChange: (id: string, status: Booking["status"]) => void;
  onDelete: (id: string) => void;
}

export function BookingTable({
  bookings,
  onEdit,
  onStatusChange,
  onDelete,
}: BookingTableProps) {
  const columns = [
    {
      key: "attendee",
      header: "Attendee Name",
      cell: (booking: Booking) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {booking.attendeeName}
          </p>
          {booking.attendeeEmail && (
            <p className="text-sm text-muted-foreground">
              {booking.attendeeEmail}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "hotel",
      header: "Hotel Name",
      cell: (booking: Booking) => (
        <span className="text-muted-foreground text-base">
          {booking.hotel?.name || "-"}
        </span>
      ),
    },
    {
      key: "roomType",
      header: "Room Type",
      cell: (booking: Booking) => (
        <span className="text-muted-foreground text-base">
          {booking.roomType?.name || "-"}
        </span>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      cell: (booking: Booking) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(booking.startDate), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      key: "endDate",
      header: "End Date",
      cell: (booking: Booking) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(booking.endDate), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (booking: Booking) => {
        if (booking.roomType) {
          const nights = Math.ceil(
            (new Date(booking.endDate).getTime() -
              new Date(booking.startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          );
          const subtotal = nights * booking.roomType.perNightCost;
          const tax = subtotal * (booking.roomType.taxPercentage / 100);
          const total = subtotal + tax;
          return (
            <span className="text-muted-foreground text-base font-medium">
              INR {total.toFixed(2)}
            </span>
          );
        }
        return <span className="text-muted-foreground text-sm">-</span>;
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (booking: Booking) => <StatusBadge status={booking.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (booking: Booking) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(booking),
            },
            {
              label: booking.status === "Confirmed" ? "Check-in" : "Confirm",
              icon:
                booking.status === "Confirmed"
                  ? ActionIcons.activate
                  : ActionIcons.publish,
              onClick: () =>
                onStatusChange(
                  booking.id,
                  booking.status === "Confirmed" ? "Checked-in" : "Confirmed",
                ),
            },
            ...(booking.status === "Checked-in"
              ? [
                  {
                    label: "Check-out",
                    icon: ActionIcons.suspend,
                    onClick: () => onStatusChange(booking.id, "Checked-out"),
                  },
                ]
              : []),
            {
              label: "Cancel",
              icon: ActionIcons.delete,
              onClick: () => onStatusChange(booking.id, "Cancelled"),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={bookings}
      columns={columns}
      searchFields={["attendeeName", "attendeeEmail", "hotel", "roomType"]}
      searchPlaceholder="Search bookings..."
      emptyMessage="No bookings found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Bookings ({bookings.length})
          </h3>
        </div>
      )}
    />
  );
}
