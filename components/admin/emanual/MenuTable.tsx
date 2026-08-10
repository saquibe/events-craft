"use client";

import { Menu } from "@/lib/types/emanual";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuTableProps {
  menus: Menu[];
  onEdit: (menu: Menu) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Menu["status"]) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export function MenuTable({
  menus,
  onEdit,
  onDelete,
  onStatusChange,
  onMoveUp,
  onMoveDown,
}: MenuTableProps) {
  const sortedMenus = [...menus].sort((a, b) => a.order - b.order);

  const columns = [
    {
      key: "order",
      header: "Order",
      cell: (menu: Menu) => {
        const index = sortedMenus.findIndex((m) => m.id === menu.id);

        return (
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-base w-6">
              {menu.order}
            </span>

            <div className="flex flex-col">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => onMoveUp(menu.id)}
                disabled={index === 0}
              >
                <ArrowUp className="h-3 w-3" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => onMoveDown(menu.id)}
                disabled={index === sortedMenus.length - 1}
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      key: "name",
      header: "Menu Name",
      cell: (menu: Menu) => (
        <span className="font-medium text-foreground text-base">
          {menu.name}
        </span>
      ),
    },
    {
      key: "type",
      header: "Menu Type",
      cell: (menu: Menu) => (
        <Badge color={menu.type === "Information" ? "secondary" : "secondary"}>
          {menu.type}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (menu: Menu) => <StatusBadge status={menu.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (menu: Menu) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(menu),
            },
            {
              label: menu.status === "Active" ? "Suspend" : "Activate",
              icon:
                menu.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  menu.id,
                  menu.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(menu.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={sortedMenus}
      columns={columns}
      searchFields={["name"]}
      searchPlaceholder="Search menus..."
      emptyMessage="No menus found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Menus ({menus.length})</h3>
          <p className="text-sm text-muted-foreground">
            Drag or use arrows to reorder menus
          </p>
        </div>
      )}
    />
  );
}
