"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Loader2, UserPlus, Users } from "lucide-react";

const formSchema = z.object({
  senderId: z.string().min(1, "Sender is required"),
  receiverId: z.string().min(1, "Receiver is required"),
  locationId: z.string().min(1, "Location is required"),
  timeSlotId: z.string().min(1, "Time slot is required"),
  message: z.string().optional(),
});

interface ScheduleMeetingFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

// Mock users - in real app, these would come from API
const mockUsers = [
  { id: "1", name: "Mintu Nath", email: "abc@abc.com", type: "Attendee" },
  { id: "2", name: "Adil", email: "adil@a.com", type: "Exhibitor" },
  {
    id: "3",
    name: "Attendee User",
    email: "attendee@example.com",
    type: "Attendee",
  },
  {
    id: "4",
    name: "Exhibitor User",
    email: "exhibitor@example.com",
    type: "Exhibitor",
  },
  {
    id: "5",
    name: "Speaker User",
    email: "speaker@example.com",
    type: "Speaker",
  },
  {
    id: "6",
    name: "Delegate User",
    email: "delegate@example.com",
    type: "Delegate",
  },
];

const mockLocations = [
  { id: "1", name: "Hall A" },
  { id: "2", name: "Hall B" },
  { id: "3", name: "Meeting Room 1" },
  { id: "4", name: "Meeting Room 2" },
];

const mockTimeSlots = [
  {
    id: "1",
    startDateTime: "2026-01-15T10:00:00",
    endDateTime: "2026-01-15T10:15:00",
  },
  {
    id: "2",
    startDateTime: "2026-01-15T10:30:00",
    endDateTime: "2026-01-15T10:45:00",
  },
  {
    id: "3",
    startDateTime: "2026-01-15T11:00:00",
    endDateTime: "2026-01-15T11:15:00",
  },
  {
    id: "4",
    startDateTime: "2026-01-15T11:30:00",
    endDateTime: "2026-01-15T11:45:00",
  },
];

export function ScheduleMeetingFormSheet({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: ScheduleMeetingFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderId: "",
      receiverId: "",
      locationId: "",
      timeSlotId: "",
      message: "",
    },
  });

  // Reset form when closed
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    if (!isSubmitting) {
      onOpenChange(false);
      form.reset();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Schedule Meeting
          </SheetTitle>
          <SheetDescription>
            Schedule a new networking meeting between two users
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            {/* Sender */}
            <FormField
              control={form.control}
              name="senderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Sender *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sender" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center gap-2">
                              <span>{user.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ({user.email})
                              </span>
                              <span className="text-xs text-muted-foreground">
                                - {user.type}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Receiver */}
            <FormField
              control={form.control}
              name="receiverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Receiver *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select receiver" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center gap-2">
                              <span>{user.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ({user.email})
                              </span>
                              <span className="text-xs text-muted-foreground">
                                - {user.type}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Location / Table *
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Slot */}
            <FormField
              control={form.control}
              name="timeSlotId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Time Slot *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTimeSlots.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id}>
                            {new Date(slot.startDateTime).toLocaleString()} -{" "}
                            {new Date(slot.endDateTime).toLocaleTimeString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a message to the meeting request..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-base cursor-pointer"
                color="primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </>
                )}
              </Button>
              <Button
                className="text-base cursor-pointer"
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
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
