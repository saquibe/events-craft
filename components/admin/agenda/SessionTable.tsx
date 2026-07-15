"use client";

import { Session } from "@/lib/types/agenda";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";
import { PaginatedTable } from "@/components/paginated-table";

interface SessionTableProps {
  sessions: Session[];
  onEdit: (session: Session) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Session["status"]) => void;
}

export function SessionTable({
  sessions,
  onEdit,
  onDelete,
  onStatusChange,
}: SessionTableProps) {
  const columns = [
    {
      key: "name",
      header: "Session Name",
      cell: (session: Session) => (
        <span className="font-medium text-foreground text-base">
          {session.name}
        </span>
      ),
    },
    {
      key: "chairperson",
      header: "Chairperson",
      cell: (session: Session) => (
        <span className="text-muted-foreground text-base">
          {session.chairperson.length > 0
            ? `${session.chairperson.length} chair(s)`
            : "-"}
        </span>
      ),
    },
    {
      key: "track",
      header: "Track",
      cell: (session: Session) => (
        <span className="text-muted-foreground text-base">
          {session.track?.name || "-"}
        </span>
      ),
    },
    {
      key: "hall",
      header: "Hall",
      cell: (session: Session) => (
        <span className="text-muted-foreground text-base">
          {session.hall?.name || "-"}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (session: Session) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(session.sessionDate), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      key: "startTime",
      header: "Start Time",
      cell: (session: Session) => (
        <span className="text-muted-foreground text-base">
          {session.startTime}
        </span>
      ),
    },
    {
      key: "endTime",
      header: "End Time",
      cell: (session: Session) => (
        <span className="text-muted-foreground text-base">
          {session.endTime}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (session: Session) => <StatusBadge status={session.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (session: Session) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(session),
            },
            {
              label: session.status === "scheduled" ? "Start" : "Schedule",
              icon:
                session.status === "scheduled"
                  ? ActionIcons.activate
                  : ActionIcons.suspend,
              onClick: () =>
                onStatusChange(
                  session.id,
                  session.status === "scheduled" ? "ongoing" : "scheduled",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(session.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={sessions}
      columns={columns}
      searchFields={["name"]}
      searchPlaceholder="Search sessions..."
      emptyMessage="No sessions found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Sessions ({sessions.length})
          </h3>
        </div>
      )}
    />
  );
}
