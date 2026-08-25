"use client";

import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { Badge } from "@/components/ui/badge";

interface RSVP {
  id: string;
  name: string;
  email: string;
  mobile: string;
  attendeeProfile: string;
  rsvpStatus: string;
  note: string;
  sendInvitation: boolean;
  confirmation: boolean;
}

interface RSVPStatusTableProps {
  rsvps: RSVP[];
  onEdit: (rsvp: RSVP) => void;
  onDelete: (id: string) => void;
  onSendInvitation: (id: string) => void;
}

export function RSVPStatusTable({
  rsvps,
  onEdit,
  onDelete,
  onSendInvitation,
}: RSVPStatusTableProps) {
  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (rsvp: RSVP) => (
        <div>
          <p className="font-medium text-foreground text-base">{rsvp.name}</p>
          <p className="text-sm text-muted-foreground">{rsvp.email}</p>
          <p className="text-sm text-muted-foreground">{rsvp.mobile}</p>
        </div>
      ),
    },
    {
      key: "attendeeProfile",
      header: "Attendee Profiles",
      cell: (rsvp: RSVP) => (
        <Badge color="secondary" className="text-sm">
          {rsvp.attendeeProfile}
        </Badge>
      ),
    },
    {
      key: "rsvpStatus",
      header: "RSVP Status",
      cell: (rsvp: RSVP) => (
        <Badge
          color={rsvp.rsvpStatus === "Yes" ? "success" : "destructive"}
          className="text-sm"
        >
          {rsvp.rsvpStatus}
        </Badge>
      ),
    },
    {
      key: "note",
      header: "Note",
      cell: (rsvp: RSVP) => (
        <span className="text-muted-foreground text-base max-w-[150px] truncate block">
          {rsvp.note || "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (rsvp: RSVP) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(rsvp),
            },
            {
              label: "Send Invitation",
              icon: ActionIcons.resendInvite,
              onClick: () => onSendInvitation(rsvp.id),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(rsvp.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={rsvps}
      columns={columns}
      searchFields={["name", "email"]}
      searchPlaceholder="Search RSVPs..."
      emptyMessage="No RSVPs found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            RSVP Status ({rsvps.length})
          </h3>
        </div>
      )}
    />
  );
}
