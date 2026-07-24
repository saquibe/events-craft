"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Send, Save, Users, X, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import { RichTextEditor } from "@/components/rich-text-editor";

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  recipients: z.array(z.string()).default([]),
  recipientGroups: z.array(z.string()).default([]),
});

const recipientGroups = [
  { id: "all", name: "All Users" },
  { id: "attendees", name: "Attendees" },
  { id: "delegates", name: "Delegates" },
  { id: "speakers", name: "Speakers" },
  { id: "exhibitors", name: "Exhibitors" },
];

const variableSuggestions = [
  "[eventName]",
  "[userName]",
  "[speakerName]",
  "[sessionName]",
  "[sessionDate]",
  "[sessionTime]",
  "[venueName]",
  "[registrationLink]",
  "[contactEmail]",
  "[contactPhone]",
];

export default function CreateEmailPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [recipients, setRecipients] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [newRecipient, setNewRecipient] = useState("");
  const [activeTab, setActiveTab] = useState("editor");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      body: "",
      recipients: [],
      recipientGroups: [],
    },
  });

  // Watch form values
  const subject = form.watch("subject");
  const body = form.watch("body");

  const handleAddRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      const updated = [...recipients, newRecipient];
      setRecipients(updated);
      form.setValue("recipients", updated);
      setNewRecipient("");
    }
  };

  const handleRemoveRecipient = (email: string) => {
    const updated = recipients.filter((r) => r !== email);
    setRecipients(updated);
    form.setValue("recipients", updated);
  };

  const handleAddGroup = (groupId: string) => {
    if (!selectedGroups.includes(groupId)) {
      const updated = [...selectedGroups, groupId];
      setSelectedGroups(updated);
      form.setValue("recipientGroups", updated);
    }
  };

  const handleRemoveGroup = (groupId: string) => {
    const updated = selectedGroups.filter((g) => g !== groupId);
    setSelectedGroups(updated);
    form.setValue("recipientGroups", updated);
  };

  const handleVariableClick = (variable: string) => {
    const currentBody = form.getValues("body");
    form.setValue("body", currentBody + " " + variable);
  };

  const renderPreview = () => {
    let previewBody = body || "";
    variableSuggestions.forEach((variable) => {
      previewBody = previewBody.replace(
        variable,
        `<span class="bg-primary/10 text-primary px-1 rounded">${variable}</span>`,
      );
    });
    return previewBody;
  };

  const handleSend = () => {
    // Validate form
    const result = formSchema.safeParse(form.getValues());
    if (!result.success) {
      // Handle validation errors
      console.error("Validation errors:", result.error);
      return;
    }
    // Handle send logic
    console.log("Sending email:", form.getValues());
  };

  const handleSaveDraft = () => {
    // Handle save draft logic
    console.log("Saving draft:", form.getValues());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Email</h2>
          <p className="text-muted-foreground">
            Create and send on-demand emails for Event #{eventId}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-base cursor-pointer"
            onClick={handleSaveDraft}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button
            className="text-base cursor-pointer"
            color="primary"
            onClick={handleSend}
          >
            <Send className="mr-2 h-4 w-4" />
            Send Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleTabs value={activeTab} onValueChange={setActiveTab}>
                <div className="border-b border-border mb-4">
                  <SimpleTabsList>
                    <SimpleTabsTrigger value="editor">Editor</SimpleTabsTrigger>
                    <SimpleTabsTrigger value="preview">
                      Preview
                    </SimpleTabsTrigger>
                  </SimpleTabsList>
                </div>

                <SimpleTabsContent value="editor" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-default">Subject</Label>
                    <Input
                      placeholder="Enter email subject"
                      value={subject}
                      onChange={(e) => form.setValue("subject", e.target.value)}
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-default">Body</Label>
                    <RichTextEditor
                      value={body}
                      onChange={(value) => form.setValue("body", value)}
                      placeholder="Write your email content here..."
                      minHeight="300px"
                    />
                    {form.formState.errors.body && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.body.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Variables</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {variableSuggestions.map((variable) => (
                        <Badge
                          key={variable}
                          color="outline"
                          className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                          onClick={() => handleVariableClick(variable)}
                        >
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </SimpleTabsContent>

                <SimpleTabsContent value="preview">
                  <div className="border rounded-lg p-6 bg-card">
                    <div className="mb-4">
                      <h4 className="text-default font-medium mb-1">Subject</h4>
                      <p className="text-base font-semibold">
                        {subject || "Subject will appear here"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-default mb-2">
                        Body
                      </h4>
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: renderPreview() }}
                      />
                    </div>
                  </div>
                </SimpleTabsContent>
              </SimpleTabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Recipients */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recipients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Individual */}
              <div className="space-y-2">
                <Label className="text-default">Add Individual</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter email"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddRecipient()
                    }
                  />
                  <Button
                    size="sm"
                    onClick={handleAddRecipient}
                    className="p-4"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {recipients.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recipients.map((email) => (
                      <Badge
                        key={email}
                        color="secondary"
                        className="flex items-center gap-1"
                      >
                        {email}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleRemoveRecipient(email)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Group */}
              <div className="space-y-2">
                <Label className="text-default">Add Group</Label>
                <div className="flex gap-2">
                  <Select onValueChange={handleAddGroup}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipientGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedGroups.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedGroups.map((groupId) => {
                      const group = recipientGroups.find(
                        (g) => g.id === groupId,
                      );
                      return group ? (
                        <Badge
                          key={groupId}
                          color="default"
                          className="flex items-center gap-1"
                        >
                          {group.name}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => handleRemoveGroup(groupId)}
                          />
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Total Recipients:{" "}
                  <span className="font-semibold text-foreground">
                    {recipients.length + selectedGroups.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Use [eventName] to auto-fill event name</p>
              <p>• Use [userName] for personalized emails</p>
              <p>• Save as draft to continue later</p>
              <p>• Preview before sending</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
