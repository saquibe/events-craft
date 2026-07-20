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
import { Track } from "@/lib/types/agenda";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Track name is required"),
  description: z.string().optional(),
});

interface TrackFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  track?: Track | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function TrackFormSheet({
  open,
  onOpenChange,
  track,
  onSubmit,
  isSubmitting = false,
}: TrackFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (track) {
      form.reset({
        name: track.name,
        description: track.description || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
      });
    }
  }, [track, form]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{track ? "Edit Track" : "Add Track"}</SheetTitle>
          <SheetDescription>
            {track
              ? "Update the track information"
              : "Add a new track for the event"}
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
                  <FormLabel className="text-default">Track Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter track name" {...field} />
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
                  <FormLabel className="text-default">
                    Description (optional)
                  </FormLabel>
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
                    {track ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{track ? "Update Track" : "Add Track"}</>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="cursor-pointer text-base"
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
