"use client";

import { StatusBadge } from "../common/StatusBadge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import type { SupportTicket } from "./types";
import { formatDate } from "@/lib/date";
import { PaginatedTable } from "@/components/paginated-table";

interface SupportTableProps {
  tickets: SupportTicket[];
  tabLabel: string;
  onStatusChange: (id: string, status: SupportTicket["status"]) => void;
  onReply: (id: string) => void;
}

export function SupportTable({
  tickets,
  tabLabel,
  onStatusChange,
  onReply,
}: SupportTableProps) {
  const columns = [
    {
      key: "id",
      header: "Ticket ID",
      cell: (ticket: SupportTicket) => (
        <span className="font-medium text-foreground text-base">
          #{ticket.id.slice(0, 8)}
        </span>
      ),
    },
    {
      key: "module",
      header: "Module",
      cell: (ticket: SupportTicket) => (
        <span className="text-muted-foreground text-base">{ticket.module}</span>
      ),
    },
    {
      key: "details",
      header: "Details",
      cell: (ticket: SupportTicket) => (
        <span className="max-w-xs truncate text-muted-foreground text-base block">
          {ticket.details}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      cell: (ticket: SupportTicket) => (
        <span className="text-muted-foreground text-base">
          {formatDate(ticket.createdAt)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (ticket: SupportTicket) => <StatusBadge status={ticket.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (ticket: SupportTicket) => (
        <ActionDropdown
          actions={[
            {
              label: "Reply",
              icon: ActionIcons.reply,
              onClick: () => onReply(ticket.id),
            },
            {
              label: "In Progress",
              icon: ActionIcons.activate,
              onClick: () => onStatusChange(ticket.id, "In Progress"),
            },
            {
              label: "Close",
              icon: ActionIcons.publish,
              onClick: () => onStatusChange(ticket.id, "Closed"),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={tickets}
      columns={columns}
      searchFields={["module", "details"]}
      searchPlaceholder="Search tickets..."
      emptyMessage="No support tickets found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            {tabLabel} Tickets ({tickets.length})
          </h3>
        </div>
      )}
    />
  );
}
