"use client";

import { Lead } from "@/lib/types/lead";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface LeadTableProps {
  leads: Lead[];
  onDelete: (id: string) => void;
  onExport?: () => void;
}

export function LeadTable({ leads, onDelete, onExport }: LeadTableProps) {
  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (lead: Lead) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {lead.prefix} {lead.firstName} {lead.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{lead.email}</p>
        </div>
      ),
    },
    {
      key: "registration",
      header: "Registration",
      cell: (lead: Lead) => (
        <span className="text-muted-foreground text-base">
          {lead.registrationId || "-"}
        </span>
      ),
    },
    {
      key: "exhibitor",
      header: "Exhibitor Name",
      cell: (lead: Lead) => (
        <span className="text-muted-foreground text-base">
          {lead.exhibitorName || "-"}
        </span>
      ),
    },
    {
      key: "scannedAt",
      header: "Scan Date & Time",
      cell: (lead: Lead) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(lead.scannedAt), "dd/MM/yyyy h:mm a")}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (lead: Lead) => (
        <ActionDropdown
          actions={[
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(lead.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={leads}
      columns={columns}
      searchFields={["firstName", "lastName", "email", "exhibitorName"]}
      searchPlaceholder="Search leads..."
      emptyMessage="No leads found"
      renderHeader={() => (
        <div className="flex items-center justify-between w-full">
          <div>
            <h3 className="text-lg font-semibold">Leads ({leads.length})</h3>
          </div>
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              Export Leads
            </Button>
          )}
        </div>
      )}
    />
  );
}
