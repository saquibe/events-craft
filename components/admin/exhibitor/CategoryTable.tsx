"use client";

import { Category } from "@/lib/types/exhibitor";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { StatusBadge } from "../common/StatusBadge";
import { PaginatedTable } from "@/components/paginated-table";
import { Badge } from "@/components/ui/badge";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const columns = [
    {
      key: "name",
      header: "Category Name",
      cell: (category: Category) => (
        <span className="font-medium text-foreground text-base">
          {category.name}
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
      cell: (category: Category) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(category),
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
            Categories ({categories.length})
          </h3>
        </div>
      )}
    />
  );
}
