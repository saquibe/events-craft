"use client";

import { PresentationJudge } from "@/lib/types/abstract";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";

interface PresentationJudgeTableProps {
  judges: PresentationJudge[];
  onEdit: (judge: PresentationJudge) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: PresentationJudge["status"]) => void;
}

export function PresentationJudgeTable({
  judges,
  onEdit,
  onDelete,
  onStatusChange,
}: PresentationJudgeTableProps) {
  const columns = [
    {
      key: "name",
      header: "Judge Name",
      cell: (judge: PresentationJudge) => (
        <div>
          <p className="font-medium text-foreground text-base">{judge.name}</p>
          <p className="text-sm text-muted-foreground">{judge.email}</p>
        </div>
      ),
    },
    {
      key: "abstractType",
      header: "Abstract Type",
      cell: (judge: PresentationJudge) => (
        <Badge
          color={judge.abstractType === "Paper" ? "secondary" : "secondary"}
        >
          {judge.abstractType}
        </Badge>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (judge: PresentationJudge) => (
        <span className="text-muted-foreground text-base">
          {judge.category?.name || "-"}
        </span>
      ),
    },
    {
      key: "option",
      header: "Option Name",
      cell: (judge: PresentationJudge) => (
        <span className="text-muted-foreground text-base">
          {judge.optionName || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (judge: PresentationJudge) => <StatusBadge status={judge.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (judge: PresentationJudge) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(judge),
            },
            {
              label: judge.status === "Active" ? "Suspend" : "Activate",
              icon:
                judge.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  judge.id,
                  judge.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(judge.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={judges}
      columns={columns}
      searchFields={["name", "email"]}
      searchPlaceholder="Search judges..."
      emptyMessage="No judges found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Presentation Judges ({judges.length})
          </h3>
        </div>
      )}
    />
  );
}
