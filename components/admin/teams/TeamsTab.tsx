"use client";

import { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { CreateButton } from "../common/CreateButton";
import { EmptyState } from "../common/EmptyState";
import { TeamsTable } from "./TeamsTable";
import { TeamFormSheet } from "./TeamFormSheet";
import type { Team } from "./types";

interface TeamsTabProps {
  teams: Team[];
  onUpdateTeam: (id: string, data: Partial<Team>) => void;
  onDeleteTeam: (id: string) => void;
}

export function TeamsTab({ teams, onUpdateTeam, onDeleteTeam }: TeamsTabProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const handleSave = (data: Omit<Team, "id">) => {
    if (editingTeam) {
      onUpdateTeam(editingTeam.id, data);
    } else {
      const newTeam: Team = {
        id: Date.now().toString(),
        ...data,
      };
      onUpdateTeam(newTeam.id, newTeam);
    }
    setIsSheetOpen(false);
    setEditingTeam(null);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setIsSheetOpen(true);
  };

  const handleResendInvite = (id: string) => {
    console.log("Resend invitation to team member:", id);
    // Add your logic here
  };

  return (
    <>
      <PageHeader
        title="Team Members"
        action={
          <CreateButton
            onClick={() => setIsSheetOpen(true)}
            label="Add Team Member"
          />
        }
      />

      {teams.length === 0 ? (
        <EmptyState
          title="No team members"
          description="Add your first team member to get started"
        />
      ) : (
        <TeamsTable
          teams={teams}
          onEdit={handleEdit}
          onDelete={onDeleteTeam}
          onStatusChange={(id, status) => onUpdateTeam(id, { status })}
          onResendInvite={handleResendInvite}
        />
      )}

      <TeamFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        editingTeam={editingTeam}
        onSave={handleSave}
      />
    </>
  );
}
