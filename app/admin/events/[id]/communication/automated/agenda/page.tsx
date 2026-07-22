"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Mail } from "lucide-react";
import { AutomatedEmailCard } from "@/components/admin/communication/AutomatedEmailCard";
import { EmailTemplateEditor } from "@/components/admin/communication/EmailTemplateEditor";
import { CreateButton } from "@/components/admin";

// Mock templates for agenda module
const agendaTemplates = [
  {
    id: "agenda-1",
    title: "Agenda Published Notification",
    module: "Agenda",
    isActive: true,
    description: "Sent when agenda is published",
  },
  {
    id: "agenda-2",
    title: "Session Reminder",
    module: "Agenda",
    isActive: false,
    description: "Reminder for upcoming sessions",
  },
  {
    id: "agenda-3",
    title: "Agenda Change Notification",
    module: "Agenda",
    isActive: true,
    description: "Sent when agenda is updated",
  },
];

export default function AgendaAutomatedEmailsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agenda Emails</h2>
          <p className="text-muted-foreground">
            Manage automated emails for agenda
          </p>
        </div>
        <CreateButton
          label="Create Email"
          onClick={() => {
            setEditingTemplate(null);
            setIsEditorOpen(true);
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Agenda Email Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agendaTemplates.map((template) => (
              <AutomatedEmailCard
                key={template.id}
                title={template.title}
                description={template.description}
                module={template.module}
                isActive={template.isActive}
                onToggle={() => {}}
                onEdit={() => {
                  setEditingTemplate(template);
                  setIsEditorOpen(true);
                }}
                onPreview={() => {}}
                onDuplicate={() => {}}
                onDelete={() => {}}
                onSend={() => {}}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <EmailTemplateEditor
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        template={editingTemplate}
        onSave={(data) => {
          console.log("Save template:", data);
          setIsEditorOpen(false);
        }}
        onSend={(data) => {
          console.log("Send template:", data);
          setIsEditorOpen(false);
        }}
      />
    </div>
  );
}
