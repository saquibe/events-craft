"use client";

import { Order } from "@/lib/types/emanual";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { Badge } from "@/components/ui/badge";

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (id: string) => void;
  onStatusChange: (id: string, status: Order["status"]) => void;
  onCancel: (id: string) => void;
}

export function OrdersTable({
  orders,
  onViewDetails,
  onStatusChange,
  onCancel,
}: OrdersTableProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
      case "Confirmed":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "Completed":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "Cancelled":
        return "bg-red-500/10 text-red-600 border-red-200";
      default:
        return "";
    }
  };

  const columns = [
    {
      key: "exhibitor",
      header: "Exhibitor Name",
      cell: (order: Order) => (
        <span className="font-medium text-foreground text-base">
          {order.exhibitorName}
        </span>
      ),
    },
    {
      key: "orderNumber",
      header: "Order Number",
      cell: (order: Order) => (
        <span className="text-muted-foreground text-base font-mono">
          {order.orderNumber}
        </span>
      ),
    },
    {
      key: "stall",
      header: "Stall #",
      cell: (order: Order) => (
        <span className="text-muted-foreground text-base">
          {order.stallNumber || "-"}
        </span>
      ),
    },
    {
      key: "hall",
      header: "Hall #",
      cell: (order: Order) => (
        <span className="text-muted-foreground text-base">
          {order.hallNumber || "-"}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (order: Order) => (
        <span className="text-muted-foreground text-base">${order.amount}</span>
      ),
    },
    {
      key: "tax",
      header: "Tax",
      cell: (order: Order) => (
        <span className="text-muted-foreground text-base">${order.tax}</span>
      ),
    },
    {
      key: "total",
      header: "Total",
      cell: (order: Order) => (
        <span className="font-semibold text-base">${order.total}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (order: Order) => (
        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (order: Order) => {
        const actions = [
          {
            label: "View Details",
            icon: ActionIcons.edit,
            onClick: () => onViewDetails(order.id),
          },
        ];

        if (order.status === "Pending") {
          actions.push({
            label: "Confirm",
            icon: ActionIcons.activate,
            onClick: () => onStatusChange(order.id, "Confirmed"),
          });
        }

        if (order.status === "Confirmed") {
          actions.push({
            label: "Complete",
            icon: ActionIcons.publish,
            onClick: () => onStatusChange(order.id, "Completed"),
          });
        }

        if (order.status !== "Cancelled" && order.status !== "Completed") {
          actions.push({
            label: "Cancel",
            icon: ActionIcons.delete,
            onClick: () => onCancel(order.id),
            // variant: "destructive" as const,
          });
        }

        return <ActionDropdown actions={actions} />;
      },
    },
  ];

  return (
    <PaginatedTable
      data={orders}
      columns={columns}
      searchFields={["exhibitorName", "orderNumber"]}
      searchPlaceholder="Search orders..."
      emptyMessage="No orders found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Orders ({orders.length})</h3>
        </div>
      )}
    />
  );
}
