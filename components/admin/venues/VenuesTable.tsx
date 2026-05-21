"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Search } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVenues = venues.filter((venue) =>
    `${venue.venueName} ${venue.city} ${venue.country}`
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
            placeholder="Search venues..."
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
              <TableHead className="text-foreground font-bold">Venue</TableHead>
              <TableHead className="text-foreground font-bold">City</TableHead>
              <TableHead className="text-foreground font-bold">
                Country
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
            {filteredVenues.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  {searchTerm ? "No matching venues found" : "No venues found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredVenues.map((venue) => (
                <TableRow
                  key={venue.id}
                  className="border-border hover:bg-muted/50 h-20"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {venue.venueImage ? (
                        <Image
                          src={venue.venueImage}
                          alt={venue.venueName}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}

                      <span className="font-medium text-foreground">
                        {venue.venueName}
                      </span>
                    </div>
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
                          label:
                            venue.status === "Active" ? "Suspend" : "Activate",
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
                        // {
                        //   label: "Delete",
                        //   icon: ActionIcons.delete,
                        //   onClick: () => onDelete(venue.id),
                        //   variant: "destructive",
                        // },
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
