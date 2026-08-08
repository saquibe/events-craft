"use client";

import { AbstractReviewer } from "@/lib/types/abstract";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface AbstractReviewerTableProps {
  reviewers: AbstractReviewer[];
  onEdit: (reviewer: AbstractReviewer) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: AbstractReviewer["status"]) => void;
}

export function AbstractReviewerTable({
  reviewers,
  onEdit,
  onDelete,
  onStatusChange,
}: AbstractReviewerTableProps) {
  const columns = [
    {
      key: "name",
      header: "Reviewer Name",
      cell: (reviewer: AbstractReviewer) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {reviewer.firstName} {reviewer.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{reviewer.email}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (reviewer: AbstractReviewer) => (
        <span className="text-muted-foreground text-base">
          {reviewer.category?.name || "-"}
        </span>
      ),
    },
    {
      key: "option",
      header: "Option Name",
      cell: (reviewer: AbstractReviewer) => (
        <span className="text-muted-foreground text-base">
          {reviewer.optionName || "-"}
        </span>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      cell: (reviewer: AbstractReviewer) => (
        <span className="text-muted-foreground text-base">
          {reviewer.designation || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (reviewer: AbstractReviewer) => (
        <StatusBadge status={reviewer.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (reviewer: AbstractReviewer) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(reviewer),
            },
            {
              label: reviewer.status === "Active" ? "Suspend" : "Activate",
              icon:
                reviewer.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  reviewer.id,
                  reviewer.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(reviewer.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={reviewers}
      columns={columns}
      searchFields={["firstName", "lastName", "email"]}
      searchPlaceholder="Search reviewers..."
      emptyMessage="No reviewers found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Abstract Reviewers ({reviewers.length})
          </h3>
        </div>
      )}
    />
  );
}
