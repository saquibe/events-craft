"use client";

import { useState } from "react";
import { PageHeader } from "../common/PageHeader";
import { CreateButton } from "../common/CreateButton";
import { EmptyState } from "../common/EmptyState";
import { SupportTable } from "./SupportTable";
import { SupportFormSheet } from "./SupportFormSheet";
import type { SupportTicket } from "./types";

interface SupportTabProps {
  tickets: SupportTicket[];
  onUpdateTicket: (id: string, data: Partial<SupportTicket>) => void;
}

export function SupportTab({ tickets, onUpdateTicket }: SupportTabProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
      <p className="text-muted-foreground text-sm mb-6">
        The table below shows all of the support tickets raised by users.
      </p>

      {tickets.length === 0 ? (
        <EmptyState
          title="No support tickets"
          description="Create your first support ticket"
        />
      ) : (
        <SupportTable
          tickets={tickets}
          onStatusChange={handleStatusChange}
          onReply={handleReply}
        />
      )}

      <SupportFormSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSave={handleSave}
      />
    </>
  );
}
