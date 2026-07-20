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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { DateTimePicker } from "../common/DateTimePicker";

const formSchema = z.object({
  exhibitorId: z.string().min(1, "Exhibitor is required"),
  quota: z.string().min(1, "Quota is required"),
  startDateTime: z.string().min(1, "Start date & time is required"),
  endDateTime: z.string().min(1, "End date & time is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  sendEmail: z.boolean().default(false),
});

interface VisitorRegistrationQuotaFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quota?: any;
  exhibitors: Array<{ id: string; companyName: string }>;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function VisitorRegistrationQuotaFormSheet({
  open,
  onOpenChange,
  quota,
  exhibitors,
  onSubmit,
  isSubmitting = false,
}: VisitorRegistrationQuotaFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exhibitorId: "",
      quota: "",
      startDateTime: "",
      endDateTime: "",
      status: "Active",
      sendEmail: false,
    },
  });

  useEffect(() => {
    if (quota) {
      form.reset({
        exhibitorId: quota.exhibitorId,
        quota: quota.quota.toString(),
        startDateTime: quota.startDateTime,
        endDateTime: quota.endDateTime,
        status: quota.status,
        sendEmail: quota.sendEmail,
      });
    } else {
      form.reset({
        exhibitorId: "",
        quota: "",
        startDateTime: "",
        endDateTime: "",
        status: "Active",
        sendEmail: false,
      });
    }
  }, [quota, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit({
      ...values,
      quota: parseInt(values.quota),
    });
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {quota
              ? "Edit Visitor Registration Quota"
              : "Add Visitor Registration Quota"}
          </SheetTitle>
          <SheetDescription>
            {quota
              ? "Update the visitor registration quota information"
              : "Add a new visitor registration quota (Free/Exhibition)"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="exhibitorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Exhibitor Name *
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select exhibitor" />
                      </SelectTrigger>
                      <SelectContent>
                        {exhibitors.map((exhibitor) => (
                          <SelectItem key={exhibitor.id} value={exhibitor.id}>
                            {exhibitor.companyName}
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
              name="quota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Visitor Registration Quota *
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter quota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Status</FormLabel>
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

            <FormField
              control={form.control}
              name="sendEmail"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer text-default">
                    Send Email
                  </FormLabel>
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
                    {quota ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{quota ? "Update Quota" : "Add Quota"}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="text-base cursor-pointer"
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
