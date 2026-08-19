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
import { Loader2 } from "lucide-react";
import { DateTimePicker } from "../common/DateTimePicker";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  regNo: z.string().min(1, "Registration number is required"),
  pickupDateTime: z.string().min(1, "Pickup date & time is required"),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropLocation: z.string().min(1, "Drop location is required"),
});

interface TravelEnquiryFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enquiry?: any;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function TravelEnquiryFormSheet({
  open,
  onOpenChange,
  enquiry,
  onSubmit,
  isSubmitting = false,
}: TravelEnquiryFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      regNo: "",
      pickupDateTime: "",
      pickupLocation: "",
      dropLocation: "",
    },
  });

  useEffect(() => {
    if (enquiry) {
      form.reset({
        name: enquiry.name,
        email: enquiry.email,
        regNo: enquiry.regNo,
        pickupDateTime: enquiry.pickupDateTime,
        pickupLocation: enquiry.pickupLocation,
        dropLocation: enquiry.dropLocation,
      });
    } else {
      form.reset({
        name: "",
        email: "",
        regNo: "",
        pickupDateTime: "",
        pickupLocation: "",
        dropLocation: "",
      });
    }
  }, [enquiry, form]);

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
          <SheetTitle>{enquiry ? "Edit Enquiry" : "Add Enquiry"}</SheetTitle>
          <SheetDescription>
            {enquiry
              ? "Update the travel enquiry information"
              : "Add a new travel enquiry"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <FormField
              control={form.control}
              name="regNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Registration Number *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter registration number" {...field} />
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
                    {enquiry ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{enquiry ? "Update Enquiry" : "Add Enquiry"}</>
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
