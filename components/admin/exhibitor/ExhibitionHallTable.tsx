"use client";

import { Hall } from "@/lib/types/exhibitor";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { Badge } from "@/components/ui/badge";

interface ExhibitionHallTableProps {
  halls: Hall[];
  onEdit: (hall: Hall) => void;
  onDelete: (id: string) => void;
}

export function ExhibitionHallTable({
  halls,
  onEdit,
  onDelete,
}: ExhibitionHallTableProps) {
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
          <h3 className="text-lg font-semibold">
            Exhibition Halls ({halls.length})
          </h3>
        </div>
      )}
    />
  );
}
