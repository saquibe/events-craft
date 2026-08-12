"use client";

import { InvoiceItem } from "@/lib/types/accounting";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  onEdit: (item: InvoiceItem) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: InvoiceItem["status"]) => void;
}

export function InvoiceItemsTable({
  items,
  onEdit,
  onDelete,
  onStatusChange,
}: InvoiceItemsTableProps) {
  const columns = [
    {
      key: "itemName",
      header: "Item Name",
      cell: (item: InvoiceItem) => (
        <span className="font-medium text-foreground text-base">
          {item.itemName}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (item: InvoiceItem) => (
        <span className="text-muted-foreground text-base max-w-xs truncate block">
          {item.description}
        </span>
      ),
    },
    {
      key: "taxCode",
      header: "Tax Code",
      cell: (item: InvoiceItem) => (
        <span className="text-muted-foreground text-base font-mono">
          {item.taxCode}
        </span>
      ),
    },
    {
      key: "unitPrice",
      header: "Unit Price",
      cell: (item: InvoiceItem) => (
        <span className="text-muted-foreground text-base">
          ${item.unitPrice}
        </span>
      ),
    },
    {
      key: "taxPercentage",
      header: "Tax %",
      cell: (item: InvoiceItem) => (
        <span className="text-muted-foreground text-base">
          {item.taxPercentage}%
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item: InvoiceItem) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (item: InvoiceItem) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(item),
            },
            {
              label: item.status === "Active" ? "Suspend" : "Activate",
              icon:
                item.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  item.id,
                  item.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(item.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={items}
      columns={columns}
      searchFields={["itemName", "description"]}
      searchPlaceholder="Search invoice items..."
      emptyMessage="No invoice items found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Invoice Items ({items.length})
          </h3>
        </div>
      )}
    />
  );
}
