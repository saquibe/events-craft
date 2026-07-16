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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Session, Hall, Track } from "@/lib/types/agenda";
import { Loader2, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(1, "Session name is required"),
  chairperson: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .default([]),
  trackId: z.string().min(1, "Track is required"),
  hallId: z.string().min(1, "Hall is required"),
  sessionDate: z.string().min(1, "Session date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  status: z
    .enum(["scheduled", "ongoing", "completed", "cancelled"])
    .default("scheduled"),
});

interface SessionFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session?: Session | null;
  halls: Hall[];
  tracks: Track[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function SessionFormSheet({
  open,
  onOpenChange,
  session,
  halls,
  tracks,
  onSubmit,
  isSubmitting = false,
}: SessionFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      chairperson: [],
      trackId: "",
      hallId: "",
      sessionDate: "",
      startTime: "",
      endTime: "",
      status: "scheduled",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "chairperson",
  });

  useEffect(() => {
    if (session) {
      form.reset({
        name: session.name,
        chairperson:
          session.chairperson?.map((item) => ({
            name: item,
          })) || [],
        trackId: session.trackId,
        hallId: session.hallId,
        sessionDate: session.sessionDate,
        startTime: session.startTime,
        endTime: session.endTime,
        status: session.status,
      });
    } else {
      form.reset({
        name: "",
        chairperson: [],
        trackId: "",
        hallId: "",
        sessionDate: "",
        startTime: "",
        endTime: "",
        status: "scheduled",
      });
    }
  }, [session, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit({
      ...values,
      chairperson: values.chairperson.map((c) => c.name),
    });

    if (!isSubmitting) {
      onOpenChange(false);
    }
  };
  const handleAddChairperson = () => {
    append({
      name: "",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{session ? "Edit Session" : "Add Session"}</SheetTitle>
          <SheetDescription>
            {session
              ? "Update the session information"
              : "Add a new session to the agenda"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter session name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chairperson"
              render={() => (
                <FormItem>
                  <FormLabel>Chairperson</FormLabel>
                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <Input
                          placeholder="Enter chairperson name"
                          {...form.register(
                            `chairperson.${index}.name` as const,
                          )}
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
                      onClick={handleAddChairperson}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Chairperson
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="trackId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Track *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select track" />
                        </SelectTrigger>
                        <SelectContent>
                          {tracks.map((track) => (
                            <SelectItem key={track.id} value={track.id}>
                              {track.name}
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
                name="hallId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Hall *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select hall" />
                        </SelectTrigger>
                        <SelectContent>
                          {halls.map((hall) => (
                            <SelectItem key={hall.id} value={hall.id}>
                              {hall.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="sessionDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
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
                    {session ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{session ? "Update Session" : "Add Session"}</>
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
