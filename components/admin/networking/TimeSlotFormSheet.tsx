"use client";

import { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimeSlot } from "@/lib/types/networking";
import { Loader2 } from "lucide-react";
import { DateTimePicker } from "../common/DateTimePicker";

const formSchema = z.object({
  startDateTime: z.string().min(1, "Start date & time is required"),
  endDateTime: z.string().min(1, "End date & time is required"),
  maxBookings: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface TimeSlotFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeSlot?: TimeSlot | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function TimeSlotFormSheet({
  open,
  onOpenChange,
  timeSlot,
  onSubmit,
  isSubmitting = false,
}: TimeSlotFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDateTime: "",
      endDateTime: "",
      maxBookings: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (timeSlot) {
      form.reset({
        startDateTime: timeSlot.startDateTime,
        endDateTime: timeSlot.endDateTime,
        maxBookings: timeSlot.maxBookings?.toString() || "",
        status: timeSlot.status,
      });
    } else {
      form.reset({
        startDateTime: "",
        endDateTime: "",
        maxBookings: "",
        status: "Active",
      });
    }
  }, [timeSlot, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {timeSlot ? "Edit Time Slot" : "Add Time Slot"}
          </SheetTitle>
          <SheetDescription>
            {timeSlot
              ? "Update the time slot information"
              : "Add a new time slot for meetings"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Start Date & Time *
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      End Date & Time *
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="maxBookings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Max Bookings</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter max bookings"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Status *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
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
                className="text-base cursor-pointer"
                color="primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {timeSlot ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{timeSlot ? "Update Time Slot" : "Add Time Slot"}</>
                )}
              </Button>
              <Button
                className="text-base cursor-pointer"
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
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
