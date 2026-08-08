"use client";

import { useEffect, useState } from "react";
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
import { Category } from "@/lib/types/abstract";
import { Loader2, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface CategoryFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function CategoryFormSheet({
  open,
  onOpenChange,
  category,
  onSubmit,
  isSubmitting = false,
}: CategoryFormSheetProps) {
  const [options, setOptions] = useState<string[]>(category?.options || []);
  const [newOption, setNewOption] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      status: category?.status || "Active",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        status: category.status,
      });
      setOptions(category.options || []);
    } else {
      form.reset({
        name: "",
        status: "Active",
      });
      setOptions([]);
    }
  }, [category, form]);

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (option: string) => {
    setOptions(options.filter((o) => o !== option));
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit({
      ...values,
      options,
    });
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{category ? "Edit Category" : "Add Category"}</SheetTitle>
          <SheetDescription>
            {category
              ? "Update the category information"
              : "Add a new abstract category"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Category Name *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel className="text-default">Options</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter option name"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddOption()}
                />
                <Button
                  className="p-4"
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={handleAddOption}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {options.map((option) => (
                    <Badge
                      key={option}
                      color="secondary"
                      className="flex items-center gap-1"
                    >
                      {option}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveOption(option)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
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
