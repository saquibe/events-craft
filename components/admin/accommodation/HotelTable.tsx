"use client";

import { Hotel } from "@/lib/types/accommodation";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HotelTableProps {
  hotels: Hotel[];
  onEdit: (hotel: Hotel) => void;
  onStatusChange: (id: string, status: Hotel["status"]) => void;
}

export function HotelTable({
  hotels,
  onEdit,
  onStatusChange,
}: HotelTableProps) {
  const columns = [
    {
      key: "name",
      header: "Hotel Name",
      cell: (hotel: Hotel) => (
        <div>
          <p className="font-medium text-foreground text-base">{hotel.name}</p>
          <div className="flex items-center gap-0.5 mt-0.5">
            {Array.from({
              length: parseInt(hotel.starCategory.split(" ")[0]),
            }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "location",
      header: "City, Country",
      cell: (hotel: Hotel) => (
        <span className="text-muted-foreground text-base">
          {hotel.city}, {hotel.country}
        </span>
      ),
    },
    {
      key: "checkIn",
      header: "Check-in Time",
      cell: (hotel: Hotel) => (
        <span className="text-muted-foreground text-base">
          {hotel.checkInTime}
        </span>
      ),
    },
    {
      key: "checkOut",
      header: "Check-out Time",
      cell: (hotel: Hotel) => (
        <span className="text-muted-foreground text-base">
          {hotel.checkOutTime}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: () => <Badge color="success">Active</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (hotel: Hotel) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(hotel),
            },
            {
              label: hotel.status === "Active" ? "Suspend" : "Activate",
              icon:
                hotel.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  hotel.id,
                  hotel.status === "Active" ? "Inactive" : "Active",
                ),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={hotels}
      columns={columns}
      searchFields={["name", "city", "country"]}
      searchPlaceholder="Search hotels..."
      emptyMessage="No hotels found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Hotels ({hotels.length})</h3>
        </div>
      )}
    />
  );
}
