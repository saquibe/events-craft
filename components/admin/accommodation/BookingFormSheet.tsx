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
import { Booking, Hotel, RoomType } from "@/lib/types/accommodation";
import { Loader2 } from "lucide-react";
import { DatePicker } from "../common/DatePicker";

const formSchema = z.object({
  attendeeName: z.string().min(1, "Attendee name is required"),
  attendeeEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  hotelId: z.string().min(1, "Hotel is required"),
  roomTypeId: z.string().min(1, "Room type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z
    .enum(["Confirmed", "Pending", "Cancelled", "Checked-in", "Checked-out"])
    .default("Pending"),
});

interface BookingFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking?: Booking | null;
  hotels: Hotel[];
  roomTypes: RoomType[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function BookingFormSheet({
  open,
  onOpenChange,
  booking,
  hotels,
  roomTypes,
  onSubmit,
  isSubmitting = false,
}: BookingFormSheetProps) {
  const [filteredRoomTypes, setFilteredRoomTypes] = useState<RoomType[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendeeName: "",
      attendeeEmail: "",
      hotelId: "",
      roomTypeId: "",
      startDate: "",
      endDate: "",
      status: "Pending",
    },
  });

  useEffect(() => {
    if (booking) {
      form.reset({
        attendeeName: booking.attendeeName,
        attendeeEmail: booking.attendeeEmail || "",
        hotelId: booking.hotelId,
        roomTypeId: booking.roomTypeId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: booking.status,
      });
      // Filter room types for the selected hotel
      const filtered = roomTypes.filter((rt) => rt.hotelId === booking.hotelId);
      setFilteredRoomTypes(filtered);
    } else {
      form.reset({
        attendeeName: "",
        attendeeEmail: "",
        hotelId: "",
        roomTypeId: "",
        startDate: "",
        endDate: "",
        status: "Pending",
      });
      setFilteredRoomTypes([]);
    }
  }, [booking, form, roomTypes]);

  const handleHotelChange = (hotelId: string) => {
    form.setValue("hotelId", hotelId);
    form.setValue("roomTypeId", "");
    const filtered = roomTypes.filter((rt) => rt.hotelId === hotelId);
    setFilteredRoomTypes(filtered);
  };

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
          <SheetTitle>{booking ? "Edit Booking" : "Add Booking"}</SheetTitle>
          <SheetDescription>
            {booking
              ? "Update the booking information"
              : "Add a new room booking"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="attendeeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Attendee Name *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter attendee name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendeeEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Attendee Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hotelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Hotel Name *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={handleHotelChange}
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
              name="roomTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Room Type *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!form.watch("hotelId")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredRoomTypes.map((roomType) => (
                          <SelectItem key={roomType.id} value={roomType.id}>
                            {roomType.name} (${roomType.perNightCost}/night)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Checked-in">Checked-in</SelectItem>
                        <SelectItem value="Checked-out">Checked-out</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                    {booking ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{booking ? "Update Booking" : "Add Booking"}</>
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
