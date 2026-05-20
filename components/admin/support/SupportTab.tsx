"use client";

import { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { CreateButton } from "../common/CreateButton";
import { EmptyState } from "../common/EmptyState";
import { SupportTable } from "./SupportTable";
import { SupportFormSheet } from "./SupportFormSheet";
import type { SupportTicket } from "./types";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

interface SupportTabProps {
  tickets: SupportTicket[];
  onUpdateTicket: (id: string, data: Partial<SupportTicket>) => void;
}

export function SupportTab({ tickets, onUpdateTicket }: SupportTabProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("open");

  const openTickets = tickets.filter((ticket) => ticket.status !== "Closed");

  const closedTickets = tickets.filter((ticket) => ticket.status === "Closed");

  const handleSave = (data: Omit<SupportTicket, "id" | "createdAt">) => {
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    onUpdateTicket(newTicket.id, newTicket);
    setIsSheetOpen(false);
  };

  const handleReply = (id: string) => {
    console.log("Reply to ticket:", id);
    // Add your reply logic here
  };

  const handleStatusChange = (id: string, status: SupportTicket["status"]) => {
    onUpdateTicket(id, { status });
  };

  return (
    <>
      <PageHeader
        title="Support Tickets"
        action={
          <CreateButton
            onClick={() => setIsSheetOpen(true)}
            label="Create Ticket"
          />
        }
      />

      {/* Description text */}
      <p className="text-muted-foreground text-sm font-normal mb-6">
        The table below shows all of the support tickets raised by users.
      </p>

      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="border-b border-border">
          <div className="flex justify-start">
            <SimpleTabsList>
              <SimpleTabsTrigger value="open">
                Open ({openTickets.length})
              </SimpleTabsTrigger>

              <SimpleTabsTrigger value="closed">
                Closed ({closedTickets.length})
              </SimpleTabsTrigger>
            </SimpleTabsList>
          </div>
        </div>

        <SimpleTabsContent value="open" className="mt-6">
          <SupportTable
            tickets={openTickets}
            onStatusChange={handleStatusChange}
            onReply={handleReply}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="closed" className="mt-6">
          <SupportTable
            tickets={closedTickets}
            onStatusChange={handleStatusChange}
            onReply={handleReply}
          />
        </SimpleTabsContent>
      </SimpleTabs>

      <SupportFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSave={handleSave}
      />
    </>
  );
}
