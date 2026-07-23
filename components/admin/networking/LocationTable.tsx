"use client";

import { Location } from "@/lib/types/networking";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";

interface LocationTableProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (id: string) => void;
}

export function LocationTable({
  locations,
  onEdit,
  onDelete,
}: LocationTableProps) {
  const columns = [
    {
      key: "name",
      header: "Location Name",
      cell: (location: Location) => (
        <span className="font-medium text-foreground text-base">
          {location.name}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (location: Location) => (
        <span className="text-muted-foreground text-base">
          {location.description || "-"}
        </span>
      ),
    },
    {
      key: "capacity",
      header: "Capacity",
      cell: (location: Location) => (
        <span className="text-muted-foreground text-base">
          {location.capacity || "-"}
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
      cell: (location: Location) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(location),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(location.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={locations}
      columns={columns}
      searchFields={["name", "description"]}
      searchPlaceholder="Search locations..."
      emptyMessage="No locations found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Locations ({locations.length})
          </h3>
        </div>
      )}
    />
  );
}
