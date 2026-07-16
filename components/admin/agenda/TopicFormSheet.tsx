"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Topic, Session } from "@/lib/types/agenda";
import { Loader2, X, Plus } from "lucide-react";

const TOPIC_TYPES = [
  "Presentation",
  "Panel Discussion",
  "Quiz",
  "Debate",
  "Abstract Talk",
  "ePoster Presentation",
  "Paper Presentation",
] as const;

const formSchema = z.object({
  sessionId: z.string().min(1, "Session is required"),
  topicType: z.enum(TOPIC_TYPES),
  topic: z.string().min(1, "Topic is required"),

  speakers: z.array(z.object({ name: z.string() })).default([]),
  moderator: z.array(z.object({ name: z.string() })).default([]),
  panellists: z.array(z.object({ name: z.string() })).default([]),
  teamMembers: z.array(z.object({ name: z.string() })).default([]),
  presenters: z.array(z.object({ name: z.string() })).default([]),

  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  aboutTopic: z.string().optional(),
});

interface TopicFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topic?: Topic | null;
  sessions: Session[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function TopicFormSheet({
  open,
  onOpenChange,
  topic,
  sessions,
  onSubmit,
  isSubmitting = false,
}: TopicFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sessionId: "",
      topicType: "Presentation",
      topic: "",
      speakers: [],
      moderator: [],
      panellists: [],
      teamMembers: [],
      presenters: [],
      startTime: "",
      endTime: "",
      aboutTopic: "",
    },
  });

  const speakerFields = useFieldArray({
    control: form.control,
    name: "speakers",
  });

  const moderatorFields = useFieldArray({
    control: form.control,
    name: "moderator",
  });

  const panellistFields = useFieldArray({
    control: form.control,
    name: "panellists",
  });

  const teamMemberFields = useFieldArray({
    control: form.control,
    name: "teamMembers",
  });

  const presenterFields = useFieldArray({
    control: form.control,
    name: "presenters",
  });

  useEffect(() => {
    if (topic) {
      form.reset({
        sessionId: topic.sessionId,
        topicType: topic.topicType,
        topic: topic.topic,

        speakers: topic.speakers?.map((name) => ({ name })) ?? [],
        moderator: topic.moderator?.map((name) => ({ name })) ?? [],
        panellists: topic.panellists?.map((name) => ({ name })) ?? [],
        teamMembers: topic.teamMembers?.map((name) => ({ name })) ?? [],
        presenters: topic.presenters?.map((name) => ({ name })) ?? [],

        startTime: topic.startTime,
        endTime: topic.endTime,
        aboutTopic: topic.aboutTopic || "",
      });
    } else {
      form.reset({
        sessionId: "",
        topicType: "Presentation",
        topic: "",
        speakers: [],
        moderator: [],
        panellists: [],
        teamMembers: [],
        presenters: [],
        startTime: "",
        endTime: "",
        aboutTopic: "",
      });
    }
  }, [topic, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit({
      ...values,
      speakers: values.speakers.map((x) => x.name),
      moderator: values.moderator.map((x) => x.name),
      panellists: values.panellists.map((x) => x.name),
      teamMembers: values.teamMembers.map((x) => x.name),
      presenters: values.presenters.map((x) => x.name),
    });

    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  const renderMultiSelect = (
    label: string,
    fieldName:
      | "speakers"
      | "moderator"
      | "panellists"
      | "teamMembers"
      | "presenters",
    fields: any[],
    append: any,
    remove: any,
    placeholder: string,
  ) => (
    <FormItem>
      <FormLabel>{label}</FormLabel>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              placeholder={placeholder}
              {...form.register(`${fieldName}.${index}.name` as const)}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "" })}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add {label}
        </Button>
      </div>

      <FormMessage />
    </FormItem>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{topic ? "Edit Topic" : "Add Topic"}</SheetTitle>
          <SheetDescription>
            {topic
              ? "Update the topic information"
              : "Add a new topic to the session"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="sessionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Name *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select session" />
                      </SelectTrigger>
                      <SelectContent>
                        {sessions.map((session) => (
                          <SelectItem key={session.id} value={session.id}>
                            {session.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topicType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic Type *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic type" />
                      </SelectTrigger>
                      <SelectContent>
                        {TOPIC_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter topic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Multi-select fields */}
            {renderMultiSelect(
              "Speakers",
              "speakers",
              speakerFields.fields,
              speakerFields.append,
              speakerFields.remove,
              "Enter speaker name",
            )}

            {renderMultiSelect(
              "Moderator",
              "moderator",
              moderatorFields.fields,
              moderatorFields.append,
              moderatorFields.remove,
              "Enter moderator name",
            )}

            {renderMultiSelect(
              "Panellists",
              "panellists",
              panellistFields.fields,
              panellistFields.append,
              panellistFields.remove,
              "Enter panellist name",
            )}

            {renderMultiSelect(
              "Team Members",
              "teamMembers",
              teamMemberFields.fields,
              teamMemberFields.append,
              teamMemberFields.remove,
              "Enter team member name",
            )}

            {renderMultiSelect(
              "Presenters",
              "presenters",
              presenterFields.fields,
              presenterFields.append,
              presenterFields.remove,
              "Enter presenter name",
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time *</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="aboutTopic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Topic</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description about the topic"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                color="primary"
                className="cursor-pointer text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {topic ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{topic ? "Update Topic" : "Add Topic"}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="cursor-pointer text-base"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
