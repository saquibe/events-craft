"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "../common/StatusBadge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
import { PaginatedTable } from "@/components/paginated-table";
import type { Team } from "./types";

interface TeamsTableProps {
  teams: Team[];
  onEdit: (team: Team) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Team["status"]) => void;
  onResendInvite: (id: string) => void;
}

export function TeamsTable({
  teams,
  onEdit,
  onDelete,
  onStatusChange,
  onResendInvite,
}: TeamsTableProps) {
  const columns = [
    {
      key: "member",
      header: "Team Member",
      cell: (team: Team) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={team.profilePhoto} className="object-cover" />
            <AvatarFallback>
              {team.firstName[0]}
              {team.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground text-base">
            {team.firstName} {team.lastName}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (team: Team) => (
        <span className="text-muted-foreground text-base">{team.email}</span>
      ),
    },
    {
      key: "mobile",
      header: "Mobile",
      cell: (team: Team) => (
        <span className="text-muted-foreground text-base">{team.mobile}</span>
      ),
    },
    {
      key: "organization",
      header: "Organization",
      cell: (team: Team) => (
        <span className="text-muted-foreground text-base">
          {team.organization}
        </span>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      cell: (team: Team) => (
        <span className="text-muted-foreground text-base">
          {team.designation}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (team: Team) => <StatusBadge status={team.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (team: Team) => (
        <ActionDropdown
          actions={[
            {
              label: "Edit",
              icon: ActionIcons.edit,
              onClick: () => onEdit(team),
            },
            {
              label: "Resend Invitation",
              icon: ActionIcons.resendInvite,
              onClick: () => onResendInvite(team.id),
            },
            {
              label: team.status === "active" ? "Suspend" : "Activate",
              icon:
                team.status === "active"
                  ? ActionIcons.suspend
                  : ActionIcons.activate,
              onClick: () =>
                onStatusChange(
                  team.id,
                  team.status === "active" ? "inactive" : "active",
                ),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <PaginatedTable
      data={teams}
      columns={columns}
      searchFields={[
        "firstName",
        "lastName",
        "email",
        "organization",
        "designation",
        "mobile",
      ]}
      searchPlaceholder="Search teams..."
      emptyMessage="No teams found"
      renderHeader={() => (
        <div>
          <h3 className="text-lg font-semibold">Members ({teams.length})</h3>
        </div>
      )}
    />
  );
}
