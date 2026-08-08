"use client";

import { Category } from "@/lib/types/abstract";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onStatusChange: (id: string, status: Category["status"]) => void;
}

export function CategoryTable({
  categories,
  onEdit,
  onStatusChange,
}: CategoryTableProps) {
  const columns = [
    {
      key: "name",
      header: "Category Name",
      cell: (category: Category) => (
        <span className="font-medium text-foreground text-sm">
          {category.name}
        </span>
      ),
    },
    {
      key: "options",
      header: "Options",
      cell: (category: Category) => (
        <div className="flex flex-wrap gap-1">
          {category.options.map((option) => (
            <Badge key={option} color="outline" className="text-xs">
              {option}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (category: Category) => <StatusBadge status={category.status} />,
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
