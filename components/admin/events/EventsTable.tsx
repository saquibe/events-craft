"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
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
import type { Event } from "../common/types";

interface EventsTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Event["status"]) => void;
}

export function EventsTable({
  events,
  onEdit,
  onDelete,
  onStatusChange,
}: EventsTableProps) {
  return (
    <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-foreground">Logo</TableHead>
            <TableHead className="text-foreground">Name</TableHead>
            <TableHead className="text-foreground">Date</TableHead>
            <TableHead className="text-foreground">City</TableHead>
            <TableHead className="text-foreground">Type</TableHead>
            <TableHead className="text-foreground">Status</TableHead>
            <TableHead className="text-right text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow
              key={event.id}
              className="border-border hover:bg-muted/50"
            >
              <TableCell>
                {event.eventLogo ? (
                  <Image
                    src={event.eventLogo}
                    alt={event.eventName}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {event.eventName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(event.startDateTime).toLocaleDateString()} to{" "}
                {new Date(event.endDateTime).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {event.city}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {event.eventType}
              </TableCell>
              <TableCell>
                <StatusBadge status={event.status} />
              </TableCell>
              <TableCell className="text-right">
                <ActionDropdown
                  actions={[
                    {
                      label: "Edit",
                      icon: ActionIcons.edit,
                      onClick: () => onEdit(event),
                    },
                    {
                      label: "Publish",
                      icon: ActionIcons.publish,
                      onClick: () => onStatusChange(event.id, "Published"),
                    },
                    {
                      label: "Draft",
                      icon: ActionIcons.draft,
                      onClick: () => onStatusChange(event.id, "Draft"),
                    },
                    {
                      label: "Delete",
                      icon: ActionIcons.delete,
                      onClick: () => onDelete(event.id),
                      variant: "destructive",
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
