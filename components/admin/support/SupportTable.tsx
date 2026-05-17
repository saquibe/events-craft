"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../common/StatusBadge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import type { SupportTicket } from "./types";

interface SupportTableProps {
  tickets: SupportTicket[];
  onStatusChange: (id: string, status: SupportTicket["status"]) => void;
  onReply: (id: string) => void;
}

export function SupportTable({
  tickets,
  onStatusChange,
  onReply,
}: SupportTableProps) {
  return (
    <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-foreground">Ticket ID</TableHead>
            <TableHead className="text-foreground">Module</TableHead>
            <TableHead className="text-foreground">Details</TableHead>
            <TableHead className="text-foreground">Created At</TableHead>
            <TableHead className="text-foreground">Status</TableHead>
            <TableHead className="text-right text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              className="border-border hover:bg-muted/50"
            >
              <TableCell className="font-medium text-foreground">
                #{ticket.id.slice(0, 8)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {ticket.module}
              </TableCell>
              <TableCell className="max-w-xs truncate text-muted-foreground">
                {ticket.details}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <StatusBadge status={ticket.status} />
              </TableCell>
              <TableCell className="text-right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
