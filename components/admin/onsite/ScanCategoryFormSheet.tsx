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
import { Switch } from "@/components/ui/switch";
import { ScanCategory } from "@/lib/types/onsite";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Scan category name is required"),
  scanCode: z.string().min(1, "Scan code is required"),
  description: z.string().optional(),
  scanMode: z.enum(["Single", "Multi"]).default("Single"),
  allowReentry: z.boolean().default(false),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface ScanCategoryFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ScanCategory | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function ScanCategoryFormSheet({
  open,
  onOpenChange,
  category,
  onSubmit,
  isSubmitting = false,
}: ScanCategoryFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      scanCode: "",
      description: "",
      scanMode: "Single",
      allowReentry: false,
      status: "Active",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        scanCode: category.scanCode,
        description: category.description || "",
        scanMode: category.scanMode,
        allowReentry: category.allowReentry,
        status: category.status,
      });
    } else {
      form.reset({
        name: "",
        scanCode: "",
        description: "",
        scanMode: "Single",
        allowReentry: false,
        status: "Active",
      });
    }
  }, [category, form]);

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
            {category ? "Edit Scan Category" : "Add Scan Category"}
          </SheetTitle>
          <SheetDescription>
            {category
              ? "Update the scan category information"
              : "Add a new scan category"}
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
                    <FormLabel className="text-default">
                      Scan Category *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scanCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Scan Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter scan code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scanMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Scan Mode *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select scan mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single Scan</SelectItem>
                        <SelectItem value="Multi">Multi Scan</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-default">Allow Re-entry</FormLabel>
                <p className="text-xs text-muted-foreground">
                  Allow attendees to scan multiple times
                </p>
              </div>
              <FormField
                control={form.control}
                name="allowReentry"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Status *</FormLabel>
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
                    {category ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{category ? "Update Category" : "Add Category"}</>
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
