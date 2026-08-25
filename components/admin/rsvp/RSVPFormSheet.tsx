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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),
  attendeeProfile: z.string().min(1, "Attendee profile is required"),
  rsvpStatus: z.string().min(1, "RSVP status is required"),
  sendInvitation: z.boolean().default(false),
  confirmation: z.boolean().default(false),
  note: z.string().optional(),
});

interface RSVPFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rsvp?: any;
  statuses: { id: string; name: string }[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function RSVPFormSheet({
  open,
  onOpenChange,
  rsvp,
  statuses,
  onSubmit,
  isSubmitting = false,
}: RSVPFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      attendeeProfile: "",
      rsvpStatus: "",
      sendInvitation: false,
      confirmation: false,
      note: "",
    },
  });

  useEffect(() => {
    if (rsvp) {
      form.reset({
        name: rsvp.name,
        email: rsvp.email,
        mobile: rsvp.mobile,
        attendeeProfile: rsvp.attendeeProfile,
        rsvpStatus: rsvp.rsvpStatus,
        sendInvitation: rsvp.sendInvitation,
        confirmation: rsvp.confirmation,
        note: rsvp.note || "",
      });
    } else {
      form.reset({
        name: "",
        email: "",
        mobile: "",
        attendeeProfile: "",
        rsvpStatus: "",
        sendInvitation: false,
        confirmation: false,
        note: "",
      });
    }
  }, [rsvp, form]);

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
          <SheetTitle>{rsvp ? "Edit RSVP" : "Add RSVP"}</SheetTitle>
          <SheetDescription>
            {rsvp ? "Update the RSVP information" : "Add a new RSVP"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email and Mobile */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Mobile *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Attendee Profile and RSVP Status */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="attendeeProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Attendee Profiles *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter attendee profile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rsvpStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      RSVP Status *
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status.id} value={status.name}>
                              {status.name}
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

            {/* Note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add a note..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Send Invitation - Switch */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-default">Send Invitation</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Send invitation email to the attendee
                </p>
              </div>
              <FormField
                control={form.control}
                name="sendInvitation"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Confirmation - Switch */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-default">Confirmation</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Mark as confirmed
                </p>
              </div>
              <FormField
                control={form.control}
                name="confirmation"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            {/* Buttons */}
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
                    {rsvp ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{rsvp ? "Update RSVP" : "Add RSVP"}</>
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
