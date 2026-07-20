"use client";

import { StallType } from "@/lib/types/exhibitor";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";

interface StallTypeTableProps {
  stallTypes: StallType[];
  onEdit: (stallType: StallType) => void;
  onDelete: (id: string) => void;
}

export function StallTypeTable({
  stallTypes,
  onEdit,
  onDelete,
}: StallTypeTableProps) {
  const columns = [
    {
      key: "name",
      header: "Stall Type Name",
      cell: (stallType: StallType) => (
        <span className="font-medium text-foreground text-base">
          {stallType.name}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (stallType: StallType) => (
        <span className="text-muted-foreground text-base">
          {stallType.description || "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (stallType: StallType) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(stallType),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(stallType.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={stallTypes}
      columns={columns}
      searchFields={["name", "description"]}
      searchPlaceholder="Search stall types..."
      emptyMessage="No stall types found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Stall Types ({stallTypes.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage stall type categories
          </p>
        </div>
      )}
    />
  );
}
