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

const formSchema = z.object({
  itemName: z.string().min(1, "Item name is required"),
  description: z.string().min(1, "Description is required"),
  taxCode: z.string().min(1, "Tax code is required"),
  unitPrice: z.string().min(1, "Unit price is required"),
  taxPercentage: z.string().min(1, "Tax percentage is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface InvoiceItemsFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: any;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function InvoiceItemsFormSheet({
  open,
  onOpenChange,
  item,
  onSubmit,
  isSubmitting = false,
}: InvoiceItemsFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      description: "",
      taxCode: "",
      unitPrice: "",
      taxPercentage: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        itemName: item.itemName,
        description: item.description,
        taxCode: item.taxCode,
        unitPrice: item.unitPrice.toString(),
        taxPercentage: item.taxPercentage.toString(),
        status: item.status,
      });
    } else {
      form.reset({
        itemName: "",
        description: "",
        taxCode: "",
        unitPrice: "",
        taxPercentage: "",
        status: "Active",
      });
    }
  }, [item, form]);

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
            {item ? "Edit Invoice Item" : "Add Invoice Item"}
          </SheetTitle>
          <SheetDescription>
            {item
              ? "Update the invoice item information"
              : "Add a new invoice item"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Item Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Description *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="taxCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Tax Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tax code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Unit Price *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter unit price"
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
              name="taxPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Tax % *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter tax percentage"
                      {...field}
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
                    {item ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{item ? "Update Item" : "Add Item"}</>
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
