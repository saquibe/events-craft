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
import { AttendeeProfile } from "@/lib/types/onsite";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Profile name is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface AttendeeProfileFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile?: AttendeeProfile | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
  isDefault?: boolean;
}

export function AttendeeProfileFormSheet({
  open,
  onOpenChange,
  profile,
  onSubmit,
  isSubmitting = false,
  isDefault = false,
}: AttendeeProfileFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        status: profile.status,
      });
    } else {
      form.reset({
        name: "",
        status: "Active",
      });
    }
  }, [profile, form]);

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
            {profile ? "Edit Attendee Profile" : "Add Attendee Profile"}
          </SheetTitle>
          <SheetDescription>
            {profile
              ? "Update the attendee profile information"
              : "Add a new attendee profile"}
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
                  <FormLabel className="text-default">Profile Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter profile name"
                      {...field}
                      disabled={false}
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
                    {profile ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{profile ? "Update Profile" : "Add Profile"}</>
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
