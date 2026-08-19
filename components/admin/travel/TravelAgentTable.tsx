"use client";

import { TravelAgent } from "@/lib/types/travel";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import { StatusBadge } from "../common/StatusBadge";

interface TravelAgentTableProps {
  agents: TravelAgent[];
  onEdit: (agent: TravelAgent) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TravelAgent["status"]) => void;
}

export function TravelAgentTable({
  agents,
  onEdit,
  onDelete,
  onStatusChange,
}: TravelAgentTableProps) {
  const columns = [
    {
      key: "name",
      header: "Agent Name",
      cell: (agent: TravelAgent) => (
        <span className="font-medium text-foreground text-base">
          {agent.name}
        </span>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (agent: TravelAgent) => (
        <span className="text-muted-foreground text-base">{agent.email}</span>
      ),
    },
    {
      key: "mobile",
      header: "Mobile",
      cell: (agent: TravelAgent) => (
        <span className="text-muted-foreground text-base">{agent.mobile}</span>
      ),
    },
    {
      key: "companyName",
      header: "Company Name",
      cell: (agent: TravelAgent) => (
        <span className="text-muted-foreground text-base">
          {agent.companyName}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (agent: TravelAgent) => <StatusBadge status={agent.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (agent: TravelAgent) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(agent),
            },
            {
              label: agent.status === "Active" ? "Suspend" : "Activate",
              icon:
                agent.status === "Active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  agent.id,
                  agent.status === "Active" ? "Inactive" : "Active",
                ),
            },
            {
              label: "Delete",
              icon: ActionIcons.delete,
              onClick: () => onDelete(agent.id),
              variant: "destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={agents}
      columns={columns}
      searchFields={["name", "email", "companyName"]}
      searchPlaceholder="Search agents..."
      emptyMessage="No travel agents found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">
            Travel Agents ({agents.length})
          </h3>
        </div>
      )}
    />
  );
}
