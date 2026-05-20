"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex justify-end">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-foreground">Event</TableHead>
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
            {filteredEvents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  {searchTerm ? "No matching events found" : "No events found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredEvents.map((event) => (
                <TableRow
                  key={event.id}
                  className="border-border hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {event.eventLogo ? (
                        <Image
                          src={event.eventLogo}
                          alt={event.eventName}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}

                      <span className="font-medium text-foreground">
                        {event.eventName}
                      </span>
                    </div>
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
                          label: "Suspend",
                          icon: ActionIcons.suspend,
                          onClick: () => onStatusChange(event.id, "Suspended"),
                        },
                        {
                          label: "Draft",
                          icon: ActionIcons.draft,
                          onClick: () => onStatusChange(event.id, "Draft"),
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
