"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../common/StatusBadge";
import { ActionDropdown, ActionIcons } from "../common/ActionDropdown";
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
  return (
    <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-foreground">Photo</TableHead>
            <TableHead className="text-foreground">Name</TableHead>
            <TableHead className="text-foreground">Email</TableHead>
            <TableHead className="text-foreground">Mobile</TableHead>
            <TableHead className="text-foreground">Organization</TableHead>
            <TableHead className="text-foreground">Designation</TableHead>
            <TableHead className="text-foreground">Status</TableHead>
            <TableHead className="text-right text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id} className="border-border hover:bg-muted/50">
              <TableCell>
                <Avatar>
                  <AvatarImage src={team.profilePhoto} />
                  <AvatarFallback>
                    {team.firstName[0]}
                    {team.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {team.firstName} {team.lastName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {team.email}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {team.mobile}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {team.organization}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {team.designation}
              </TableCell>
              <TableCell>
                <StatusBadge status={team.status} />
              </TableCell>
              <TableCell className="text-right">
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
                    {
                      label: "Delete",
                      icon: ActionIcons.delete,
                      onClick: () => onDelete(team.id),
                      variant: "destructive",
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
