"use client";

import { Attendee } from "@/lib/types/onsite";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";

interface AttendeeTableProps {
  attendees: Attendee[];
  onEdit: (attendee: Attendee) => void;
  onDelete: (id: string) => void;
  onPrint: (id: string) => void;
  onSendQR: (id: string) => void;
}

export function AttendeeTable({
  attendees,
  onEdit,
  onDelete,
  onPrint,
  onSendQR,
}: AttendeeTableProps) {
  const columns = [
    {
      key: "regNo",
      header: "Reg No.",
      cell: (attendee: Attendee) => (
        <span className="font-medium text-foreground text-sm">
          {attendee.regNo}
        </span>
      ),
    },
    {
      key: "name",
      header: "Name",
      cell: (attendee: Attendee) => (
        <div>
          <p className="font-medium text-foreground text-sm">
            {attendee.prefix} {attendee.firstName} {attendee.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{attendee.email}</p>
        </div>
      ),
    },
    {
      key: "mobile",
      header: "Mobile",
      cell: (attendee: Attendee) => (
        <span className="text-muted-foreground text-sm">{attendee.mobile}</span>
      ),
    },
    {
      key: "badgeProfile",
      header: "Badge Profile",
      cell: (attendee: Attendee) => (
        <Badge color="secondary" className="text-xs">
          {attendee.badgeProfile?.name || "-"}
        </Badge>
      ),
    },
    {
      key: "source",
      header: "Source",
      cell: (attendee: Attendee) => (
        <Badge
          color={
            attendee.source === "Import"
              ? "default"
              : attendee.source === "Manual"
                ? "secondary"
                : "outline"
          }
          className="text-xs"
        >
          {attendee.source}
        </Badge>
      ),
    },
    {
      key: "printed",
      header: "Printed",
      cell: (attendee: Attendee) => (
        <Badge
          color={attendee.printed ? "default" : "secondary"}
          className="text-xs"
        >
          {attendee.printed ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (attendee: Attendee) => (
        <StatusBadge
          status={attendee.checkedIn ? "Checked-in" : ("Not Checked-in" as any)}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (attendee: Attendee) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(attendee),
            },
            {
              label: "Print",
              icon: ActionIcons.publish,
              onClick: () => onPrint(attendee.id),
            },
            {
              label: "Send QR",
              icon: ActionIcons.resendInvite,
              onClick: () => onSendQR(attendee.id),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(attendee.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={attendees}
      columns={columns}
      searchFields={["firstName", "lastName", "email", "regNo"]}
      searchPlaceholder="Search attendees..."
      emptyMessage="No attendees found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Attendees ({attendees.length})
          </h3>
        </div>
      )}
    />
  );
}
