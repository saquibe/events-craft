"use client";

import { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { CreateButton } from "../common/CreateButton";
import { EmptyState } from "../common/EmptyState";
import { TeamsTable } from "./TeamsTable";
import { TeamFormSheet } from "./TeamFormSheet";
import type { Team } from "./types";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

interface TeamsTabProps {
  teams: Team[];
  onUpdateTeam: (id: string, data: Partial<Team>) => void;
  onDeleteTeam: (id: string) => void;
}

export function TeamsTab({ teams, onUpdateTeam, onDeleteTeam }: TeamsTabProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState("active");

  const activeTeams = teams.filter((team) => team.status === "active");

  const suspendedTeams = teams.filter((team) => team.status === "inactive");

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
        title="Members"
        action={
          <CreateButton
            onClick={() => setIsSheetOpen(true)}
            label="Add Member"
          />
        }
      />

      {/* Description text */}
      <p className="text-muted-foreground text-base font-normal mb-6">
        The table below shows all of the team members associated with Meety
        Events.
      </p>

      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="border-b border-border">
          <div className="flex justify-start">
            <SimpleTabsList>
              <SimpleTabsTrigger value="active">Active</SimpleTabsTrigger>

              <SimpleTabsTrigger value="suspended">Suspended</SimpleTabsTrigger>
            </SimpleTabsList>
          </div>
        </div>

        <SimpleTabsContent value="active" className="mt-6">
          <TeamsTable
            teams={activeTeams}
            onEdit={handleEdit}
            onDelete={onDeleteTeam}
            onStatusChange={(id, status) => onUpdateTeam(id, { status })}
            onResendInvite={handleResendInvite}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="suspended" className="mt-6">
          <TeamsTable
            teams={suspendedTeams}
            onEdit={handleEdit}
            onDelete={onDeleteTeam}
            onStatusChange={(id, status) => onUpdateTeam(id, { status })}
            onResendInvite={handleResendInvite}
          />
        </SimpleTabsContent>
      </SimpleTabs>

      <TeamFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        editingTeam={editingTeam}
        onSave={handleSave}
      />
    </>
  );
}
