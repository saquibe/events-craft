"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePicker } from "../common/DatePicker";

// Mock invoice items for dropdown
const MOCK_INVOICE_ITEMS = [
  {
    id: "1",
    name: "Sponsorship Package",
    description: "Gold Sponsorship",
    unitPrice: 5000,
  },
  {
    id: "2",
    name: "Banner Display",
    description: "Main Hall Banner",
    unitPrice: 500,
  },
  {
    id: "3",
    name: "Exhibition Booth",
    description: "Standard Booth",
    unitPrice: 3000,
  },
  {
    id: "4",
    name: "Speaking Slot",
    description: "Keynote Session",
    unitPrice: 2000,
  },
];

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  items: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1, "Item name is required"),
        description: z.string().min(1, "Description is required"),
        unit: z.string().min(1, "Unit is required"),
        amount: z.string().min(1, "Amount is required"),
      }),
    )
    .min(1, "At least one item is required"),
});

interface InvoiceFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice?: any;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function InvoiceFormSheet({
  open,
  onOpenChange,
  invoice,
  onSubmit,
  isSubmitting = false,
}: InvoiceFormSheetProps) {
  const [subTotal, setSubTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      items: [{ name: "", description: "", unit: "1", amount: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    if (invoice) {
      form.reset({
        date: invoice.date || invoice.startDate || "",
        items: invoice.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          unit: item.unit.toString(),
          amount: item.amount.toString(),
        })),
      });
      calculateTotals(invoice.items);
    } else {
      form.reset({
        date: "",
        items: [{ name: "", description: "", unit: "1", amount: "" }],
      });
      setSubTotal(0);
      setTotalTax(0);
      setGrandTotal(0);
    }
  }, [invoice, form]);

  const calculateTotals = (items: any[]) => {
    let subTotal = 0;
    let tax = 0;
    items.forEach((item) => {
      const unit = parseFloat(item.unit) || 0;
      const amount = parseFloat(item.amount) || 0;
      subTotal += unit * amount;
      tax += unit * amount * 0.1;
    });
    setSubTotal(subTotal);
    setTotalTax(tax);
    setGrandTotal(subTotal + tax);
  };

  const handleItemChange = () => {
    const items = form.getValues("items");
    calculateTotals(items);
  };

  const handleSelectItem = (index: number, itemId: string) => {
    const selectedItem = MOCK_INVOICE_ITEMS.find((item) => item.id === itemId);
    if (selectedItem) {
      form.setValue(`items.${index}.name`, selectedItem.name);
      form.setValue(`items.${index}.description`, selectedItem.description);
      form.setValue(`items.${index}.amount`, selectedItem.unitPrice.toString());
      handleItemChange();
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const items = values.items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      unit: parseFloat(item.unit),
      amount: parseFloat(item.amount),
    }));

    const subTotal = items.reduce(
      (sum, item) => sum + item.unit * item.amount,
      0,
    );
    const tax = subTotal * 0.1;
    const total = subTotal + tax;

    await onSubmit({
      date: values.date,
      items,
      subTotal,
      totalTax: tax,
      total,
    });
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{invoice ? "Edit Invoice" : "Create Invoice"}</SheetTitle>
          <SheetDescription>
            {invoice
              ? "Update the invoice information"
              : "Create a new invoice"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
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

            {/* Invoice Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-default font-semibold">Invoice Items</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({ name: "", description: "", unit: "1", amount: "" })
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">Item Name</TableHead>
                      <TableHead className="min-w-[150px]">
                        Description
                      </TableHead>
                      <TableHead className="w-20">Unit</TableHead>
                      <TableHead className="w-24">Amount</TableHead>
                      <TableHead className="w-24">Total</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => {
                      const unit =
                        parseFloat(
                          form.watch(`items.${index}.unit`) as string,
                        ) || 0;
                      const amount =
                        parseFloat(
                          form.watch(`items.${index}.amount`) as string,
                        ) || 0;
                      const total = unit * amount;

                      return (
                        <TableRow key={field.id}>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <FormField
                                control={form.control}
                                name={`items.${index}.name`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormControl>
                                      <Input
                                        placeholder="Item name"
                                        className="h-8"
                                        {...field}
                                        onChange={(e) => {
                                          field.onChange(e);
                                          handleItemChange();
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Select
                                onValueChange={(value) =>
                                  handleSelectItem(index, value)
                                }
                              >
                                <SelectTrigger className="h-7 text-xs">
                                  <SelectValue placeholder="Quick select" />
                                </SelectTrigger>
                                <SelectContent>
                                  {MOCK_INVOICE_ITEMS.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`items.${index}.description`}
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormControl>
                                    <Input
                                      placeholder="Description"
                                      className="h-8"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleItemChange();
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`items.${index}.unit`}
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      className="h-8"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleItemChange();
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`items.${index}.amount`}
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      className="h-8"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleItemChange();
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            ${total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => remove(index)}
                              disabled={fields.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Totals */}
              <div className="flex flex-col items-end space-y-2 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-8">
                  <span className="text-sm font-medium">Sub Total:</span>
                  <span className="text-sm">${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-sm font-medium">Tax (10%):</span>
                  <span className="text-sm">${totalTax.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-8 border-t pt-2">
                  <span className="text-base font-bold">Total:</span>
                  <span className="text-base font-bold text-primary">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {invoice ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{invoice ? "Update Invoice" : "Create Invoice"}</>
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
