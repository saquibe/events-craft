"use client";

import { OfficialContractor } from "@/lib/types/emanual";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import Image from "next/image";

interface OfficialContractorTableProps {
  contractors: OfficialContractor[];
  onEdit: (contractor: OfficialContractor) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: OfficialContractor["status"]) => void;
}

export function OfficialContractorTable({
  contractors,
  onEdit,
  onDelete,
  onStatusChange,
}: OfficialContractorTableProps) {
  const columns = [
    {
      key: "company",
      header: "Company Name",
      cell: (contractor: OfficialContractor) => (
        <div className="flex items-center gap-3">
          {contractor.logo ? (
            <Image
              src={contractor.logo}
              alt={contractor.companyName}
              width={90}
              height={60}
              className="rounded-lg object-contain bg-muted p-1"
            />
          ) : (
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center font-semibold text-muted-foreground">
              {contractor.companyName.charAt(0)}
            </div>
          )}
          <span className="font-medium text-foreground text-base">
            {contractor.companyName}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (contractor: OfficialContractor) => (
        <span className="text-muted-foreground text-base">
          {contractor.category}
        </span>
      ),
    },
    {
      key: "contact",
      header: "Contact Person",
      cell: (contractor: OfficialContractor) => (
        <div>
          <p className="text-base font-medium text-foreground">
            {contractor.contactFirstName} {contractor.contactLastName}
          </p>
          <p className="text-sm text-muted-foreground">
            {contractor.contactEmail}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (contractor: OfficialContractor) => (
        <StatusBadge status={contractor.status} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (contractor: OfficialContractor) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(contractor),
            },
            {
              label: contractor.status === "Active" ? "Suspend" : "Activate",
              icon:
                contractor.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  contractor.id,
                  contractor.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(contractor.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={contractors}
      columns={columns}
      searchFields={["companyName", "category", "contactEmail"]}
      searchPlaceholder="Search contractors..."
      emptyMessage="No contractors found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Official Contractors ({contractors.length})
          </h3>
        </div>
      )}
    />
  );
}
