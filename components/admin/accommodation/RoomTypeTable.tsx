"use client";

import { RoomType } from "@/lib/types/accommodation";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface RoomTypeTableProps {
  roomTypes: RoomType[];
  onEdit: (roomType: RoomType) => void;
  onStatusChange: (id: string, status: RoomType["status"]) => void;
}

export function RoomTypeTable({
  roomTypes,
  onEdit,
  onStatusChange,
}: RoomTypeTableProps) {
  const columns = [
    {
      key: "hotel",
      header: "Hotel Name",
      cell: (roomType: RoomType) => (
        <span className="font-medium text-foreground text-base">
          {roomType.hotel?.name || "-"}
        </span>
      ),
    },
    {
      key: "name",
      header: "Room Name",
      cell: (roomType: RoomType) => (
        <span className="text-foreground text-base">{roomType.name}</span>
      ),
    },
    {
      key: "inventory",
      header: "Room Inventory",
      cell: (roomType: RoomType) => (
        <span className="text-muted-foreground text-base">
          {roomType.inventory}
        </span>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      cell: (roomType: RoomType) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(roomType.startDate), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      key: "endDate",
      header: "End Date",
      cell: (roomType: RoomType) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(roomType.endDate), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      key: "cost",
      header: "Amount",
      cell: (roomType: RoomType) => (
        <span className="text-muted-foreground text-base">
          INR {roomType.perNightCost} + {roomType.taxPercentage}% tax
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
      cell: (roomType: RoomType) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(roomType),
            },
            {
              label: roomType.status === "Active" ? "Suspend" : "Activate",
              icon:
                roomType.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  roomType.id,
                  roomType.status === "Active" ? "Inactive" : "Active",
                ),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={roomTypes}
      columns={columns}
      searchFields={["name", "hotel"]}
      searchPlaceholder="Search room types..."
      emptyMessage="No room types found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Room Types ({roomTypes.length})
          </h3>
        </div>
      )}
    />
  );
}
