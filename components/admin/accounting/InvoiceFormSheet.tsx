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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2, Calculator } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceItem } from "@/lib/types/accounting";
import { DatePicker } from "../common/DatePicker";

const formSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  venue: z.string().min(1, "Venue is required"),
  taxNo: z.string().min(1, "Tax number is required"),
  items: z
    .array(
      z.object({
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
      eventName: "",
      startDate: "",
      endDate: "",
      venue: "",
      taxNo: "",
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
        eventName: invoice.eventName,
        startDate: invoice.startDate,
        endDate: invoice.endDate,
        venue: invoice.venue,
        taxNo: invoice.taxNo,
        items: invoice.items.map((item: any) => ({
          name: item.name,
          description: item.description,
          unit: item.unit.toString(),
          amount: item.amount.toString(),
        })),
      });
      calculateTotals(invoice.items);
    } else {
      form.reset({
        eventName: "",
        startDate: "",
        endDate: "",
        venue: "",
        taxNo: "",
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
      tax += unit * amount * 0.1; // Assuming 10% tax
    });
    setSubTotal(subTotal);
    setTotalTax(tax);
    setGrandTotal(subTotal + tax);
  };

  const handleItemChange = () => {
    const items = form.getValues("items");
    calculateTotals(items);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const items = values.items.map((item) => ({
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
      ...values,
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
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Event Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Tax No. *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tax number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Start Date *</FormLabel>
                    <FormControl>
                      <DatePicker
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
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">End Date *</FormLabel>
                    <FormControl>
                      <DatePicker
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
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Venue *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter venue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Invoice Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-default">Invoice Items</h4>
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

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Description</TableHead>
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
                            <FormField
                              control={form.control}
                              name={`items.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Item name"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleItemChange();
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`items.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Description"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleItemChange();
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`items.${index}.unit`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleItemChange();
                                      }}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`items.${index}.amount`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleItemChange();
                                      }}
                                    />
                                  </FormControl>
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
                color="primary"
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
