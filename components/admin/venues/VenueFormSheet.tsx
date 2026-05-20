"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import type { Venue } from "./types";

interface VenueFormData {
  venueName: string;
  venueAddress: string;
  city: string;
  country: string;
  website: string;
  venueImage: string;
  googleMapLink: string;
  distanceFrom: { from: string; unit: string }[];
  status: Venue["status"];
}

interface VenueFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingVenue: Venue | null;
  onSave: (data: VenueFormData) => void;
}

export function VenueFormSheet({
  open,
  onOpenChange,
  editingVenue,
  onSave,
}: VenueFormSheetProps) {
  const [formData, setFormData] = useState<VenueFormData>({
    venueName: "",
    venueAddress: "",
    city: "",
    country: "",
    website: "",
    venueImage: "",
    googleMapLink: "",
    distanceFrom: [{ from: "", unit: "" }],
    status: "Active",
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

  useEffect(() => {
    if (editingVenue) {
      setFormData({
        venueName: editingVenue.venueName,
        venueAddress: editingVenue.venueAddress,
        city: editingVenue.city,
        country: editingVenue.country,
        website: editingVenue.website,
        venueImage: editingVenue.venueImage,
        googleMapLink: editingVenue.googleMapLink,
        distanceFrom: editingVenue.distanceFrom,
        status: editingVenue.status,
      });
    } else {
      setFormData({
        venueName: "",
        venueAddress: "",
        city: "",
        country: "",
        website: "",
        venueImage: "",
        googleMapLink: "",
        distanceFrom: [{ from: "", unit: "" }],
        status: "Active",
      });
    }
  }, [editingVenue]);

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
      venueImage: base64Image,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const addDistanceField = () => {
    setFormData({
      ...formData,
      distanceFrom: [...formData.distanceFrom, { from: "", unit: "" }],
    });
  };

  const removeDistanceField = (index: number) => {
    setFormData({
      ...formData,
      distanceFrom: formData.distanceFrom.filter((_, i) => i !== index),
    });
  };

  const updateDistanceField = (
    index: number,
    field: "from" | "unit",
    value: string,
  ) => {
    const newDistances = [...formData.distanceFrom];
    newDistances[index][field] = value;
    setFormData({ ...formData, distanceFrom: newDistances });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground">
            {editingVenue ? "Edit Venue" : "Add Venue"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div>
            <Label className="text-foreground">
              Venue Name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={formData.venueName}
              onChange={(e) =>
                setFormData({ ...formData, venueName: e.target.value })
              }
              placeholder="Enter venue name"
            />
          </div>

          <div>
            <Label className="text-foreground">
              Venue Address <span className="text-destructive">*</span>
            </Label>
            <Textarea
              value={formData.venueAddress}
              onChange={(e) =>
                setFormData({ ...formData, venueAddress: e.target.value })
              }
              placeholder="Enter full address"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-foreground">
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder="City"
            />
          </div>

          <div>
            <Label className="text-foreground">
              Country <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) =>
                setFormData({ ...formData, country: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="UAE">UAE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground">Website</Label>
            <Input
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-foreground">Venue Image</Label>

            <Input
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
                {/* Crop Area */}
                <div className="overflow-hidden rounded-xl border border-border">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={1}
                  >
                    <img
                      ref={setImageRef}
                      src={selectedImage}
                      alt="Venue"
                      className="max-h-[300px] w-full object-contain"
                    />
                  </ReactCrop>
                </div>

                {/* Save Crop Button */}
                <div className="flex justify-end">
                  <Button
                    color="primary"
                    onClick={handleCropSave}
                    className="cursor-pointer"
                  >
                    Save Crop
                  </Button>
                </div>

                {/* Preview */}
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
              Google Map Link <span className="text-destructive">*</span>
            </Label>
            <Input
              value={formData.googleMapLink}
              onChange={(e) =>
                setFormData({ ...formData, googleMapLink: e.target.value })
              }
              placeholder="Google Maps URL"
            />
          </div>

          <div>
            <div className="mb-2">
              <Label className="text-foreground">
                Distance From <span className="text-destructive">*</span>
              </Label>
            </div>

            {formData.distanceFrom.map((dist, idx) => (
              <div key={idx} className="flex gap-2 mt-2">
                <Input
                  placeholder="Location"
                  value={dist.from}
                  onChange={(e) =>
                    updateDistanceField(idx, "from", e.target.value)
                  }
                />

                <Input
                  placeholder="Distance"
                  value={dist.unit}
                  onChange={(e) =>
                    updateDistanceField(idx, "unit", e.target.value)
                  }
                />

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeDistanceField(idx)}
                  className="cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              size="sm"
              variant="outline"
              className="mt-2 cursor-pointer"
              onClick={addDistanceField}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Distance
            </Button>
          </div>

          <div>
            <Label className="text-foreground">
              Status <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as Venue["status"] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              color="primary"
              className="flex-1 cursor-pointer"
            >
              {editingVenue ? "Update" : "Create"}
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
