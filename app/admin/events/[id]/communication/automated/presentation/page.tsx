"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Presentation, Mail, Clock, AlertCircle } from "lucide-react";
import { AutomatedEmailCard } from "@/components/admin/communication/AutomatedEmailCard";
import { EmailTemplateEditor } from "@/components/admin/communication/EmailTemplateEditor";
import { CreateButton } from "@/components/admin/common/CreateButton";

// Mock templates for presentation module
const presentationTemplates = [
  {
    id: "presentation-1",
    title: "1st Form Submission Reminder",
    module: "Presentation",
    isActive: true,
    description: "First reminder for presentation form submission",
  },
  {
    id: "presentation-2",
    title: "2nd Form Submission Reminder",
    module: "Presentation",
    isActive: true,
    description: "Second reminder for presentation form submission",
  },
  {
    id: "presentation-3",
    title: "3rd Form Submission Reminder",
    module: "Presentation",
    isActive: false,
    description: "Final reminder for presentation form submission",
  },
];

export default function PresentationAutomatedEmailsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Presentation Emails
          </h2>
          <p className="text-muted-foreground">
            Manage automated emails for presentations
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
            <Presentation className="h-5 w-5 text-primary" />
            Via Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presentationTemplates.map((template) => (
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
