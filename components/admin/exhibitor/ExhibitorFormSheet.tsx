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
import { Checkbox } from "@/components/ui/checkbox";
import { Exhibitor, Category, Hall, Stall } from "@/lib/types/exhibitor";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  categoryId: z.string().min(1, "Category is required"),
  logo: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  taxId: z.string().optional(),
  hallId: z.string().min(1, "Hall is required"),
  stallId: z.string().min(1, "Stall is required"),
  contactFirstName: z.string().min(1, "Contact first name is required"),
  contactLastName: z.string().min(1, "Contact last name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactMobile: z.string().optional(),
  activityModule: z.object({
    attendeeRegistration: z.boolean().default(false),
    visitorRegistration: z.boolean().default(false),
    exhibitorBadge: z.boolean().default(false),
    meetingPlanner: z.boolean().default(false),
    leadManagement: z.boolean().default(false),
    inquiries: z.boolean().default(false),
    promotionalBanner: z.boolean().default(false),
    exhibitorManual: z.boolean().default(false),
  }),
  brandingModule: z.object({
    videoQuota: z.boolean().default(false),
    productServiceQuota: z.boolean().default(false),
  }),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  sendEmail: z.boolean().default(false),
});

interface ExhibitorFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exhibitor?: Exhibitor | null;
  categories: Category[];
  halls: Hall[];
  stalls: Stall[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function ExhibitorFormSheet({
  open,
  onOpenChange,
  exhibitor,
  categories,
  halls,
  stalls,
  onSubmit,
  isSubmitting = false,
}: ExhibitorFormSheetProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      categoryId: "",
      logo: "",
      address: "",
      taxId: "",
      hallId: "",
      stallId: "",
      contactFirstName: "",
      contactLastName: "",
      contactEmail: "",
      contactMobile: "",
      activityModule: {
        attendeeRegistration: false,
        visitorRegistration: false,
        exhibitorBadge: false,
        meetingPlanner: false,
        leadManagement: false,
        inquiries: false,
        promotionalBanner: false,
        exhibitorManual: false,
      },
      brandingModule: {
        videoQuota: false,
        productServiceQuota: false,
      },
      status: "Active",
      sendEmail: false,
    },
  });

  useEffect(() => {
    if (exhibitor) {
      form.reset({
        companyName: exhibitor.companyName,
        categoryId: exhibitor.categoryId,
        logo: exhibitor.logo || "",
        address: exhibitor.address,
        taxId: exhibitor.taxId || "",
        hallId: exhibitor.hallId,
        stallId: exhibitor.stallId,
        contactFirstName: exhibitor.contactFirstName,
        contactLastName: exhibitor.contactLastName,
        contactEmail: exhibitor.contactEmail,
        contactMobile: exhibitor.contactMobile || "",
        activityModule: exhibitor.activityModule,
        brandingModule: exhibitor.brandingModule,
        status: exhibitor.status,
        sendEmail: exhibitor.sendEmail,
      });
    } else {
      form.reset({
        companyName: "",
        categoryId: "",
        logo: "",
        address: "",
        taxId: "",
        hallId: "",
        stallId: "",
        contactFirstName: "",
        contactLastName: "",
        contactEmail: "",
        contactMobile: "",
        activityModule: {
          attendeeRegistration: false,
          visitorRegistration: false,
          exhibitorBadge: false,
          meetingPlanner: false,
          leadManagement: false,
          inquiries: false,
          promotionalBanner: false,
          exhibitorManual: false,
        },
        brandingModule: {
          videoQuota: false,
          productServiceQuota: false,
        },
        status: "Active",
        sendEmail: false,
      });
    }
  }, [exhibitor, form]);

  // Filter stalls based on selected hall
  const filteredStalls = stalls.filter(
    (stall) => stall.hallId === form.watch("hallId"),
  );

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
            {exhibitor ? "Edit Exhibitor" : "Add Exhibitor"}
          </SheetTitle>
          <SheetDescription>
            {exhibitor
              ? "Update the exhibitor information"
              : "Add a new exhibitor to the event"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Basic Information</h4>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Company Name *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">Category *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
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
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Upload Logo (Optional)
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Address *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Tax ID (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tax ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Hall & Stall Selection */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Hall & Stall Assignment</h4>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hallId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Hall Name *
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue("stallId", "");
                          }}
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
                  name="stallId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Stall Name *
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!form.watch("hallId")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select stall" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredStalls.map((stall) => (
                              <SelectItem key={stall.id} value={stall.id}>
                                {stall.name} ({stall.number})
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
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Contact Information</h4>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Contact First Name *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Contact Last Name *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Contact Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactMobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-default">
                        Contact Mobile (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Activity Module */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Activity Module</h4>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="activityModule.attendeeRegistration"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Attendee Registration (Conference)
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activityModule.visitorRegistration"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Visitor Registration (Exhibition)
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activityModule.exhibitorBadge"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Exhibitor Badge (Stall Manager)
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activityModule.meetingPlanner"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Meeting Planner
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activityModule.leadManagement"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Lead Management
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activityModule.inquiries"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Inquiries
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activityModule.promotionalBanner"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Promotional Banner
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activityModule.exhibitorManual"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Exhibitor Manual
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Branding Module */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Branding Module</h4>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="brandingModule.videoQuota"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Video Quota
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brandingModule.productServiceQuota"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-default cursor-pointer">
                        Product/Service Quota
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Status & Email */}
            <div className="grid grid-cols-2 gap-4">
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
                          <SelectValue
                            className="text-default"
                            placeholder="Select status"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-default" value="Active">
                            Active
                          </SelectItem>
                          <SelectItem className="text-default" value="Inactive">
                            Inactive
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sendEmail"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0 pt-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-default cursor-pointer">
                      Send Email
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

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
                    {exhibitor ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{exhibitor ? "Update Exhibitor" : "Add Exhibitor"}</>
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
