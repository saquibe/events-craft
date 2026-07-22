"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Mail } from "lucide-react";
import { AutomatedEmailCard } from "@/components/admin/communication/AutomatedEmailCard";
import { EmailTemplateEditor } from "@/components/admin/communication/EmailTemplateEditor";
import { AUTOMATED_MODULES, EMAIL_TEMPLATES } from "@/lib/types/communication";

export default function AutomatedEmailsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [activeModule, setActiveModule] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  // Mock templates - in real app, these would come from API
  const mockTemplates = [
    {
      id: "1",
      title: "Welcome to [eventName]",
      module: "Speaker",
      isActive: true,
      description: "Sent when a new speaker is added",
    },
    {
      id: "2",
      title: "1st Form Submission Reminder",
      module: "Presentation",
      isActive: true,
      description: "Reminder for first form submission",
    },
    {
      id: "3",
      title: "Add Exhibitor - Welcome to [eventName]",
      module: "Exhibitor",
      isActive: false,
      description: "Sent when a new exhibitor is added",
    },
  ];

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule =
      activeModule === "all" ||
      template.module.toLowerCase() === activeModule.toLowerCase();
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Automated Emails
          </h2>
          <p className="text-muted-foreground">
            Manage automated email templates for all modules
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTemplate(null);
            setIsEditorOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Module Tabs */}
      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={setActiveModule}
      >
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger value="all">All Modules</TabsTrigger>
            {AUTOMATED_MODULES.map((module) => (
              <TabsTrigger key={module.id} value={module.id}>
                <span className="mr-1">{module.icon}</span>
                {module.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeModule} className="mt-6">
          {filteredTemplates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <CardTitle className="text-lg font-medium">
                  No templates found
                </CardTitle>
                <CardDescription>
                  {searchTerm
                    ? "Try adjusting your search or filter"
                    : "Create your first automated email template"}
                </CardDescription>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setEditingTemplate(null);
                    setIsEditorOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <AutomatedEmailCard
                  key={template.id}
                  title={template.title}
                  description={template.description}
                  module={template.module}
                  isActive={template.isActive}
                  onToggle={() => {
                    // Toggle active status
                  }}
                  onEdit={() => {
                    setEditingTemplate(template);
                    setIsEditorOpen(true);
                  }}
                  onPreview={() => {
                    // Preview template
                  }}
                  onDuplicate={() => {
                    // Duplicate template
                  }}
                  onDelete={() => {
                    // Delete template
                  }}
                  onSend={() => {
                    // Send template
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Email Template Editor */}
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
