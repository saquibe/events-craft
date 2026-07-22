"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Users, UserPlus, FileText } from "lucide-react";
import { AutomatedEmailCard } from "@/components/admin/communication/AutomatedEmailCard";
import { EmailTemplateEditor } from "@/components/admin/communication/EmailTemplateEditor";
import { CreateButton } from "@/components/admin";

// Mock templates for speaker module
const speakerTemplates = [
  {
    id: "speaker-1",
    title: "Add Speaker - Welcome to [eventName]",
    module: "Speaker",
    isActive: true,
    description: "Sent when a new speaker is added via admin login",
  },
  {
    id: "speaker-2",
    title: "Speaker Invitation Letter",
    module: "Speaker",
    isActive: true,
    description: "Official invitation letter for speakers",
  },
];

export default function SpeakerAutomatedEmailsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Speaker Emails</h2>
          <p className="text-muted-foreground">
            Manage automated emails for speakers
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

      <div className="grid grid-cols-1 gap-6">
        {/* Via Admin Login Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Via Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {speakerTemplates.map((template) => (
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
      </div>

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
