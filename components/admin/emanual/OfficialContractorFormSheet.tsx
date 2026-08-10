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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { contractorCategories } from "@/lib/data/contractor-categories";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  category: z.string().min(1, "Category is required"),
  logo: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  contactFirstName: z.string().min(1, "Contact first name is required"),
  contactLastName: z.string().min(1, "Contact last name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactMobile: z.string().optional(),
  sendEmail: z.boolean().default(false),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

interface OfficialContractorFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contractor?: any;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function OfficialContractorFormSheet({
  open,
  onOpenChange,
  contractor,
  onSubmit,
  isSubmitting = false,
}: OfficialContractorFormSheetProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      category: "",
      logo: "",
      address: "",
      contactFirstName: "",
      contactLastName: "",
      contactEmail: "",
      contactMobile: "",
      sendEmail: false,
      status: "Active",
    },
  });

  useEffect(() => {
    if (contractor) {
      form.reset({
        companyName: contractor.companyName,
        category: contractor.category,
        logo: contractor.logo || "",
        address: contractor.address,
        contactFirstName: contractor.contactFirstName,
        contactLastName: contractor.contactLastName,
        contactEmail: contractor.contactEmail,
        contactMobile: contractor.contactMobile || "",
        sendEmail: contractor.sendEmail,
        status: contractor.status,
      });
      setPreviewImage(contractor.logo || null);
    } else {
      form.reset({
        companyName: "",
        category: "",
        logo: "",
        address: "",
        contactFirstName: "",
        contactLastName: "",
        contactEmail: "",
        contactMobile: "",
        sendEmail: false,
        status: "Active",
      });
      setPreviewImage(null);
    }
  }, [contractor, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        form.setValue("logo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  const handleCropSave = async () => {
    if (!imageRef || !crop.width || !crop.height) return;

    const canvas = document.createElement("canvas");

    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      imageRef,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    const base64Image = canvas.toDataURL("image/jpeg");

    setCroppedImage(base64Image);

    form.setValue("logo", base64Image);
    setCroppedImage(base64Image);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {contractor
              ? "Edit Official Contractor"
              : "Add Official Contractor"}
          </SheetTitle>
          <SheetDescription>
            {contractor
              ? "Update the contractor information"
              : "Add a new official contractor"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            {/* Logo */}
            {/* <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={previewImage || undefined} />
                <AvatarFallback className="text-2xl">
                  {form.watch("companyName")?.[0] || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("logo-upload")?.click()
                  }
                >
                  Upload Logo
                </Button>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max 2MB
                </p>
              </div>
            </div> */}

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Company Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
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
                        {contractorCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
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
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Upload Logo</FormLabel>

                  <FormControl>
                    <div className="space-y-3">
                      <Input
                        type="file"
                        accept="image/*"
                        className="cursor-pointer file:cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (!file) return;

                          const imageUrl = URL.createObjectURL(file);
                          setSelectedImage(imageUrl);
                        }}
                      />

                      {selectedImage && (
                        <div className="space-y-3">
                          <div className="overflow-hidden rounded-xl border border-border">
                            <ReactCrop
                              crop={crop}
                              onChange={(c) => setCrop(c)}
                              aspect={16 / 9}
                            >
                              <img
                                ref={setImageRef}
                                src={selectedImage}
                                alt="Logo"
                                className="max-h-[300px] w-full object-contain"
                              />
                            </ReactCrop>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              type="button"
                              color="primary"
                              className="cursor-pointer"
                              onClick={handleCropSave}
                            >
                              Save Crop
                            </Button>
                          </div>

                          <div className="flex justify-center">
                            <div className="relative h-24 w-40 overflow-hidden rounded-xl border border-border bg-muted">
                              <Image
                                src={croppedImage || selectedImage}
                                alt="Preview"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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
                      <Input placeholder="First name" {...field} />
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
                      <Input placeholder="Last name" {...field} />
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
                      Contact Login Email *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email address"
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
                      Contact Mobile
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-default">Send Email</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Send confirmation email to contractor
                </p>
              </div>
              <FormField
                control={form.control}
                name="sendEmail"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

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
                className="cursor-pointer text-base"
                color="primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {contractor ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{contractor ? "Update Contractor" : "Add Contractor"}</>
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
