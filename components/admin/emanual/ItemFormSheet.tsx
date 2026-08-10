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
import { ItemCategory } from "@/lib/types/emanual";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";

const formSchema = z.object({
  itemCode: z.string().min(1, "Item code is required"),
  itemName: z.string().min(1, "Item name is required"),
  categoryId: z.string().min(1, "Category is required"),
  unitPrice: z.string().min(1, "Unit price is required"),
  taxPercentage: z.string().min(1, "Tax percentage is required"),
  openingStock: z.string().min(1, "Opening stock is required"),
  itemFor: z.enum(["eCom", "Form"]),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  logo: z.string().optional(),
});

interface ItemFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: any;
  categories: ItemCategory[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting?: boolean;
}

export function ItemFormSheet({
  open,
  onOpenChange,
  item,
  categories,
  onSubmit,
  isSubmitting = false,
}: ItemFormSheetProps) {
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
      itemCode: "",
      itemName: "",
      categoryId: "",
      unitPrice: "",
      taxPercentage: "",
      openingStock: "",
      itemFor: "eCom",
      status: "Active",
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        itemCode: item.itemCode,
        itemName: item.itemName,
        categoryId: item.categoryId,
        unitPrice: item.unitPrice.toString(),
        taxPercentage: item.taxPercentage.toString(),
        openingStock: item.openingStock.toString(),
        itemFor: item.itemFor,
        status: item.status,
      });
      setPreviewImage(item.photo || null);
    } else {
      form.reset({
        itemCode: "",
        itemName: "",
        categoryId: "",
        unitPrice: "",
        taxPercentage: "",
        openingStock: "",
        itemFor: "eCom",
        status: "Active",
      });
      setPreviewImage(null);
    }
  }, [item, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit({
      ...values,
      unitPrice: parseFloat(values.unitPrice),
      taxPercentage: parseFloat(values.taxPercentage),
      openingStock: parseInt(values.openingStock),
      photo: croppedImage || previewImage || "",
    });
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
    setPreviewImage(base64Image);

    form.setValue("logo", base64Image);
    setCroppedImage(base64Image);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{item ? "Edit Item" : "Add Item"}</SheetTitle>
          <SheetDescription>
            {item ? "Update the item information" : "Add a new additional item"}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 py-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="itemCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Item Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter item code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">Item Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter item name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Item Category *
                  </FormLabel>
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-default">
                      Unit Price ($) *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter unit price"
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
                    <FormLabel className="text-default">TAX (%) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter tax percentage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="openingStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">
                    Opening Stock *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter opening stock"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="itemFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-default">Item For *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select item for" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eCom">eCom</SelectItem>
                        <SelectItem value="Form">Form</SelectItem>
                      </SelectContent>
                    </Select>
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
                className="cursor-pointer text-base"
                color="primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {item ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>{item ? "Update Item" : "Add Item"}</>
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
