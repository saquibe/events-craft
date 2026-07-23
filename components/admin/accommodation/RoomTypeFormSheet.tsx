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
import { RoomType, Hotel } from "@/lib/types/accommodation";
import { Loader2 } from "lucide-react";
import { DatePicker } from "../common/DatePicker";

const formSchema = z.object({
  hotelId: z.string().min(1, "Hotel is required"),
  name: z.string().min(1, "Room name is required"),
  inventory: z.string().min(1, "Inventory is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  perNightCost: z.string().min(1, "Per night cost is required"),
  taxPercentage: z.string().min(1, "Tax percentage is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface RoomTypeFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomType?: RoomType | null;
  hotels: Hotel[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function RoomTypeFormSheet({
  open,
  onOpenChange,
  roomType,
  hotels,
  onSubmit,
  isSubmitting = false,
}: RoomTypeFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelId: "",
      name: "",
      inventory: "",
      startDate: "",
      endDate: "",
      perNightCost: "",
      taxPercentage: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (roomType) {
      form.reset({
        hotelId: roomType.hotelId,
        name: roomType.name,
        inventory: roomType.inventory.toString(),
        startDate: roomType.startDate,
        endDate: roomType.endDate,
        perNightCost: roomType.perNightCost.toString(),
        taxPercentage: roomType.taxPercentage.toString(),
        status: roomType.status,
      });
    } else {
      form.reset({
        hotelId: "",
        name: "",
        inventory: "",
        startDate: "",
        endDate: "",
        perNightCost: "",
        taxPercentage: "",
        status: "Active",
      });
    }
  }, [roomType, form]);

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
            {roomType ? "Edit Room Type" : "Add Room Type"}
          </SheetTitle>
          <SheetDescription>
            {roomType
              ? "Update the room type information"
              : "Add a new room type"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="hotelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Hotel Name *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hotel" />
                      </SelectTrigger>
                      <SelectContent>
                        {hotels.map((hotel) => (
                          <SelectItem key={hotel.id} value={hotel.id}>
                            {hotel.name}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Room Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter room name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inventory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Room Inventory *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter inventory"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Start Date *</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">End Date *</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="perNightCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Per Night Cost *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter cost"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Tax (%) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter tax" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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
                className="text-base cursor-pointer"
                color="primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {roomType ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{roomType ? "Update Room Type" : "Add Room Type"}</>
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
