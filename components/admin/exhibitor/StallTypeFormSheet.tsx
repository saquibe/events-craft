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
import { StallType } from "@/lib/types/exhibitor";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Stall type name is required"),
  description: z.string().optional(),
});

interface StallTypeFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stallType?: StallType | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function StallTypeFormSheet({
  open,
  onOpenChange,
  stallType,
  onSubmit,
  isSubmitting = false,
}: StallTypeFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (stallType) {
      form.reset({
        name: stallType.name,
        description: stallType.description || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
      });
    }
  }, [stallType, form]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {stallType ? "Edit Stall Type" : "Add Stall Type"}
          </SheetTitle>
          <SheetDescription>
            {stallType
              ? "Update the stall type information"
              : "Add a new stall type"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stall Type Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter stall type name" {...field} />
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
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {stallType ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{stallType ? "Update Stall Type" : "Add Stall Type"}</>
                )}
              </Button>
              <Button
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
