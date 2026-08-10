"use client";

import { ItemCategory } from "@/lib/types/emanual";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface ItemCategoryTableProps {
  categories: ItemCategory[];
  onEdit: (category: ItemCategory) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ItemCategory["status"]) => void;
}

export function ItemCategoryTable({
  categories,
  onEdit,
  onDelete,
  onStatusChange,
}: ItemCategoryTableProps) {
  const columns = [
    {
      key: "name",
      header: "Category Name",
      cell: (category: ItemCategory) => (
        <span className="font-medium text-foreground text-base">
          {category.name}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (category: ItemCategory) => (
        <StatusBadge status={category.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (category: ItemCategory) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(category),
            },
            {
              label: category.status === "Active" ? "Suspend" : "Activate",
              icon:
                category.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  category.id,
                  category.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(category.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={categories}
      columns={columns}
      searchFields={["name"]}
      searchPlaceholder="Search categories..."
      emptyMessage="No categories found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Item Categories ({categories.length})
          </h3>
        </div>
      )}
    />
  );
}
