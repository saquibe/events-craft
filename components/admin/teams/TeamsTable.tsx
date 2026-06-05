"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeams = teams.filter((team) =>
    `${team.firstName} ${team.lastName} ${team.email} ${team.organization} ${team.designation} ${team.mobile}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Team Count + Search */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            Members ({filteredTeams.length})
          </h3>
        </div>

        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-foreground font-bold">
                Team Member
              </TableHead>
              <TableHead className="text-foreground font-bold">Email</TableHead>
              <TableHead className="text-foreground font-bold">
                Mobile
              </TableHead>
              <TableHead className="text-foreground font-bold">
                Organization
              </TableHead>
              <TableHead className="text-foreground font-bold">
                Designation
              </TableHead>
              <TableHead className="text-foreground font-bold">
                Status
              </TableHead>
              <TableHead className="text-right text-foreground font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground text-base"
                >
                  {searchTerm ? "No matching teams found" : "No teams found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredTeams.map((team) => (
                <TableRow
                  key={team.id}
                  className="border-border hover:bg-muted/50 h-20"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={team.profilePhoto}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {team.firstName[0]}
                          {team.lastName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium text-foreground text-base">
                        {team.firstName} {team.lastName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-base">
                    {team.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-base">
                    {team.mobile}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-base">
                    {team.organization}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-base">
                    {team.designation}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-base">
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
                          label:
                            team.status === "active" ? "Suspend" : "Activate",
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
                        // {
                        //   label: "Delete",
                        //   icon: ActionIcons.delete,
                        //   onClick: () => onDelete(team.id),
                        //   variant: "destructive",
                        // },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
