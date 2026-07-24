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
import { Hall } from "@/lib/types/exhibitor";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";

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

    form.setValue("floorPlan", base64Image);
    setCroppedImage(base64Image);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
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
                    Upload Floor Plan
                  </FormLabel>

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
                              aspect={1}
                              className="pointer-events-auto"
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
                            <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-border bg-muted">
                              <Image
                                src={croppedImage || selectedImage}
                                alt="Preview"
                                fill
                                className="object-cover"
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
