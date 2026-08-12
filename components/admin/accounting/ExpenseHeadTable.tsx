"use client";

import { ExpenseHead } from "@/lib/types/accounting";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface ExpenseHeadTableProps {
  expenseHeads: ExpenseHead[];
  onEdit: (expenseHead: ExpenseHead) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ExpenseHead["status"]) => void;
}

export function ExpenseHeadTable({
  expenseHeads,
  onEdit,
  onDelete,
  onStatusChange,
}: ExpenseHeadTableProps) {
  const columns = [
    {
      key: "category",
      header: "Expense Category",
      cell: (expenseHead: ExpenseHead) => (
        <span className="font-medium text-foreground text-base">
          {expenseHead.category?.name || "-"}
        </span>
      ),
    },
    {
      key: "name",
      header: "Expense Head",
      cell: (expenseHead: ExpenseHead) => (
        <span className="text-foreground text-base">{expenseHead.name}</span>
      ),
    },
    {
      key: "amountPerUnit",
      header: "Amount Per Unit (Without GST)",
      cell: (expenseHead: ExpenseHead) => (
        <span className="text-muted-foreground text-base">
          ${expenseHead.amountPerUnit}
        </span>
      ),
    },
    {
      key: "unitQuantity",
      header: "Unit Qnty",
      cell: (expenseHead: ExpenseHead) => (
        <span className="text-muted-foreground text-base">
          {expenseHead.unitQuantity}
        </span>
      ),
    },
    {
      key: "gstPercentage",
      header: "GST %",
      cell: (expenseHead: ExpenseHead) => (
        <span className="text-muted-foreground text-base">
          {expenseHead.gstPercentage}%
        </span>
      ),
    },
    {
      key: "gstAmount",
      header: "GST Amount",
      cell: (expenseHead: ExpenseHead) => {
        const gstAmount =
          (expenseHead.amountPerUnit * expenseHead.gstPercentage) / 100;
        return (
          <span className="text-muted-foreground text-base">
            ${gstAmount.toFixed(2)}
          </span>
        );
      },
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      cell: (expenseHead: ExpenseHead) => {
        const total =
          expenseHead.amountPerUnit +
          (expenseHead.amountPerUnit * expenseHead.gstPercentage) / 100;
        return (
          <span className="font-medium text-base">${total.toFixed(2)}</span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (expenseHead: ExpenseHead) => (
        <StatusBadge status={expenseHead.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (expenseHead: ExpenseHead) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(expenseHead),
            },
            {
              label: expenseHead.status === "Active" ? "Suspend" : "Activate",
              icon:
                expenseHead.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  expenseHead.id,
                  expenseHead.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(expenseHead.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={expenseHeads}
      columns={columns}
      searchFields={["name"]}
      searchPlaceholder="Search expense heads..."
      emptyMessage="No expense heads found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Expense Heads ({expenseHeads.length})
          </h3>
        </div>
      )}
    />
  );
}
