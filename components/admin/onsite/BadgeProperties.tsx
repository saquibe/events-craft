// components/admin/onsite/badge-design/BadgeProperties.tsx
"use client";

import { BadgeTemplate, BadgeField } from "./BadgeDesignContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Trash2,
  RefreshCw,
  Type,
  Image as ImageIcon,
  QrCode,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RichTextEditor } from "@/components/rich-text-editor";

interface BadgePropertiesProps {
  template: BadgeTemplate;
  selectedField: BadgeField | null;
  onFieldUpdate: (fieldId: string, updates: Partial<BadgeField>) => void;
  onFieldDelete: (fieldId: string) => void;
  onBackgroundChange: (background: any) => void;
  isMobile?: boolean;
}

const FONT_SIZES = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72,
];
const FONT_FAMILIES = [
  "Arial",
  "Helvetica",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Courier New",
  "Impact",
];
const FONT_WEIGHTS = [
  "normal",
  "bold",
  "lighter",
  "bolder",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];

export function BadgeProperties({
  template,
  selectedField,
  onFieldUpdate,
  onFieldDelete,
  onBackgroundChange,
  isMobile = false,
}: BadgePropertiesProps) {
  if (!selectedField) {
    return (
      <div className="p-4 bg-muted/20 rounded-lg border">
        <h4 className="font-medium mb-2">Properties</h4>
        <div className="text-sm text-muted-foreground text-center py-8">
          Select a field to edit its properties
        </div>

        <div className="mt-4 pt-4 border-t">
          <h5 className="font-medium text-sm mb-2">Background Settings</h5>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Background Type</Label>
              <Select
                value={template.background.type}
                onValueChange={(value: any) =>
                  onBackgroundChange({ ...template.background, type: value })
                }
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="color">Color</SelectItem>
                  <SelectItem value="gradient">Gradient</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {template.background.type === "color" && (
              <div>
                <Label className="text-xs">Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={template.background.value || "#ffffff"}
                    onChange={(e) =>
                      onBackgroundChange({
                        ...template.background,
                        value: e.target.value,
                      })
                    }
                    className="w-12 h-8 p-0"
                  />
                  <Input
                    type="text"
                    value={template.background.value || "#ffffff"}
                    onChange={(e) =>
                      onBackgroundChange({
                        ...template.background,
                        value: e.target.value,
                      })
                    }
                    className="flex-1 h-8 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (key: keyof BadgeField, value: any) => {
    onFieldUpdate(selectedField.id, { [key]: value });
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case "text":
        return <Type className="h-4 w-4" />;
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "qr":
        return <QrCode className="h-4 w-4" />;
      case "rectangle":
        return <Square className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "p-4 bg-muted/20 rounded-lg border",
        isMobile && "overflow-y-auto max-h-[70vh]",
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getFieldIcon(selectedField.type)}
          <h4 className="font-medium">
            {selectedField.label || selectedField.type} Properties
          </h4>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => handleChange("isVisible", !selectedField.isVisible)}
            title="Toggle visibility"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <Button
            color="destructive"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => onFieldDelete(selectedField.id)}
            title="Delete field"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Visible</Label>
          <Switch
            checked={selectedField.isVisible}
            onCheckedChange={(checked) => handleChange("isVisible", checked)}
          />
        </div>

        <div>
          <Label className="text-xs">Label</Label>
          <Input
            value={selectedField.label}
            onChange={(e) => handleChange("label", e.target.value)}
            className="h-8 text-xs"
          />
        </div>

        {selectedField.type === "text" && (
          <>
            <div>
              <Label className="text-xs">Content</Label>
              <RichTextEditor
                value={selectedField.content || ""}
                onChange={(value) => handleChange("content", value)}
                placeholder="Type your text here..."
                minHeight="120px"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs">Alignment</Label>
              <Select
                value={selectedField.alignment || "center"}
                onValueChange={(value: any) => handleChange("alignment", value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {selectedField.type === "qr" && (
          <div>
            <Label className="text-xs">QR Code Content</Label>
            <Input
              value={selectedField.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="h-8 text-xs"
              placeholder="Enter URL or text for QR code"
            />
          </div>
        )}

        {selectedField.type === "image" && (
          <div>
            <Label className="text-xs">Image URL</Label>
            <Input
              value={selectedField.imageUrl || ""}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              className="h-8 text-xs"
              placeholder="https://example.com/image.png"
            />
          </div>
        )}

        {selectedField.type === "rectangle" && (
          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="text-xs">Border Color</Label>
              <Input
                type="color"
                value={selectedField.color || "#6b7280"}
                onChange={(e) => handleChange("color", e.target.value)}
                className="w-full h-8 p-0"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs">Fill Color</Label>
              <Input
                type="color"
                value={selectedField.backgroundColor || "#e5e7eb"}
                onChange={(e) =>
                  handleChange("backgroundColor", e.target.value)
                }
                className="w-full h-8 p-0"
              />
            </div>
          </div>
        )}

        <div className="pt-2 border-t">
          <Label className="text-xs font-medium">Position & Size</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <Label className="text-xs">X Position</Label>
              <Input
                type="number"
                value={Math.round(selectedField.x)}
                onChange={(e) =>
                  handleChange("x", parseFloat(e.target.value) || 0)
                }
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Y Position</Label>
              <Input
                type="number"
                value={Math.round(selectedField.y)}
                onChange={(e) =>
                  handleChange("y", parseFloat(e.target.value) || 0)
                }
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Width</Label>
              <Input
                type="number"
                value={Math.round(selectedField.width)}
                onChange={(e) =>
                  handleChange("width", parseFloat(e.target.value) || 0)
                }
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Height</Label>
              <Input
                type="number"
                value={Math.round(selectedField.height)}
                onChange={(e) =>
                  handleChange("height", parseFloat(e.target.value) || 0)
                }
                className="h-8 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground bg-muted/30 p-2 rounded">
          💡 Drag corners or edges to resize. Drag the field itself to
          reposition.
          <br />
          Press{" "}
          <kbd className="px-1 py-0.5 bg-background rounded text-[9px]">
            Delete
          </kbd>{" "}
          to remove this field.
        </div>
      </div>
    </div>
  );
}
