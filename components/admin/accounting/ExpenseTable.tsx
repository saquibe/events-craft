//app/components/admin/accounting/ExpenseTable.tsx
"use client";

import { Expense } from "@/lib/types/accounting";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Expense["status"]) => void;
}

export function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
  onStatusChange,
}: ExpenseTableProps) {
  const columns = [
    {
      key: "expenseHead",
      header: "Expense Head",
      cell: (expense: Expense) => (
        <span className="font-medium text-foreground text-base">
          {expense.expenseHead?.name || "-"}
        </span>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (expense: Expense) => (
        <span className="text-muted-foreground text-base">
          {expense.expenseHead?.category?.name || "-"}
        </span>
      ),
    },
    {
      key: "totalUnit",
      header: "Total Unit",
      cell: (expense: Expense) => (
        <span className="text-muted-foreground text-base">
          {expense.totalUnit}
        </span>
      ),
    },
    {
      key: "unitType",
      header: "Unit Type",
      cell: (expense: Expense) => (
        <span className="text-muted-foreground text-base">
          {expense.unitType}
        </span>
      ),
    },
    {
      key: "taxPercentage",
      header: "Tax %",
      cell: (expense: Expense) => (
        <span className="text-muted-foreground text-base">
          {expense.taxPercentage}%
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (expense: Expense) => (
        <span className="text-muted-foreground text-base">
          ${expense.amount}
        </span>
      ),
    },
    {
      key: "taxAmount",
      header: "Tax Amount",
      cell: (expense: Expense) => (
        <span className="text-muted-foreground text-base">
          ${expense.taxAmount}
        </span>
      ),
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      cell: (expense: Expense) => (
        <span className="font-medium text-base">${expense.totalAmount}</span>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (expense: Expense) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(expense.date), "MMM dd, yyyy")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (expense: Expense) => <StatusBadge status={expense.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (expense: Expense) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(expense),
            },
            {
              label: expense.status === "Active" ? "Suspend" : "Activate",
              icon:
                expense.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  expense.id,
                  expense.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(expense.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={expenses}
      columns={columns}
      searchFields={
        [
          "expenseHead.name",
          "expenseHead.category.name",
        ] as unknown as (keyof Expense)[]
      }
      searchPlaceholder="Search expenses..."
      emptyMessage="No expenses found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Expenses ({expenses.length})
          </h3>
        </div>
      )}
    />
  );
}
