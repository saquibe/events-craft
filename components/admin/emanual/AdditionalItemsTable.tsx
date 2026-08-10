"use client";

import { AdditionalItem } from "@/lib/types/emanual";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import Image from "next/image";

interface AdditionalItemsTableProps {
  items: AdditionalItem[];
  onEdit: (item: AdditionalItem) => void;
  onDelete: (id: string) => void;
}

export function AdditionalItemsTable({
  items,
  onEdit,
  onDelete,
}: AdditionalItemsTableProps) {
  const columns = [
    {
      key: "item",
      header: "Item Name",
      cell: (item: AdditionalItem) => (
        <div className="flex items-center gap-3">
          {item.photo ? (
            <Image
              src={item.photo}
              alt={item.itemName}
              width={90}
              height={60}
              className="rounded-lg object-contain bg-muted p-1"
            />
          ) : (
            <div className="w-[90px] h-[60px] bg-muted rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
          )}

          <div>
            <p className="font-medium text-base text-foreground">
              {item.itemName}
            </p>
            <p className="text-sm text-muted-foreground">{item.itemCode}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (item: AdditionalItem) => (
        <span className="text-muted-foreground text-base">
          {item.category?.name || "-"}
        </span>
      ),
    },
    {
      key: "price",
      header: "Unit Price",
      cell: (item: AdditionalItem) => (
        <span className="text-muted-foreground text-base">
          ${item.unitPrice} + {item.taxPercentage}% tax
        </span>
      ),
    },
    {
      key: "itemFor",
      header: "Item For",
      cell: (item: AdditionalItem) => (
        <Badge color={item.itemFor === "eCom" ? "secondary" : "secondary"}>
          {item.itemFor}
        </Badge>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      cell: (item: AdditionalItem) => (
        <div className="space-y-0.5">
          <p className="text-base">Opening: {item.openingStock}</p>
          <p className="text-sm">Current: {item.currentStock}</p>
          <p className="text-xs">Sold: {item.sold}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item: AdditionalItem) => (
        <Badge color={item.status === "Active" ? "success" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (item: AdditionalItem) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(item),
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
      searchFields={["itemName", "itemCode"]}
      searchPlaceholder="Search items..."
      emptyMessage="No items found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Additional Items ({items.length})
          </h3>
        </div>
      )}
    />
  );
}
