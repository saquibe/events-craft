// components/admin/onsite/BadgeSizeModal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import type { BadgeType } from "./BadgeDesignContext";

interface BadgeSizeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (config: {
    width: number;
    height: number;
    orientation: "portrait" | "landscape";
    unit: "mm" | "in";
    category: BadgeType;
    name: string;
  }) => void;
  onCancel: () => void;
}

const PRESET_SIZES = {
  A4: { width: 210, height: 297, label: "A4" },
  A5: { width: 148, height: 210, label: "A5" },
  A6: { width: 105, height: 148, label: "A6" },
  A7: { width: 74, height: 105, label: "A7" },
  A8: { width: 52, height: 74, label: "A8" },
};

const BADGE_CATEGORIES: { value: BadgeType; label: string; color: string }[] = [
  { value: "common", label: "Attendee", color: "bg-blue-100 text-blue-700" },
  {
    value: "delegate",
    label: "Delegate",
    color: "bg-purple-100 text-purple-700",
  },
  { value: "speaker", label: "Speaker", color: "bg-green-100 text-green-700" },
  {
    value: "exhibitor",
    label: "Exhibitor",
    color: "bg-orange-100 text-orange-700",
  },
  { value: "staff", label: "Staff", color: "bg-gray-100 text-gray-700" },
  { value: "sponsor", label: "Sponsor", color: "bg-pink-100 text-pink-700" },
  { value: "organizer", label: "Organizer", color: "bg-red-100 text-red-700" },
];

export function BadgeSizeModal({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: BadgeSizeModalProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>("A6");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );
  const [isCustom, setIsCustom] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(105);
  const [customHeight, setCustomHeight] = useState<number>(148);
  const [customUnit, setCustomUnit] = useState<"mm" | "in">("mm");

  // ✅ NEW: category + name
  const [category, setCategory] = useState<BadgeType>("common");
  const [badgeName, setBadgeName] = useState<string>("");

  const handleConfirm = () => {
    let width: number, height: number, unit: "mm" | "in";

    if (isCustom) {
      width = customWidth;
      height = customHeight;
      unit = customUnit;
    } else {
      const size = PRESET_SIZES[selectedPreset as keyof typeof PRESET_SIZES];
      width = size.width;
      height = size.height;
      unit = "mm";
    }

    const finalName =
      badgeName.trim() ||
      `${BADGE_CATEGORIES.find((c) => c.value === category)?.label} Badge`;

    onConfirm({
      width: orientation === "portrait" ? width : height,
      height: orientation === "portrait" ? height : width,
      orientation,
      unit,
      category,
      name: finalName,
    });
  };

  const currentSize = PRESET_SIZES[selectedPreset as keyof typeof PRESET_SIZES];

  const getSizeText = () => {
    let width: number, height: number;
    if (isCustom) {
      width = customWidth;
      height = customHeight;
    } else {
      const size = PRESET_SIZES[selectedPreset as keyof typeof PRESET_SIZES];
      width = size.width;
      height = size.height;
    }
    return orientation === "portrait"
      ? `${width}×${height}`
      : `${height}×${width}`;
  };

  const getDisplayLabel = () => {
    if (isCustom) {
      return `Custom (${customWidth} × ${customHeight} ${customUnit})`;
    }
    const size = PRESET_SIZES[selectedPreset as keyof typeof PRESET_SIZES];
    return orientation === "portrait"
      ? `${selectedPreset} (${size.width} × ${size.height} mm)`
      : `${selectedPreset} (${size.height} × ${size.width} mm)`;
  };

  const getFontSize = () => {
    const len = getSizeText().length;
    if (len <= 5) return "16px";
    if (len <= 7) return "14px";
    if (len <= 9) return "12px";
    return "10px";
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    const size = PRESET_SIZES[selectedPreset as keyof typeof PRESET_SIZES];
    setCustomWidth(size.width);
    setCustomHeight(size.height);
  };

  const handlePresetClick = () => setIsCustom(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Badge
          </DialogTitle>
          <DialogDescription>
            Choose the badge category, name, size and orientation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* ✅ NEW: Category + Name */}
          <div className="space-y-2">
            <Label className="text-default font-medium">
              Badge Category <span className="text-destructive">*</span>
            </Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as BadgeType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {BADGE_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${c.color}`}
                      >
                        {c.label}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-default font-medium">Badge Name</Label>
            <Input
              value={badgeName}
              onChange={(e) => setBadgeName(e.target.value)}
              placeholder={`${
                BADGE_CATEGORIES.find((c) => c.value === category)?.label
              } Badge`}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to use default name
            </p>
          </div>

          {/* Badge Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-default font-medium">Badge Size</Label>
              <div className="flex gap-1">
                <Button
                  variant={!isCustom ? "default" : "outline"}
                  color="primary"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={handlePresetClick}
                >
                  Preset
                </Button>
                <Button
                  variant={isCustom ? "default" : "outline"}
                  color="primary"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={handleCustomClick}
                >
                  Custom
                </Button>
              </div>
            </div>

            {!isCustom ? (
              <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size">
                    {getDisplayLabel()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                  <SelectItem value="A5">A5 (148 × 210 mm)</SelectItem>
                  <SelectItem value="A6">A6 (105 × 148 mm)</SelectItem>
                  <SelectItem value="A7">A7 (74 × 105 mm)</SelectItem>
                  <SelectItem value="A8">A8 (52 × 74 mm)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Width</Label>
                  <Input
                    type="number"
                    value={customWidth}
                    onChange={(e) =>
                      setCustomWidth(parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-sm"
                    min={20}
                    step={1}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Height
                  </Label>
                  <Input
                    type="number"
                    value={customHeight}
                    onChange={(e) =>
                      setCustomHeight(parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-sm"
                    min={20}
                    step={1}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Unit</Label>
                  <Select
                    value={customUnit}
                    onValueChange={(value: "mm" | "in") => setCustomUnit(value)}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">mm</SelectItem>
                      <SelectItem value="in">in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Orientation */}
          <div className="space-y-2">
            <Label className="text-default font-medium">Orientation</Label>
            <RadioGroup
              value={orientation}
              onValueChange={(value) =>
                setOrientation(value as "portrait" | "landscape")
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="portrait" id="portrait" />
                <Label htmlFor="portrait" className="cursor-pointer">
                  Portrait
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="landscape" id="landscape" />
                <Label htmlFor="landscape" className="cursor-pointer">
                  Landscape
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Preview */}
          <div className="mt-2 p-4 bg-muted/20 rounded-lg border">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Preview</Label>
              <span className="text-xs text-muted-foreground">
                {isCustom ? "Custom Size" : `Badge Size - ${selectedPreset}`}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-center">
              <div
                className="bg-white border rounded shadow-sm flex items-center justify-center overflow-hidden relative"
                style={{
                  width: orientation === "portrait" ? "140px" : "200px",
                  height: orientation === "portrait" ? "200px" : "140px",
                  aspectRatio: (() => {
                    let width: number, height: number;
                    if (isCustom) {
                      width = customWidth;
                      height = customHeight;
                    } else {
                      const size =
                        PRESET_SIZES[
                          selectedPreset as keyof typeof PRESET_SIZES
                        ];
                      width = size.width;
                      height = size.height;
                    }
                    return orientation === "portrait"
                      ? `${width}/${height}`
                      : `${height}/${width}`;
                  })(),
                }}
              >
                <div className="flex flex-col items-center justify-center p-1 w-full h-full">
                  <span
                    className="font-medium text-muted-foreground text-center leading-none"
                    style={{ fontSize: getFontSize() }}
                  >
                    {getSizeText()}
                  </span>
                  <span className="text-[8px] text-muted-foreground/60 mt-1">
                    {isCustom ? customUnit : "mm"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel} className="text-base">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="text-base" color="primary">
            Create Badge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
