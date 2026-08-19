"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TravelAgentTable } from "@/components/admin/travel/TravelAgentTable";
import { TravelAgentFormSheet } from "@/components/admin/travel/TravelAgentFormSheet";
import { TravelAgent } from "@/lib/types/travel";
import { CreateButton } from "@/components/admin";

const mockAgents: TravelAgent[] = [
  {
    id: "1",
    name: "Agent A",
    email: "agentA@example.com",
    mobile: "1234567890",
    companyName: "Travel Co",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Agent B",
    email: "agentB@example.com",
    mobile: "0987654321",
    companyName: "Tour Co",
    status: "Active",
    createdAt: "",
    updatedAt: "",
  },
];

export default function TravelAgentPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [agents, setAgents] = useState<TravelAgent[]>(mockAgents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<TravelAgent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingAgent) {
        setAgents(
          agents.map((a) =>
            a.id === editingAgent.id
              ? { ...a, ...data, updatedAt: new Date().toISOString() }
              : a,
          ),
        );
      } else {
        const newAgent: TravelAgent = {
          id: String(agents.length + 1),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setAgents([...agents, newAgent]);
      }
    } catch (error) {
      console.error("Error saving agent:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingAgent(null);
    }
  };

  const handleEdit = (agent: TravelAgent) => {
    setEditingAgent(agent);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this agent?")) {
      setAgents(agents.filter((a) => a.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: TravelAgent["status"]) => {
    setAgents(
      agents.map((a) =>
        a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Travel Agents</h2>
          <p className="text-muted-foreground">
            Manage travel agents for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Agent"
          onClick={() => {
            setEditingAgent(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <TravelAgentTable
        agents={agents}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <TravelAgentFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        agent={editingAgent}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
