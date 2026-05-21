"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { format } from "path";
import { formatDate } from "@/lib/date";

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter((ticket) =>
    `${ticket.module} ${ticket.details}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex justify-end">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-foreground font-bold">
                Ticket ID
              </TableHead>
              <TableHead className="text-foreground font-bold">
                Module
              </TableHead>
              <TableHead className="text-foreground font-bold">
                Details
              </TableHead>
              <TableHead className="text-foreground font-bold">
                Created At
              </TableHead>
              <TableHead className="text-foreground font-bold">
                Status
              </TableHead>
              <TableHead className="text-right text-foreground font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  {searchTerm
                    ? "No matching tickets found"
                    : "No support tickets found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  className="border-border hover:bg-muted/50 h-20"
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
                    {formatDate(ticket.createdAt)}
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
                          onClick: () =>
                            onStatusChange(ticket.id, "In Progress"),
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
