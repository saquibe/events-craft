"use client";

import { Exhibitor } from "@/lib/types/exhibitor";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { Badge } from "@/components/ui/badge";

interface ExhibitorTableProps {
  exhibitors: Exhibitor[];
  onEdit: (exhibitor: Exhibitor) => void;
  onDelete: (id: string) => void;
}

export function ExhibitorTable({
  exhibitors,
  onEdit,
  onDelete,
}: ExhibitorTableProps) {
  const columns = [
    {
      key: "company",
      header: "Company",
      cell: (exhibitor: Exhibitor) => (
        <div className="flex items-center gap-3">
          {exhibitor.logo ? (
            <img
              src={exhibitor.logo}
              alt={exhibitor.companyName}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm font-semibold">
                {exhibitor.companyName.charAt(0)}
              </span>
            </div>
          )}
          <span className="font-medium text-foreground text-base">
            {exhibitor.companyName}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (exhibitor: Exhibitor) => (
        <span className="text-muted-foreground text-base">
          {exhibitor.category?.name || "-"}
        </span>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      cell: (exhibitor: Exhibitor) => (
        <div>
          <p className="text-sm font-medium">
            {exhibitor.contactFirstName} {exhibitor.contactLastName}
          </p>
          <p className="text-xs text-muted-foreground">
            {exhibitor.contactEmail}
          </p>
        </div>
      ),
    },
    {
      key: "hall",
      header: "Hall",
      cell: (exhibitor: Exhibitor) => (
        <span className="text-muted-foreground text-base">
          {exhibitor.hall?.name || "-"}
        </span>
      ),
    },
    {
      key: "stall",
      header: "Stall",
      cell: (exhibitor: Exhibitor) => (
        <span className="text-muted-foreground text-base">
          {exhibitor.stall?.name || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (exhibitor: Exhibitor) => <StatusBadge status={exhibitor.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (exhibitor: Exhibitor) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(exhibitor),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(exhibitor.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={exhibitors}
      columns={columns}
      searchFields={[
        "companyName",
        "contactFirstName",
        "contactLastName",
        "contactEmail",
      ]}
      searchPlaceholder="Search exhibitors..."
      emptyMessage="No exhibitors found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Exhibitors ({exhibitors.length})
          </h3>
        </div>
      )}
    />
  );
}
