"use client";

import { Meeting } from "@/lib/types/networking";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";

interface MeetingsTableProps {
  meetings: Meeting[];
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MeetingsTable({
  meetings,
  onConfirm,
  onReject,
  onDelete,
}: MeetingsTableProps) {
  const columns = [
    {
      key: "sender",
      header: "Sender",
      cell: (meeting: Meeting) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {meeting.senderName}
          </p>
          <p className="text-sm text-muted-foreground">{meeting.senderEmail}</p>
          <p className="text-xs text-muted-foreground">{meeting.senderType}</p>
        </div>
      ),
    },
    {
      key: "receiver",
      header: "Receiver",
      cell: (meeting: Meeting) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {meeting.receiverName}
          </p>
          <p className="text-sm text-muted-foreground">
            {meeting.receiverEmail}
          </p>
          <p className="text-xs text-muted-foreground">
            {meeting.receiverType}
          </p>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      cell: (meeting: Meeting) => (
        <span className="text-muted-foreground text-base">
          {meeting.location?.name || "-"}
        </span>
      ),
    },
    {
      key: "timeSlot",
      header: "Time Slot",
      cell: (meeting: Meeting) => (
        <div>
          <p className="text-muted-foreground text-base">
            {meeting.timeSlot ? (
              <>
                {format(new Date(meeting.timeSlot.startDateTime), "HH:mm")} -{" "}
                {format(new Date(meeting.timeSlot.endDateTime), "HH:mm")}
              </>
            ) : (
              "-"
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {meeting.timeSlot
              ? format(new Date(meeting.timeSlot.startDateTime), "MMM dd, yyyy")
              : ""}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (meeting: Meeting) => <StatusBadge status={meeting.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (meeting: Meeting) => (
        <ActionDropdown
          actions={[
            ...(meeting.status === "Pending"
              ? [
                  {
                    label: "Confirm",
                    icon: ActionIcons.activate,
                    onClick: () => onConfirm(meeting.id),
                  },
                  {
                    label: "Reject",
                    icon: ActionIcons.suspend,
                    onClick: () => onReject(meeting.id),
                  },
                ]
              : []),
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(meeting.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={meetings}
      columns={columns}
      searchFields={[
        "senderName",
        "senderEmail",
        "receiverName",
        "receiverEmail",
      ]}
      searchPlaceholder="Search meetings..."
      emptyMessage="No meetings found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            All Meetings ({meetings.length})
          </h3>
        </div>
      )}
    />
  );
}
