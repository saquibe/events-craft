"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, UserPlus, FileText, Building2 } from "lucide-react";
import { AutomatedEmailCard } from "@/components/admin/communication/AutomatedEmailCard";
import { EmailTemplateEditor } from "@/components/admin/communication/EmailTemplateEditor";
import { CreateButton } from "@/components/admin/common/CreateButton";

// Mock templates for emanual module
const emanualTemplates = [
  {
    id: "emanual-1",
    title: "1st Form Submission Reminder",
    module: "eManual",
    isActive: true,
    description: "First reminder for eManual form submission",
  },
  {
    id: "emanual-2",
    title: "2nd Form Submission Reminder",
    module: "eManual",
    isActive: true,
    description: "Second reminder for eManual form submission",
  },
  {
    id: "emanual-3",
    title: "3rd Form Submission Reminder",
    module: "eManual",
    isActive: false,
    description: "Final reminder for eManual form submission",
  },
  {
    id: "emanual-4",
    title: "Add Official Contractor",
    module: "eManual",
    isActive: true,
    description: "Sent when an official contractor is added",
  },
];

export default function EManualAutomatedEmailsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">eManual Emails</h2>
          <p className="text-muted-foreground">
            Manage automated emails for eManual
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
            <UserPlus className="h-5 w-5 text-primary" />
            Via Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emanualTemplates.map((template) => (
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
