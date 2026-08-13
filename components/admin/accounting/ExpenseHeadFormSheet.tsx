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
import { ExpenseCategory } from "@/lib/types/accounting";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  categoryId: z.string().min(1, "Expense category is required"),
  name: z.string().min(1, "Expense head name is required"),
  amountPerUnit: z.string().min(1, "Amount per unit is required"),
  unitQuantity: z.string().min(1, "Unit quantity is required"),
  unitType: z.string().min(1, "Unit type is required"),
  taxPercentage: z.string().min(1, "Tax percentage is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface ExpenseHeadFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expenseHead?: any;
  categories: ExpenseCategory[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function ExpenseHeadFormSheet({
  open,
  onOpenChange,
  expenseHead,
  categories,
  onSubmit,
  isSubmitting = false,
}: ExpenseHeadFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
      name: "",
      amountPerUnit: "",
      unitQuantity: "",
      unitType: "",
      taxPercentage: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (expenseHead) {
      form.reset({
        categoryId: expenseHead.categoryId,
        name: expenseHead.name,
        amountPerUnit: expenseHead.amountPerUnit.toString(),
        unitQuantity: expenseHead.unitQuantity.toString(),
        unitType: expenseHead.unitType,
        taxPercentage: expenseHead.taxPercentage.toString(),
        status: expenseHead.status,
      });
    } else {
      form.reset({
        categoryId: "",
        name: "",
        amountPerUnit: "",
        unitQuantity: "",
        unitType: "",
        taxPercentage: "",
        status: "Active",
      });
    }
  }, [expenseHead, form]);

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
            {expenseHead ? "Edit Expense Head" : "Add Expense Head"}
          </SheetTitle>
          <SheetDescription>
            {expenseHead
              ? "Update the expense head information"
              : "Add a new expense head"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Expense Category *
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Expense Head Name *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter expense head name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amountPerUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Amount per unit (without Tax) *
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
                name="unitQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Unit Quantity *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="taxPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Tax Percentage *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter tax %"
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
                    {expenseHead ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    {expenseHead ? "Update Expense Head" : "Add Expense Head"}
                  </>
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
