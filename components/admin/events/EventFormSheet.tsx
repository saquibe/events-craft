"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
import type { Event } from "../common/types";

interface EventFormData {
  eventName: string;
  eventLogo: string;
  venueName: string;
  timeZone: string;
  startDateTime: string;
  endDateTime: string;
  eventType: string;
  status: Event["status"];
}

interface EventFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingEvent: Event | null;
  venues: { id: string; venueName: string }[];
  onSave: (data: EventFormData) => void;
}

export function EventFormSheet({
  open,
  onOpenChange,
  editingEvent,
  venues,
  onSave,
}: EventFormSheetProps) {
  const [formData, setFormData] = useState<EventFormData>({
    eventName: "",
    eventLogo: "",
    venueName: "",
    timeZone: "IST",
    startDateTime: "",
    endDateTime: "",
    eventType: "",
    status: "Draft",
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        eventName: editingEvent.eventName,
        eventLogo: editingEvent.eventLogo,
        venueName: editingEvent.venueName,
        timeZone: editingEvent.timeZone,
        startDateTime: editingEvent.startDateTime,
        endDateTime: editingEvent.endDateTime,
        eventType: editingEvent.eventType,
        status: editingEvent.status,
      });
    } else {
      setFormData({
        eventName: "",
        eventLogo: "",
        venueName: "",
        timeZone: "IST",
        startDateTime: "",
        endDateTime: "",
        eventType: "",
        status: "Draft",
      });
    }
  }, [editingEvent]);

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
      eventLogo: base64Image,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground">
            {editingEvent ? "Edit Event" : "Create Event"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {/* Event Name */}
          <div>
            <Label className="text-foreground">
              Event Name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={formData.eventName}
              onChange={(e) =>
                setFormData({ ...formData, eventName: e.target.value })
              }
              placeholder="Enter event name"
            />
          </div>

          {/* Event Logo Upload */}
          <div className="space-y-3">
            <Label className="text-foreground">
              Event Logo <span className="text-destructive">*</span>
            </Label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  const imageUrl = URL.createObjectURL(file);

                  setSelectedImage(imageUrl);

                  setFormData({
                    ...formData,
                    eventLogo: imageUrl,
                  });
                }
              }}
            />

            {selectedImage && (
              <div className="space-y-3">
                {/* Crop Area */}
                <div className="overflow-hidden rounded-xl border border-default-200">
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    aspect={1}
                  >
                    <img
                      ref={setImageRef}
                      src={selectedImage}
                      alt="Event Logo"
                      className="max-h-[300px] w-full object-contain"
                    />
                  </ReactCrop>
                </div>
                <div className="flex justify-end pt-3">
                  <Button
                    onClick={handleCropSave}
                    color="primary"
                    className="cursor-pointer"
                  >
                    Save Crop
                  </Button>
                </div>

                {/* Preview */}
                <div className="flex justify-center">
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-default-200 bg-muted">
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

          {/* Venue */}
          <div>
            <Label className="text-foreground">
              Venue <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.venueName}
              onValueChange={(value) =>
                setFormData({ ...formData, venueName: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select venue" />
              </SelectTrigger>
              <SelectContent>
                {venues.map((venue) => (
                  <SelectItem key={venue.id} value={venue.venueName}>
                    {venue.venueName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Zone */}
          <div>
            <Label className="text-foreground">
              Event Time Zone <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.timeZone}
              onValueChange={(value) =>
                setFormData({ ...formData, timeZone: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                <SelectItem value="EST">EST (UTC-5)</SelectItem>
                <SelectItem value="PST">PST (UTC-8)</SelectItem>
                <SelectItem value="GMT">GMT (UTC+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date & Time */}
          <div>
            <Label className="text-foreground">
              Start Date & Time <span className="text-destructive">*</span>
            </Label>
            <Input
              type="datetime-local"
              value={formData.startDateTime}
              onChange={(e) =>
                setFormData({ ...formData, startDateTime: e.target.value })
              }
            />
          </div>

          {/* End Date & Time */}
          <div>
            <Label className="text-foreground">
              End Date & Time <span className="text-destructive">*</span>
            </Label>
            <Input
              type="datetime-local"
              value={formData.endDateTime}
              onChange={(e) =>
                setFormData({ ...formData, endDateTime: e.target.value })
              }
            />
          </div>

          {/* Event Type */}
          <div>
            <Label className="text-foreground">
              Event Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.eventType}
              onValueChange={(value) =>
                setFormData({ ...formData, eventType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Exhibition">Exhibition</SelectItem>
                <SelectItem value="Conference">Conference</SelectItem>
                {/* <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          {/* <div>
            <Label className="text-foreground">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as Event["status"] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Draft Deleted">Draft Deleted</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              color="primary"
              className="flex-1 cursor-pointer"
            >
              {editingEvent ? "Update" : "Create"}
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
