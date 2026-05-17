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
            <Label className="text-foreground">Venue Name</Label>
            <Input
              value={formData.venueName}
              onChange={(e) =>
                setFormData({ ...formData, venueName: e.target.value })
              }
              placeholder="Enter venue name"
            />
          </div>

          <div>
            <Label className="text-foreground">Venue Address</Label>
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
            <Label className="text-foreground">City</Label>
            <Input
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder="City"
            />
          </div>

          <div>
            <Label className="text-foreground">Country</Label>
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
            <Label className="text-foreground">Website (Optional)</Label>
            <Input
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label className="text-foreground">Venue Image URL</Label>
            <Input
              value={formData.venueImage}
              onChange={(e) =>
                setFormData({ ...formData, venueImage: e.target.value })
              }
              placeholder="Image URL"
            />
          </div>

          <div>
            <Label className="text-foreground">
              Google Map Link (Optional)
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
            <Label className="text-foreground">Distance From</Label>
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
            <Label className="text-foreground">Status</Label>
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
