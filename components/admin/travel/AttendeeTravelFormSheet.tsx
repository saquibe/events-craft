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
import { TravelAgent } from "@/lib/types/travel";
import { Loader2 } from "lucide-react";
import { DateTimePicker } from "../common/DateTimePicker";

const formSchema = z.object({
  attendeeName: z.string().min(1, "Attendee name is required"),
  pickupDateTime: z.string().min(1, "Pickup date & time is required"),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropLocation: z.string().min(1, "Drop location is required"),
  travelAgentId: z.string().optional(),
});

interface AttendeeTravelFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  travel?: any;
  agents: TravelAgent[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function AttendeeTravelFormSheet({
  open,
  onOpenChange,
  travel,
  agents,
  onSubmit,
  isSubmitting = false,
}: AttendeeTravelFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendeeName: "",
      pickupDateTime: "",
      pickupLocation: "",
      dropLocation: "",
      travelAgentId: "",
    },
  });

  useEffect(() => {
    if (travel) {
      form.reset({
        attendeeName: travel.attendeeName,
        pickupDateTime: travel.pickupDateTime,
        pickupLocation: travel.pickupLocation,
        dropLocation: travel.dropLocation,
        travelAgentId: travel.travelAgentId || "",
      });
    } else {
      form.reset({
        attendeeName: "",
        pickupDateTime: "",
        pickupLocation: "",
        dropLocation: "",
        travelAgentId: "",
      });
    }
  }, [travel, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{travel ? "Edit Travel" : "Add Travel"}</SheetTitle>
          <SheetDescription>
            {travel
              ? "Update the attendee travel information"
              : "Add travel details for an attendee"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="attendeeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Attendee Name *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter attendee name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickupDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Pickup Date & Time *
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
              name="pickupLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Pickup Location *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pickup location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dropLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Drop Location *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter drop location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="travelAgentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Travel Agent</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select travel agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {agents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id}>
                            {agent.name} ({agent.companyName})
                          </SelectItem>
                        ))}
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
                className="text-base"
                color="primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {travel ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{travel ? "Update Travel" : "Add Travel"}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="text-base"
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
