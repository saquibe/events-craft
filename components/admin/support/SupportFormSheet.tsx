"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";

interface SupportFormData {
  module: string;
  details: string;
  uploadImage: string;
  status: "Open" | "In Progress" | "Closed";
}

interface SupportFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: SupportFormData) => void;
}

export function SupportFormSheet({
  open,
  onOpenChange,
  onSave,
}: SupportFormSheetProps) {
  const [formData, setFormData] = useState<SupportFormData>({
    module: "",
    details: "",
    uploadImage: "",
    status: "Open",
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

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

    setFormData({
      ...formData,
      uploadImage: base64Image,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      module: "",
      details: "",
      uploadImage: "",
      status: "Open",
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground">
            Create Support Ticket
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div>
            <Label className="text-foreground">
              Module <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.module}
              onValueChange={(value) =>
                setFormData({ ...formData, module: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Event Creation">Event Creation</SelectItem>
                <SelectItem value="User Management">User Management</SelectItem>
                <SelectItem value="Payment Issue">Payment Issue</SelectItem>
                <SelectItem value="Technical Support">
                  Technical Support
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground">
              Details <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder="Describe your issue"
              rows={5}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-foreground">Upload Image</Label>

            <Input
              className="cursor-pointer file:cursor-pointer"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  const imageUrl = URL.createObjectURL(file);

                  setSelectedImage(imageUrl);
                }
              }}
            />

            {selectedImage && (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-xl border border-border">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={1}
                  >
                    <img
                      ref={setImageRef}
                      src={selectedImage}
                      alt="Support"
                      className="max-h-[300px] w-full object-contain"
                    />
                  </ReactCrop>
                </div>

                <div className="flex justify-end">
                  <Button
                    color="primary"
                    onClick={handleCropSave}
                    className="cursor-pointer"
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

          <div>
            <Label className="text-foreground">
              Status <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as SupportFormData["status"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              color="primary"
              className="flex-1 cursor-pointer"
            >
              Create
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
