"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
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
import type { Venue } from "./types";

interface VenuesTableProps {
  venues: Venue[];
  onEdit: (venue: Venue) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Venue["status"]) => void;
}

export function VenuesTable({
  venues,
  onEdit,
  onDelete,
  onStatusChange,
}: VenuesTableProps) {
  return (
    <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-foreground">Photo</TableHead>
            <TableHead className="text-foreground">Name</TableHead>
            <TableHead className="text-foreground">City</TableHead>
            <TableHead className="text-foreground">Country</TableHead>
            <TableHead className="text-foreground">Status</TableHead>
            <TableHead className="text-right text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {venues.map((venue) => (
            <TableRow
              key={venue.id}
              className="border-border hover:bg-muted/50"
            >
              <TableCell>
                {venue.venueImage ? (
                  <Image
                    src={venue.venueImage}
                    alt={venue.venueName}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {venue.venueName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {venue.city}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {venue.country}
              </TableCell>
              <TableCell>
                <StatusBadge status={venue.status} />
              </TableCell>
              <TableCell className="text-right">
                <ActionDropdown
                  actions={[
                    {
                      label: "Edit",
                      icon: ActionIcons.edit,
                      onClick: () => onEdit(venue),
                    },
                    {
                      label: venue.status === "Active" ? "Suspend" : "Activate",
                      icon:
                        venue.status === "Active"
                          ? ActionIcons.suspend
                          : ActionIcons.activate,
                      onClick: () =>
                        onStatusChange(
                          venue.id,
                          venue.status === "Active" ? "Inactive" : "Active",
                        ),
                    },
                    {
                      label: "Delete",
                      icon: ActionIcons.delete,
                      onClick: () => onDelete(venue.id),
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
