//app/components/admin/accounting/ExpenseFormSheet.tsx
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
import { RichTextEditor } from "@/components/rich-text-editor";
import { ExpenseHead } from "@/lib/types/accounting";
import { DatePicker } from "../common/DatePicker";

const formSchema = z.object({
  expenseHeadId: z.string().min(1, "Expense head is required"),
  totalUnit: z.string().min(1, "Total unit is required"),
  unitType: z.string().min(1, "Unit type is required"),
  taxPercentage: z.string().min(1, "Tax percentage is required"),
  date: z.string().min(1, "Date is required"),
  narration: z.string().min(1, "Narration is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface ExpenseFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: any;
  expenseHeads: ExpenseHead[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function ExpenseFormSheet({
  open,
  onOpenChange,
  expense,
  expenseHeads,
  onSubmit,
  isSubmitting = false,
}: ExpenseFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseHeadId: "",
      totalUnit: "",
      unitType: "",
      taxPercentage: "",
      date: "",
      narration: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (expense) {
      form.reset({
        expenseHeadId: expense.expenseHeadId,
        totalUnit: expense.totalUnit.toString(),
        unitType: expense.unitType,
        taxPercentage: expense.taxPercentage.toString(),
        date: expense.date,
        narration: expense.narration,
        status: expense.status,
      });
    } else {
      form.reset({
        expenseHeadId: "",
        totalUnit: "",
        unitType: "",
        taxPercentage: "",
        date: "",
        narration: "",
        status: "Active",
      });
    }
  }, [expense, form]);

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
          <SheetTitle>{expense ? "Edit Expense" : "Add Expense"}</SheetTitle>
          <SheetDescription>
            {expense ? "Update the expense information" : "Add a new expense"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="expenseHeadId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Expense Head *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select expense head" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseHeads.map((head) => (
                          <SelectItem key={head.id} value={head.id}>
                            {head.name} (${head.amountPerUnit}/unit)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="totalUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Total Unit *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter total units"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Unit Type *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., kg, pcs, hours" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="taxPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Tax Percentage *
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter tax %" {...field} />
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
                  <FormLabel className="text-default">Date *</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="narration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Narration *</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter narration..."
                      minHeight="150px"
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
                    {expense ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{expense ? "Update Expense" : "Add Expense"}</>
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
