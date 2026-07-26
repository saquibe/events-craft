"use client";

import { ScanCategory } from "@/lib/types/onsite";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";

interface ScanCategoryTableProps {
  categories: ScanCategory[];
  onEdit: (category: ScanCategory) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ScanCategory["status"]) => void;
}

export function ScanCategoryTable({
  categories,
  onEdit,
  onDelete,
  onStatusChange,
}: ScanCategoryTableProps) {
  const columns = [
    {
      key: "name",
      header: "Scan Category",
      cell: (category: ScanCategory) => (
        <span className="font-medium text-foreground text-base">
          {category.name}
        </span>
      ),
    },
    {
      key: "scanCode",
      header: "Scan Code",
      cell: (category: ScanCategory) => (
        <span className="text-muted-foreground text-base font-mono">
          {category.scanCode}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (category: ScanCategory) => (
        <span className="text-muted-foreground text-base">
          {category.description || "-"}
        </span>
      ),
    },
    {
      key: "scanMode",
      header: "Scan Mode",
      cell: (category: ScanCategory) => (
        <Badge
          color={category.scanMode === "Multi" ? "secondary" : "secondary"}
        >
          {category.scanMode}
        </Badge>
      ),
    },
    {
      key: "allowReentry",
      header: "Allow Re-entry",
      cell: (category: ScanCategory) => (
        <Badge color={category.allowReentry ? "success" : "secondary"}>
          {category.allowReentry ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (category: ScanCategory) => (
        <StatusBadge status={category.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (category: ScanCategory) => (
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
      searchFields={["name", "scanCode"]}
      searchPlaceholder="Search scan categories..."
      emptyMessage="No scan categories found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Scan Categories ({categories.length})
          </h3>
        </div>
      )}
    />
  );
}
