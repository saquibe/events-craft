"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, UserPlus, Users, BadgeCheck, Building2 } from "lucide-react";
import { AutomatedEmailCard } from "@/components/admin/communication/AutomatedEmailCard";
import { EmailTemplateEditor } from "@/components/admin/communication/EmailTemplateEditor";
import { CreateButton } from "@/components/admin/common/CreateButton";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

// Mock templates for exhibitor module
const exhibitorTemplates = {
  admin: [
    {
      id: "exhibitor-admin-1",
      title: "Add Exhibitor - Welcome to [eventName]",
      module: "Exhibitor",
      isActive: true,
      description: "Sent when a new exhibitor is added via admin login",
    },
    {
      id: "exhibitor-admin-2",
      title: "Add Attendee Registration (Conference) Quota",
      module: "Exhibitor",
      isActive: true,
      description: "Sent when attendee registration quota is added",
    },
    {
      id: "exhibitor-admin-3",
      title: "Add Free Visitor Registration (Exhibition) Quota",
      module: "Exhibitor",
      isActive: false,
      description: "Sent when visitor registration quota is added",
    },
    {
      id: "exhibitor-admin-4",
      title: "Add Exhibitor Badge (Staff/Stall Team) Quota",
      module: "Exhibitor",
      isActive: true,
      description: "Sent when exhibitor badge quota is added",
    },
  ],
  exhibitor: [
    {
      id: "exhibitor-exhibitor-1",
      title: "Add Attendee Registration (Conference)",
      module: "Exhibitor",
      isActive: true,
      description:
        "Sent when attendee registration is added via exhibitor login",
    },
    {
      id: "exhibitor-exhibitor-2",
      title: "Add Visitor Registration (Exhibition)",
      module: "Exhibitor",
      isActive: true,
      description:
        "Sent when visitor registration is added via exhibitor login",
    },
    {
      id: "exhibitor-exhibitor-3",
      title: "Add Exhibitor Badge (Staff/Stall Team)",
      module: "Exhibitor",
      isActive: false,
      description: "Sent when exhibitor badge is added via exhibitor login",
    },
  ],
};

export default function ExhibitorAutomatedEmailsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Exhibitor Emails
          </h2>
          <p className="text-muted-foreground">
            Manage automated emails for exhibitors
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

      <SimpleTabs defaultValue="admin" className="w-full">
        <div className="border-b border-border">
          <SimpleTabsList>
            <SimpleTabsTrigger
              value="admin"
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Via Admin Login
            </SimpleTabsTrigger>

            <SimpleTabsTrigger
              value="exhibitor"
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              Via Exhibitor Login
            </SimpleTabsTrigger>
          </SimpleTabsList>
        </div>

        <SimpleTabsContent value="admin" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Via Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exhibitorTemplates.admin.map((template) => (
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
        </SimpleTabsContent>

        <SimpleTabsContent value="exhibitor" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Via Exhibitor Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exhibitorTemplates.exhibitor.map((template) => (
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
        </SimpleTabsContent>
      </SimpleTabs>

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
