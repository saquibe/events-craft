"use client";

import { TravelEnquiry } from "@/lib/types/travel";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";
import { format } from "date-fns";

interface TravelEnquiriesTableProps {
  enquiries: TravelEnquiry[];
  agents: { id: string; name: string }[];
  onAssignAgent: (id: string, agentId: string) => void;
  onEdit: (enquiry: TravelEnquiry) => void;
  onDelete: (id: string) => void;
}

export function TravelEnquiriesTable({
  enquiries,
  agents,
  onAssignAgent,
  onEdit,
  onDelete,
}: TravelEnquiriesTableProps) {
  const columns = [
    {
      key: "name",
      header: "Name",
      cell: (enquiry: TravelEnquiry) => (
        <div>
          <p className="font-medium text-foreground text-base">
            {enquiry.name}
          </p>
          <p className="text-sm text-muted-foreground">{enquiry.email}</p>
          <p className="text-sm text-muted-foreground font-mono">
            {enquiry.regNo}
          </p>
        </div>
      ),
    },
    {
      key: "pickupDateTime",
      header: "Pickup Date & Time",
      cell: (enquiry: TravelEnquiry) => (
        <span className="text-muted-foreground text-base">
          {format(new Date(enquiry.pickupDateTime), "MMM dd, yyyy HH:mm")}
        </span>
      ),
    },
    {
      key: "pickupLocation",
      header: "Pickup Location",
      cell: (enquiry: TravelEnquiry) => (
        <span className="text-muted-foreground text-base">
          {enquiry.pickupLocation}
        </span>
      ),
    },
    {
      key: "dropLocation",
      header: "Drop Location",
      cell: (enquiry: TravelEnquiry) => (
        <span className="text-muted-foreground text-base">
          {enquiry.dropLocation}
        </span>
      ),
    },
    {
      key: "agent",
      header: "Assigned Agent",
      cell: (enquiry: TravelEnquiry) => (
        <span className="text-muted-foreground text-base">
          {enquiry.travelAgent?.name || "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (enquiry: TravelEnquiry) => <StatusBadge status={enquiry.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (enquiry: TravelEnquiry) => (
        <ActionDropdown
          actions={[
            ...(enquiry.status === "Pending" || enquiry.status === "Assigned"
              ? [
                  {
                    label: "Assign Agent",
                    icon: ActionIcons.activate,
                    onClick: () => {
                      const agentId = prompt("Enter agent ID (1-3):");
                      if (agentId && agents.find((a) => a.id === agentId)) {
                        onAssignAgent(enquiry.id, agentId);
                      }
                    },
                  },
                ]
              : []),
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(enquiry),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(enquiry.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={enquiries}
      columns={columns}
      searchFields={["name", "email"]}
      searchPlaceholder="Search enquiries..."
      emptyMessage="No travel enquiries found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Travel Enquiries ({enquiries.length})
          </h3>
        </div>
      )}
    />
  );
}
