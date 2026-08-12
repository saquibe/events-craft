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
import { Loader2 } from "lucide-react";
import { DateTimePicker } from "../common/DateTimePicker";

const formSchema = z.object({
  sponsorName: z.string().min(1, "Sponsor name is required"),
  proposedAmount: z.string().min(1, "Proposed amount is required"),
  receivedAmount: z.string().min(1, "Received amount is required"),
  dateTime: z.string().min(1, "Date and time is required"),
  note: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface RegistrationIncomeFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  income?: any;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function RegistrationIncomeFormSheet({
  open,
  onOpenChange,
  income,
  onSubmit,
  isSubmitting = false,
}: RegistrationIncomeFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sponsorName: "",
      proposedAmount: "",
      receivedAmount: "",
      dateTime: "",
      note: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (income) {
      form.reset({
        sponsorName: income.sponsorName,
        proposedAmount: income.proposedAmount.toString(),
        receivedAmount: income.receivedAmount.toString(),
        dateTime: income.dateTime,
        note: income.note || "",
        status: income.status,
      });
    } else {
      form.reset({
        sponsorName: "",
        proposedAmount: "",
        receivedAmount: "",
        dateTime: "",
        note: "",
        status: "Active",
      });
    }
  }, [income, form]);

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
          <SheetTitle>
            {income ? "Edit Registration Income" : "Add Registration Income"}
          </SheetTitle>
          <SheetDescription>
            {income
              ? "Update the registration income record"
              : "Add a new registration income record"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="sponsorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Sponsor Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter sponsor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="proposedAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Proposed Amount *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter proposed amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receivedAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Received Amount *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter received amount"
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
              name="dateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Date and Time *
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

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer text-base"
                color="primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {income ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{income ? "Update Record" : "Add Record"}</>
                )}
              </Button>
              <Button
                className="cursor-pointer text-base"
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
