"use client";

import { AbstractApprover } from "@/lib/types/abstract";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface AbstractApproverTableProps {
  approvers: AbstractApprover[];
  onEdit: (approver: AbstractApprover) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: AbstractApprover["status"]) => void;
}

export function AbstractApproverTable({
  approvers,
  onEdit,
  onDelete,
  onStatusChange,
}: AbstractApproverTableProps) {
  const columns = [
    {
      key: "name",
      header: "Approver Name",
      cell: (approver: AbstractApprover) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {approver.firstName} {approver.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{approver.email}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (approver: AbstractApprover) => (
        <span className="text-muted-foreground text-base">
          {approver.category?.name || "-"}
        </span>
      ),
    },
    {
      key: "option",
      header: "Option Name",
      cell: (approver: AbstractApprover) => (
        <span className="text-muted-foreground text-base">
          {approver.optionName || "-"}
        </span>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      cell: (approver: AbstractApprover) => (
        <span className="text-muted-foreground text-base">
          {approver.designation || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (approver: AbstractApprover) => (
        <StatusBadge status={approver.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (approver: AbstractApprover) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(approver),
            },
            {
              label: approver.status === "Active" ? "Suspend" : "Activate",
              icon:
                approver.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  approver.id,
                  approver.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(approver.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={approvers}
      columns={columns}
      searchFields={["firstName", "lastName", "email"]}
      searchPlaceholder="Search approvers..."
      emptyMessage="No approvers found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Abstract Approvers ({approvers.length})
          </h3>
        </div>
      )}
    />
  );
}
