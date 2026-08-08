"use client";

import { Abstract, AbstractStatus } from "@/lib/types/abstract";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AbstractTableProps {
  abstracts: Abstract[];
  onSendEmail: (id: string) => void;
  onSuspend: (id: string) => void;
  onExport: () => void;
  onSendUpdateEmail: () => void;
}

export function AbstractTable({
  abstracts,
  onSendEmail,
  onSuspend,
  onExport,
  onSendUpdateEmail,
}: AbstractTableProps) {
  const getStatusColor = (status: AbstractStatus) => {
    switch (status) {
      case "Pending Review":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
      case "Reviewed":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "Accepted":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "Rejected":
        return "bg-red-500/10 text-red-600 border-red-200";
      default:
        return "";
    }
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (abstract: Abstract) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {abstract.presenterName}
          </p>
          <p className="text-sm text-muted-foreground">
            {abstract.submittedBy}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            {abstract.abstractNumber}
          </p>
        </div>
      ),
    },
    {
      key: "title",
      header: "Abstract Title",
      cell: (abstract: Abstract) => (
        <div>
          <p className="text-muted-foreground text-base max-w-[200px] truncate">
            {abstract.abstractTitle}
          </p>
          <p className="text-sm text-muted-foreground">
            Word Count: {abstract.wordCount}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (abstract: Abstract) => (
        <div>
          <Badge color="secondary" className="text-xs">
            {abstract.category?.name || "-"}
          </Badge>
          <p className="text-xs text-muted-foreground mt-1">
            {abstract.optionName}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (abstract: Abstract) => (
        <Badge className={getStatusColor(abstract.status)}>
          {abstract.status}
        </Badge>
      ),
    },
    {
      key: "coAuthors",
      header: "Co-Authors",
      cell: (abstract: Abstract) => (
        <span className="text-muted-foreground text-base">
          {abstract.coAuthors.length > 0
            ? `${abstract.coAuthors.length} author(s)`
            : "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (abstract: Abstract) => (
        <ActionDropdown
          actions={[
            {
              label: "Send Email",
              icon: ActionIcons.resendInvite,
              onClick: () => onSendEmail(abstract.id),
            },
            {
              label: abstract.status === "Accepted" ? "Suspend" : "Accept",
              icon:
                abstract.status === "Accepted"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () => onSuspend(abstract.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={abstracts}
      columns={columns}
      searchFields={["presenterName", "abstractTitle", "abstractNumber"]}
      searchPlaceholder="Search abstracts..."
      emptyMessage="No abstracts found"
      renderHeader={() => (
        <div className="flex items-center justify-between w-full">
          {/* <div>
            <h3 className="text-lg font-semibold">
              Abstracts ({abstracts.length})
            </h3>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-muted-foreground">
                <span className="text-yellow-600">●</span> Pending:{" "}
                {abstracts.filter((a) => a.status === "Pending Review").length}
              </span>
              <span className="text-xs text-muted-foreground">
                <span className="text-blue-600">●</span> Reviewed:{" "}
                {abstracts.filter((a) => a.status === "Reviewed").length}
              </span>
              <span className="text-xs text-muted-foreground">
                <span className="text-green-600">●</span> Accepted:{" "}
                {abstracts.filter((a) => a.status === "Accepted").length}
              </span>
              <span className="text-xs text-muted-foreground">
                <span className="text-red-600">●</span> Rejected:{" "}
                {abstracts.filter((a) => a.status === "Rejected").length}
              </span>
            </div>
          </div> */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onExport}>
              CSV Export
            </Button>
            <Button size="sm" onClick={onSendUpdateEmail} color="primary">
              Send Update Email
            </Button>
          </div>
        </div>
      )}
    />
  );
}
