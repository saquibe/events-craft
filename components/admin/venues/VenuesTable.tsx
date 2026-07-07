"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
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
  const columns = [
    {
      key: "venue",
      header: "Venue",
      cell: (venue: Venue) => (
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
          <span className="font-medium text-foreground text-base">
            {venue.venueName}
          </span>
        </div>
      ),
    },
    {
      key: "city",
      header: "City",
      cell: (venue: Venue) => (
        <span className="text-muted-foreground text-base">{venue.city}</span>
      ),
    },
    {
      key: "country",
      header: "Country",
      cell: (venue: Venue) => (
        <span className="text-muted-foreground text-base">{venue.country}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (venue: Venue) => <StatusBadge status={venue.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (venue: Venue) => (
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
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={venues}
      columns={columns}
      searchFields={["venueName", "city", "country"]}
      searchPlaceholder="Search venues..."
      emptyMessage="No venues found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Venues ({venues.length})</h3>
        </div>
      )}
    />
  );
}
