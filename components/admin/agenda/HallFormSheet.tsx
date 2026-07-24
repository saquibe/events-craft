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
import { Hall } from "@/lib/types/agenda";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Hall name is required"),
  capacity: z.string().optional(),
  description: z.string().optional(),
});

interface HallFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hall?: Hall | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function HallFormSheet({
  open,
  onOpenChange,
  hall,
  onSubmit,
  isSubmitting = false,
}: HallFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      capacity: "",
      description: "",
    },
  });

  useEffect(() => {
    if (hall) {
      form.reset({
        name: hall.name,
        capacity: hall.capacity?.toString() || "",
        description: hall.description || "",
      });
    } else {
      form.reset({
        name: "",
        capacity: "",
        description: "",
      });
    }
  }, [hall, form]);

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
          <SheetTitle>{hall ? "Edit Hall" : "Add Hall"}</SheetTitle>
          <SheetDescription>
            {hall
              ? "Update the hall information"
              : "Add a new hall for the event"}
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
                  <FormLabel className="text-default">Hall Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter hall name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter capacity"
                      {...field}
                    />
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
                  <FormLabel className="text-default">Description</FormLabel>
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
              <Button
                type="submit"
                disabled={isSubmitting}
                color="primary"
                className="cursor-pointer text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {hall ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{hall ? "Update Hall" : "Add Hall"}</>
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
