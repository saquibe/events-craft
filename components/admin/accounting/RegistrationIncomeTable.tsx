"use client";

import { RegistrationIncome } from "@/lib/types/accounting";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";

interface RegistrationIncomeTableProps {
  incomes: RegistrationIncome[];
  onEdit: (income: RegistrationIncome) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: RegistrationIncome["status"]) => void;
}

export function RegistrationIncomeTable({
  incomes,
  onEdit,
  onDelete,
  onStatusChange,
}: RegistrationIncomeTableProps) {
  const columns = [
    {
      key: "sponsorName",
      header: "Sponsor Name",
      cell: (income: RegistrationIncome) => (
        <span className="font-medium text-foreground text-base">
          {income.sponsorName}
        </span>
      ),
    },
    {
      key: "proposedAmount",
      header: "Proposed Amount",
      cell: (income: RegistrationIncome) => (
        <span className="text-muted-foreground text-base">
          ${income.proposedAmount}
        </span>
      ),
    },
    {
      key: "receivedAmount",
      header: "Received Amount",
      cell: (income: RegistrationIncome) => (
        <span className="font-semibold text-base text-green-600">
          ${income.receivedAmount}
        </span>
      ),
    },
    {
      key: "dateTime",
      header: "Date & Time",
      cell: (income: RegistrationIncome) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(income.dateTime), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "note",
      header: "Note",
      cell: (income: RegistrationIncome) => (
        <span className="text-muted-foreground text-base max-w-xs truncate block">
          {income.note || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (income: RegistrationIncome) => (
        <StatusBadge status={income.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (income: RegistrationIncome) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(income),
            },
            {
              label: income.status === "Active" ? "Suspend" : "Activate",
              icon:
                income.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  income.id,
                  income.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(income.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={incomes}
      columns={columns}
      searchFields={["sponsorName"]}
      searchPlaceholder="Search registration income..."
      emptyMessage="No registration income found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Registration Income ({incomes.length})
          </h3>
        </div>
      )}
    />
  );
}
