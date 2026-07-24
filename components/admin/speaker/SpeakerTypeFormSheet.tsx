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
import type { SpeakerType } from "@/lib/types/speaker";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Type name is required"),
  description: z.string().optional(),
});

interface SpeakerTypeFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: SpeakerType | null;
  onSubmit: (data: { name: string; description?: string }) => Promise<void>;
  isSubmitting?: boolean;
}

export function SpeakerTypeFormSheet({
  open,
  onOpenChange,
  type,
  onSubmit,
  isSubmitting = false,
}: SpeakerTypeFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (type) {
      form.reset({
        name: type.name,
        description: type.description || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
      });
    }
  }, [type, form]);

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
            {type ? "Edit Speaker Type" : "Add Speaker Type"}
          </SheetTitle>
          <SheetDescription>
            {type
              ? "Update the speaker type information"
              : "Add a new speaker type category"}
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
                  <FormLabel className="text-default">Type Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter type name" {...field} />
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
                    {type ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{type ? "Update Type" : "Add Type"}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer text-base"
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
