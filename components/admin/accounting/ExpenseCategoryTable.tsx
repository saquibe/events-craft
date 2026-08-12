"use client";

import { ExpenseCategory } from "@/lib/types/accounting";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface ExpenseCategoryTableProps {
  categories: ExpenseCategory[];
  onEdit: (category: ExpenseCategory) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ExpenseCategory["status"]) => void;
}

export function ExpenseCategoryTable({
  categories,
  onEdit,
  onDelete,
  onStatusChange,
}: ExpenseCategoryTableProps) {
  const columns = [
    {
      key: "name",
      header: "Expense Category",
      cell: (category: ExpenseCategory) => (
        <span className="font-medium text-foreground text-base">
          {category.name}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (category: ExpenseCategory) => (
        <StatusBadge status={category.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (category: ExpenseCategory) => (
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
      emptyMessage="No expense categories found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Expense Categories ({categories.length})
          </h3>
        </div>
      )}
    />
  );
}
