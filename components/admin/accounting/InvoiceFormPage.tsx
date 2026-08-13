// components/admin/accounting/InvoiceFormPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Loader2, Plus, Trash2, ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "../common/DatePicker";
import { Invoice, InvoiceItem } from "@/lib/types/accounting";

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  items: z
    .array(
      z.object({
        id: z.string().optional(),
        itemId: z.string().optional(),
        name: z.string().min(1, "Item name is required"),
        description: z.string().min(1, "Description is required"),
        unit: z.string().min(1, "Unit is required"),
        amount: z.string().min(1, "Amount is required"),
      }),
    )
    .min(1, "At least one item is required"),
});

interface InvoiceFormPageProps {
  invoice?: Invoice | null;
  eventId: string;
  onSuccess?: () => void;
}

export function InvoiceFormPage({
  invoice,
  eventId,
  onSuccess,
}: InvoiceFormPageProps) {
  const router = useRouter();
  const [subTotal, setSubTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  // Load invoice items from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem("invoiceItems");
    if (storedItems) {
      try {
        const parsed = JSON.parse(storedItems);
        // Only show active items
        const activeItems = parsed.filter(
          (item: InvoiceItem) => item.status === "Active",
        );
        setInvoiceItems(activeItems);
      } catch (e) {
        console.error("Error loading invoice items:", e);
      }
    }
  }, []);

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
        date: invoice.startDate || "",
        items: invoice.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          unit: item.unit.toString(),
          amount: item.amount.toString(),
        })),
      });
      calculateTotals(invoice.items);
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
    const selectedItem = invoiceItems.find((item) => item.id === itemId);
    if (selectedItem) {
      // Set all fields at once
      form.setValue(`items.${index}.itemId`, selectedItem.id);
      form.setValue(`items.${index}.name`, selectedItem.itemName);
      form.setValue(`items.${index}.description`, selectedItem.description);
      form.setValue(`items.${index}.amount`, selectedItem.unitPrice.toString());
      // Keep the unit as is, don't override it
      handleItemChange();
    }
  };

  // components/admin/accounting/InvoiceFormPage.tsx (updated onSubmit)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
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

      // Generate a unique ID
      const invoiceId = `INV-${Date.now()}`;

      const invoiceData: Invoice = {
        id: invoiceId,
        eventName: `Invoice ${new Date(values.date).toLocaleDateString()}`,
        startDate: values.date,
        endDate: values.date,
        venue: "",
        taxNo: "",
        items,
        subTotal,
        totalTax: tax,
        total,
        status: "Draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Saving invoice:", invoiceData);

      // Get existing invoices from localStorage
      const storedInvoices = localStorage.getItem("invoices");
      let existingInvoices: Invoice[] = [];
      if (storedInvoices) {
        try {
          existingInvoices = JSON.parse(storedInvoices);
        } catch (e) {
          console.error("Error parsing invoices:", e);
        }
      }

      // Add new invoice to the list
      const updatedInvoices = [...existingInvoices, invoiceData];
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSuccess?.();
      router.push(`/admin/events/${eventId}/accounting/invoices`);
    } catch (error) {
      console.error("Error saving invoice:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              router.push(`/admin/events/${eventId}/accounting/invoices`)
            }
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">
            {invoice ? "Edit Invoice" : "Create Invoice"}
          </h2>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Date Field */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 max-w-md">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">Date *</FormLabel>
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
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Invoice Items</CardTitle>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/admin/events/${eventId}/accounting/invoice-items`,
                      )
                    }
                  >
                    Manage Items
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({
                        name: "",
                        description: "",
                        unit: "1",
                        amount: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {invoiceItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No invoice items available. Please add items first.
                  </p>
                  <Button
                    type="button"
                    variant="default"
                    onClick={() =>
                      router.push(
                        `/admin/events/${eventId}/accounting/invoice-items`,
                      )
                    }
                  >
                    Go to Invoice Items
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">
                          Item Name
                        </TableHead>
                        <TableHead className="min-w-[150px]">
                          Description
                        </TableHead>
                        <TableHead className="w-24">Unit</TableHead>
                        <TableHead className="w-28">Amount ($)</TableHead>
                        <TableHead className="w-24">Total ($)</TableHead>
                        <TableHead className="w-10">Action</TableHead>
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
                            {/* Item Name - Dropdown */}
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`items.${index}.itemId`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <Select
                                      onValueChange={(value) => {
                                        field.onChange(value);
                                        handleSelectItem(index, value);
                                      }}
                                      value={field.value || ""}
                                    >
                                      <SelectTrigger className="h-9">
                                        <SelectValue placeholder="Select an item" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {invoiceItems.map((item) => (
                                          <SelectItem
                                            key={item.id}
                                            value={item.id}
                                          >
                                            <div className="flex justify-between w-full">
                                              <span>{item.itemName}</span>
                                              <span className="text-muted-foreground ml-4">
                                                ${item.unitPrice}
                                              </span>
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>

                            {/* Description - Auto-filled, editable */}
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`items.${index}.description`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormControl>
                                      <Input
                                        placeholder="Description"
                                        className="h-9"
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

                            {/* Unit - Input field (user can enter any number) */}
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
                                        className="h-9 w-20"
                                        min="0"
                                        step="1"
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

                            {/* Amount - Pre-filled, editable */}
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`items.${index}.amount`}
                                render={({ field }) => (
                                  <FormItem className="space-y-0">
                                    <FormControl>
                                      <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="h-9 w-28"
                                        min="0"
                                        step="0.01"
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

                            {/* Total - Calculated */}
                            <TableCell className="font-medium">
                              ${total.toFixed(2)}
                            </TableCell>

                            {/* Action - Remove Button */}
                            <TableCell>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                // className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                                onClick={() => remove(index)}
                                disabled={fields.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Totals */}
              {fields.length > 0 && (
                <div className="flex flex-col items-end space-y-2 mt-4 p-4 bg-muted/30 rounded-lg">
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
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
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
              onClick={() =>
                router.push(`/admin/events/${eventId}/accounting/invoices`)
              }
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
