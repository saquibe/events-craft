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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Hall } from "@/lib/types/exhibitor";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Hall name is required"),
  floorPlan: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface ExhibitionHallFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hall?: Hall | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function ExhibitionHallFormSheet({
  open,
  onOpenChange,
  hall,
  onSubmit,
  isSubmitting = false,
}: ExhibitionHallFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      floorPlan: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (hall) {
      form.reset({
        name: hall.name,
        floorPlan: hall.floorPlan || "",
        status: hall.status,
      });
    } else {
      form.reset({
        name: "",
        floorPlan: "",
        status: "Active",
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
            {hall ? "Update the hall information" : "Add a new exhibition hall"}
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
              name="floorPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Upload Floor Plan (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" />
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
