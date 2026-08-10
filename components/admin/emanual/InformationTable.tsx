"use client";

import { Information } from "@/lib/types/emanual";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface InformationTableProps {
  informations: Information[];
  onEdit: (information: Information) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Information["status"]) => void;
  onEditRichText: (information: Information) => void;
}

export function InformationTable({
  informations,
  onEdit,
  onDelete,
  onStatusChange,
  onEditRichText,
}: InformationTableProps) {
  const columns = [
    {
      key: "menu",
      header: "Menu Name",
      cell: (information: Information) => (
        <span className="font-medium text-foreground text-base">
          {information.menu?.name || "-"}
        </span>
      ),
    },
    {
      key: "details",
      header: "Description",
      cell: (information: Information) => (
        <div
          className="text-muted-foreground text-base max-w-md truncate"
          dangerouslySetInnerHTML={{ __html: information.details }}
        />
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (information: Information) => (
        <StatusBadge status={information.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (information: Information) => (
        <div className="flex items-center justify-end gap-1">
          <ActionDropdown
            actions={[
              {
                label: "Edit Content",
                icon: ActionIcons.editContent,
                onClick: () => onEditRichText(information),
              },
              // {
              //   label: "Edit",
              //   icon: ActionIcons.edit,
              //   onClick: () => onEdit(information),
              // },
              {
                label: information.status === "Active" ? "Suspend" : "Activate",
                icon:
                  information.status === "Active"
                    ? ActionIcons.suspend
                    : ActionIcons.activate,
                onClick: () =>
                  onStatusChange(
                    information.id,
                    information.status === "Active" ? "Inactive" : "Active",
                  ),
              },
              {
                label: "Delete",
                icon: ActionIcons.delete,
                onClick: () => onDelete(information.id),
                variant: "destructive",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <PaginatedTable
      data={informations}
      columns={columns}
      searchFields={["details"]}
      searchPlaceholder="Search information..."
      emptyMessage="No information found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Information ({informations.length})
          </h3>
        </div>
      )}
    />
  );
}
