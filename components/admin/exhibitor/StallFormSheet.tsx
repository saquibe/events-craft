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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Stall, Hall, StallType } from "@/lib/types/exhibitor";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Stall name is required"),
  number: z.string().min(1, "Stall number is required"),
  size: z.string().min(1, "Stall size is required"),
  stallTypeId: z.string().min(1, "Stall type is required"),
  description: z.string().optional(),
  hallId: z.string().min(1, "Hall is required"),
  visibility: z.enum(["Visible", "Hidden"]).default("Visible"),
  availability: z
    .enum(["Reserved", "Onsale", "Blocked", "Sold"])
    .default("Onsale"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface StallFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stall?: Stall | null;
  halls: Hall[];
  stallTypes: StallType[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function StallFormSheet({
  open,
  onOpenChange,
  stall,
  halls,
  stallTypes,
  onSubmit,
  isSubmitting = false,
}: StallFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      size: "",
      stallTypeId: "",
      description: "",
      hallId: "",
      visibility: "Visible",
      availability: "Onsale",
      status: "Active",
    },
  });

  useEffect(() => {
    if (stall) {
      form.reset({
        name: stall.name,
        number: stall.number,
        size: stall.size.toString(),
        stallTypeId: stall.stallTypeId,
        description: stall.description || "",
        hallId: stall.hallId,
        visibility: stall.visibility,
        availability: stall.availability,
        status: stall.status,
      });
    } else {
      form.reset({
        name: "",
        number: "",
        size: "",
        stallTypeId: "",
        description: "",
        hallId: "",
        visibility: "Visible",
        availability: "Onsale",
        status: "Active",
      });
    }
  }, [stall, form]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{stall ? "Edit Stall" : "Add Stall"}</SheetTitle>
          <SheetDescription>
            {stall
              ? "Update the stall information"
              : "Add a new exhibition stall"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Stall Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter stall name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Stall Number *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter stall number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Stall Size (sqm) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter size"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stallTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Stall Type *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stall type" />
                        </SelectTrigger>
                        <SelectContent>
                          {stallTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="hallId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Hall Name *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hall" />
                      </SelectTrigger>
                      <SelectContent>
                        {halls.map((hall) => (
                          <SelectItem key={hall.id} value={hall.id}>
                            {hall.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    Stall Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-default">Visibility</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Visible" id="visible" />
                        <label htmlFor="visible">Visible</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Hidden" id="hidden" />
                        <label htmlFor="hidden">Hidden</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-default">Availability</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Reserved" id="reserved" />
                        <label htmlFor="reserved">Reserved</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Onsale" id="onsale" />
                        <label htmlFor="onsale">Onsale</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Blocked" id="blocked" />
                        <label htmlFor="blocked">Blocked</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sold" id="sold" />
                        <label htmlFor="sold">Sold</label>
                      </div>
                    </RadioGroup>
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
                className="text-base cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {stall ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{stall ? "Update Stall" : "Add Stall"}</>
                )}
              </Button>
              <Button
                className="text-base cursor-pointer"
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
