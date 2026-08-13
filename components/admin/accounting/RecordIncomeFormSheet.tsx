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
import { Loader2 } from "lucide-react";
import { DatePicker } from "../common/DatePicker";

const formSchema = z.object({
  sponsorName: z.string().min(1, "Sponsor name is required"),
  amountReceived: z.string().min(1, "Amount received is required"),
  urnNumber: z.string().min(1, "URN number is required"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface RecordIncomeFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  income?: any;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

const MOCK_SPONSORS = [
  { id: "1", name: "Pfizer" },
  { id: "2", name: "Johnson & Johnson" },
  { id: "3", name: "Roche" },
  { id: "4", name: "Novartis" },
  { id: "5", name: "Abbott" },
  { id: "6", name: "Medtronic" },
  { id: "7", name: "Siemens Healthineers" },
  { id: "8", name: "Philips Healthcare" },
];

export function RecordIncomeFormSheet({
  open,
  onOpenChange,
  income,
  onSubmit,
  isSubmitting = false,
}: RecordIncomeFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sponsorName: "",
      amountReceived: "",
      urnNumber: "",
      date: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (income) {
      form.reset({
        sponsorName: income.sponsorName,
        amountReceived: income.amountReceived.toString(),
        urnNumber: income.urnNumber,
        date: income.date,
        status: income.status,
      });
    } else {
      form.reset({
        sponsorName: "",
        amountReceived: "",
        urnNumber: "",
        date: "",
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
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {income ? "Edit Record Income" : "Add Record Income"}
          </SheetTitle>
          <SheetDescription>
            {income
              ? "Update the income record"
              : "Record a new sponsor income"}
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sponsor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_SPONSORS.map((sponsor) => (
                        <SelectItem key={sponsor.id} value={sponsor.name}>
                          {sponsor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amountReceived"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Amount Received *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="urnNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">URN Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URN number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
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
