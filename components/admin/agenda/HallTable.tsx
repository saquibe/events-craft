"use client";

import { Hall } from "@/lib/types/agenda";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { Badge } from "@/components/ui/badge";
import { PaginatedTable } from "@/components/paginated-table";

interface HallTableProps {
  halls: Hall[];
  onEdit: (hall: Hall) => void;
  onDelete: (id: string) => void;
}

export function HallTable({ halls, onEdit, onDelete }: HallTableProps) {
  const columns = [
    {
      key: "name",
      header: "Hall Name",
      cell: (hall: Hall) => (
        <span className="font-medium text-foreground text-base">
          {hall.name}
        </span>
      ),
    },
    {
      key: "capacity",
      header: "Capacity",
      cell: (hall: Hall) => (
        <span className="text-muted-foreground text-base">
          {hall.capacity || "-"}
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
      cell: (hall: Hall) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(hall),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(hall.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={halls}
      columns={columns}
      searchFields={["name"]}
      searchPlaceholder="Search halls..."
      emptyMessage="No halls found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Halls ({halls.length})</h3>
        </div>
      )}
    />
  );
}
