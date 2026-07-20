"use client";

import { Stall } from "@/lib/types/exhibitor";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";

interface StallTableProps {
  stalls: Stall[];
  onEdit: (stall: Stall) => void;
  onDelete: (id: string) => void;
}

export function StallTable({ stalls, onEdit, onDelete }: StallTableProps) {
  const columns = [
    {
      key: "name",
      header: "Stall Name",
      cell: (stall: Stall) => (
        <span className="font-medium text-foreground text-base">
          {stall.name}
        </span>
      ),
    },
    {
      key: "number",
      header: "Stall Number",
      cell: (stall: Stall) => (
        <span className="text-muted-foreground text-base">{stall.number}</span>
      ),
    },
    {
      key: "size",
      header: "Size (sqm)",
      cell: (stall: Stall) => (
        <span className="text-muted-foreground text-base">{stall.size}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (stall: Stall) => (
        <span className="text-muted-foreground text-base">
          {stall.stallType?.name || "-"}
        </span>
      ),
    },
    {
      key: "hall",
      header: "Hall",
      cell: (stall: Stall) => (
        <span className="text-muted-foreground text-base">
          {stall.hall?.name || "-"}
        </span>
      ),
    },
    {
      key: "visibility",
      header: "Visibility",
      cell: (stall: Stall) => (
        <Badge
          color={stall.visibility === "Visible" ? "secondary" : "secondary"}
        >
          {stall.visibility}
        </Badge>
      ),
    },
    {
      key: "availability",
      header: "Availability",
      cell: (stall: Stall) => (
        <Badge
          color={
            stall.availability === "Onsale"
              ? "success"
              : stall.availability === "Reserved"
                ? "warning"
                : stall.availability === "Blocked"
                  ? "destructive"
                  : "default"
          }
        >
          {stall.availability}
        </Badge>
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
      cell: (stall: Stall) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(stall),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(stall.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={stalls}
      columns={columns}
      searchFields={["name", "number"]}
      searchPlaceholder="Search stalls..."
      emptyMessage="No stalls found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Exhibition Stalls ({stalls.length})
          </h3>
        </div>
      )}
    />
  );
}
