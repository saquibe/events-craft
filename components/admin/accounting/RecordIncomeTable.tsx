"use client";

import { RecordIncome } from "@/lib/types/accounting";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";

interface RecordIncomeTableProps {
  records: RecordIncome[];
  onEdit: (record: RecordIncome) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: RecordIncome["status"]) => void;
}

export function RecordIncomeTable({
  records,
  onEdit,
  onDelete,
  onStatusChange,
}: RecordIncomeTableProps) {
  const columns = [
    {
      key: "sponsorName",
      header: "Sponsor Name",
      cell: (record: RecordIncome) => (
        <span className="font-medium text-foreground text-base">
          {record.sponsorName}
        </span>
      ),
    },
    {
      key: "amountReceived",
      header: "Amount Received",
      cell: (record: RecordIncome) => (
        <span className="font-semibold text-base text-green-600">
          ${record.amountReceived}
        </span>
      ),
    },
    {
      key: "urnNumber",
      header: "URN Number",
      cell: (record: RecordIncome) => (
        <span className="text-muted-foreground text-base font-mono">
          {record.urnNumber}
        </span>
      ),
    },
    {
      key: "dateTime",
      header: "Date & Time",
      cell: (record: RecordIncome) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(record.dateTime), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (record: RecordIncome) => <StatusBadge status={record.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (record: RecordIncome) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(record),
            },
            {
              label: record.status === "Active" ? "Suspend" : "Activate",
              icon:
                record.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  record.id,
                  record.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(record.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={records}
      columns={columns}
      searchFields={["sponsorName", "urnNumber"]}
      searchPlaceholder="Search records..."
      emptyMessage="No income records found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Record Income ({records.length})
          </h3>
        </div>
      )}
    />
  );
}
