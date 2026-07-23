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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Hotel } from "@/lib/types/accommodation";
import { Loader2, Plus, X } from "lucide-react";
import { DateTimePicker } from "../common/DateTimePicker";

const formSchema = z.object({
  name: z.string().min(1, "Hotel name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  starCategory: z.enum(["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"]),
  images: z.array(z.string()).default([]),
  googleMap: z.string().min(1, "Google Map link is required"),
  checkInTime: z.string().min(1, "Check-in time is required"),
  checkOutTime: z.string().min(1, "Check-out time is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface HotelFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel?: Hotel | null;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function HotelFormSheet({
  open,
  onOpenChange,
  hotel,
  onSubmit,
  isSubmitting = false,
}: HotelFormSheetProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      country: "",
      website: "",
      starCategory: "3 Star",
      images: [],
      googleMap: "",
      checkInTime: "",
      checkOutTime: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (hotel) {
      form.reset({
        name: hotel.name,
        address: hotel.address,
        city: hotel.city,
        country: hotel.country,
        website: hotel.website || "",
        starCategory: hotel.starCategory,
        images: hotel.images || [],
        googleMap: hotel.googleMap,
        checkInTime: hotel.checkInTime,
        checkOutTime: hotel.checkOutTime,
        status: hotel.status,
      });
      setImageUrls(hotel.images || []);
    } else {
      form.reset({
        name: "",
        address: "",
        city: "",
        country: "",
        website: "",
        starCategory: "3 Star",
        images: [],
        googleMap: "",
        checkInTime: "",
        checkOutTime: "",
        status: "Active",
      });
      setImageUrls([]);
    }
  }, [hotel, form]);

  const handleAddImage = () => {
    if (currentImageUrl && !imageUrls.includes(currentImageUrl)) {
      const updated = [...imageUrls, currentImageUrl];
      setImageUrls(updated);
      form.setValue("images", updated);
      setCurrentImageUrl("");
    }
  };

  const handleRemoveImage = (url: string) => {
    const updated = imageUrls.filter((u) => u !== url);
    setImageUrls(updated);
    form.setValue("images", updated);
  };

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
          <SheetTitle>{hotel ? "Edit Hotel" : "Add Hotel"}</SheetTitle>
          <SheetDescription>
            {hotel
              ? "Update the hotel information"
              : "Add a new hotel for accommodation"}
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
                  <FormLabel className="text-default">Hotel Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter hotel name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Hotel Address *
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter hotel address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">City *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Country *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="starCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Star Category *
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select star category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 Star">1 Star</SelectItem>
                        <SelectItem value="2 Star">2 Star</SelectItem>
                        <SelectItem value="3 Star">3 Star</SelectItem>
                        <SelectItem value="4 Star">4 Star</SelectItem>
                        <SelectItem value="5 Star">5 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hotel Images */}
            <div className="space-y-2">
              <FormLabel className="text-default">Hotel Images *</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter image URL"
                  value={currentImageUrl}
                  onChange={(e) => setCurrentImageUrl(e.target.value)}
                />
                <Button
                  className="p-4"
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={handleAddImage}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {imageUrls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-muted rounded-lg p-1"
                    >
                      <span className="text-xs truncate max-w-[150px]">
                        {url}
                      </span>
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveImage(url)}
                      />
                    </div>
                  ))}
                </div>
              )}
              <FormMessage />
            </div>

            <FormField
              control={form.control}
              name="googleMap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Google Map Link *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Google Map embed URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="checkInTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Check-in Date & Time *
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker
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
                name="checkOutTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Check-out Date & Time *
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker
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
                    {hotel ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{hotel ? "Update Hotel" : "Add Hotel"}</>
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
