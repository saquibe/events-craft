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
import { Loader2 } from "lucide-react";
import { RichTextEditor } from "@/components/rich-text-editor";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  termsAndConditions: z.string().min(1, "Terms and conditions are required"),
  note: z.string().min(1, "Note is required"),
});

interface InvoiceNoteFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note?: any;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function InvoiceNoteFormSheet({
  open,
  onOpenChange,
  note,
  onSubmit,
  isSubmitting = false,
}: InvoiceNoteFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      termsAndConditions: "",
      note: "",
    },
  });

  useEffect(() => {
    if (note) {
      form.reset({
        title: note.title,
        termsAndConditions: note.termsAndConditions,
        note: note.note,
      });
    } else {
      form.reset({
        title: "",
        termsAndConditions: "",
        note: "",
      });
    }
  }, [note, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {note ? "Edit Invoice Note" : "Add Invoice Note"}
          </SheetTitle>
          <SheetDescription>
            {note
              ? "Update the invoice note information"
              : "Add a new invoice note"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter note title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termsAndConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Terms and Conditions *
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter terms and conditions..."
                      minHeight="150px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Note *</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter additional notes..."
                      minHeight="150px"
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
                className="cursor-pointer text-base"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {note ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{note ? "Update Note" : "Add Note"}</>
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
