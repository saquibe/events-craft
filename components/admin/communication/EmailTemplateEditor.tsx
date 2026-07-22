"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, Users, Send, Save, X, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Switch } from "@radix-ui/react-switch";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  recipients: z.array(z.string()).default([]),
  recipientGroups: z.array(z.string()).default([]),
  sendImmediately: z.boolean().default(false),
  priority: z.enum(["high", "normal", "low"]).default("normal"),
});

interface EmailTemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: any;
  onSave: (data: any) => void;
  onSend: (data: any) => void;
  isSubmitting?: boolean;
}

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

const recipientGroups = [
  { id: "all", name: "All Users" },
  { id: "attendees", name: "Attendees" },
  { id: "delegates", name: "Delegates" },
  { id: "speakers", name: "Speakers" },
  { id: "exhibitors", name: "Exhibitors" },
  { id: "sponsors", name: "Sponsors" },
  { id: "media", name: "Media Partners" },
];

export function EmailTemplateEditor({
  open,
  onOpenChange,
  template,
  onSave,
  onSend,
  isSubmitting = false,
}: EmailTemplateEditorProps) {
  const [activeTab, setActiveTab] = useState("editor");
  const [newRecipient, setNewRecipient] = useState("");
  const [recipients, setRecipients] = useState<string[]>(
    template?.recipients || [],
  );
  const [selectedGroups, setSelectedGroups] = useState<string[]>(
    template?.recipientGroups || [],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: template?.subject || "",
      body: template?.body || "",
      recipients: template?.recipients || [],
      recipientGroups: template?.recipientGroups || [],
      sendImmediately: template?.sendImmediately || false,
      priority: template?.priority || "normal",
    },
  });

  useEffect(() => {
    if (template) {
      form.reset({
        subject: template.subject || "",
        body: template.body || "",
        recipients: template.recipients || [],
        recipientGroups: template.recipientGroups || [],
        sendImmediately: template.sendImmediately || false,
        priority: template.priority || "normal",
      });
      setRecipients(template.recipients || []);
      setSelectedGroups(template.recipientGroups || []);
    } else {
      form.reset({
        subject: "",
        body: "",
        recipients: [],
        recipientGroups: [],
        sendImmediately: false,
        priority: "normal",
      });
      setRecipients([]);
      setSelectedGroups([]);
    }
  }, [template, form]);

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
    let previewBody = form.watch("body") || "";
    variableSuggestions.forEach((variable) => {
      previewBody = previewBody.replace(
        variable,
        `<span class="bg-primary/10 text-primary px-1 rounded">${variable}</span>`,
      );
    });
    return previewBody;
  };

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.sendImmediately) {
      onSend(values);
    } else {
      onSave(values);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {template ? "Edit Email Template" : "Create Email Template"}
          </SheetTitle>
          <SheetDescription>
            {template
              ? "Update the email template content and settings"
              : "Create a new email template with variables and content"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6 py-4"
          >
            <SimpleTabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b border-border mb-6">
                <SimpleTabsList>
                  <SimpleTabsTrigger value="editor">Editor</SimpleTabsTrigger>

                  <SimpleTabsTrigger value="preview">Preview</SimpleTabsTrigger>

                  <SimpleTabsTrigger value="settings">
                    Settings
                  </SimpleTabsTrigger>
                </SimpleTabsList>
              </div>

              <SimpleTabsContent value="editor" className="space-y-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">Subject *</FormLabel>
                      <FormControl>
                        <Input placeholder="Email subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">Body *</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write your email content here..."
                          minHeight="250px"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel className="text-default font-medium">
                    Variables
                  </FormLabel>
                  <p className="text-xs text-muted-foreground mb-2">
                    Click to insert variables into your email
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                <div className="border rounded-lg p-6 bg-muted/10">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-default mb-1">
                      Subject
                    </h4>
                    <p className="text-base font-semibold">
                      {form.watch("subject") || "Subject will appear here"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-default mb-2">
                      Body
                    </h4>
                    <div
                      className="prose prose-sm max-w-none bg-white p-4 rounded-lg"
                      dangerouslySetInnerHTML={{
                        __html:
                          renderPreview() || "Email body will appear here",
                      }}
                    />
                  </div>
                </div>
              </SimpleTabsContent>

              <SimpleTabsContent value="settings" className="space-y-6">
                {/* Recipients Section */}
                <div className="space-y-4">
                  <h4 className="text-base font-semibold">Recipients</h4>

                  {/* Add Individual */}
                  <div className="space-y-2">
                    <FormLabel className="text-default">
                      Add Individual
                    </FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter email address"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAddRecipient()
                        }
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleAddRecipient}
                        disabled={!newRecipient}
                        className="p-4"
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
                              className="h-3 w-3 cursor-pointer hover:text-red-500"
                              onClick={() => handleRemoveRecipient(email)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Group */}
                  <div className="space-y-2">
                    <FormLabel className="text-default">Add Group</FormLabel>
                    <div className="flex gap-2">
                      <Select onValueChange={handleAddGroup}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                        <SelectContent>
                          {recipientGroups.map((group) => (
                            <SelectItem key={group.id} value={group.id}>
                              <span className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {group.name}
                              </span>
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
                              <Users className="h-3 w-3" />
                              {group.name}
                              <X
                                className="h-3 w-3 cursor-pointer hover:text-red-500"
                                onClick={() => handleRemoveGroup(groupId)}
                              />
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-sm">
                      Total Recipients:{" "}
                      <span className="font-semibold">
                        {recipients.length + selectedGroups.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <FormLabel className="text-default">Priority</FormLabel>
                  <Select
                    value={form.watch("priority")}
                    onValueChange={(value) =>
                      form.setValue("priority", value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Send Immediately */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-0.5">
                    <FormLabel>Send Immediately</FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Send email right after saving
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="sendImmediately"
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </SimpleTabsContent>
            </SimpleTabs>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="text-base cursor-pointer"
              >
                Cancel
              </Button>
              {form.watch("sendImmediately") ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Now
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-base cursor-pointer"
                  color="primary"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Template
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
