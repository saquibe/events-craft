// components/admin/onsite/badge-design/BadgeToolbar.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Type,
  Image as ImageIcon,
  QrCode,
  Square,
  Layers,
  Palette,
  Upload,
} from "lucide-react";

interface BadgeToolbarProps {
  onAddField: (fieldType: string) => void;
}

export function BadgeToolbar({ onAddField }: BadgeToolbarProps) {
  const tools = [
    { id: "text", label: "Text", icon: Type },
    { id: "image", label: "Image", icon: ImageIcon },
    { id: "qr", label: "QR Code", icon: QrCode },
    { id: "rectangle", label: "Rectangle", icon: Square },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/20 rounded-lg border">
      <div className="flex items-center gap-1 text-sm font-medium mr-2">
        <Layers className="h-4 w-4" />
        <span>Add Elements</span>
      </div>

      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant="outline"
          size="sm"
          className="gap-1 text-xs h-8"
          onClick={() => onAddField(tool.id)}
        >
          <tool.icon className="h-3.5 w-3.5" />
          {tool.label}
        </Button>
      ))}

      <div className="w-px h-6 bg-border mx-1" />

      <Button
        variant="outline"
        size="sm"
        className="gap-1 text-xs h-8"
        onClick={() => onAddField("background")}
      >
        <Palette className="h-3.5 w-3.5" />
        Background
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="gap-1 text-xs h-8"
        onClick={() => onAddField("image-upload")}
      >
        <Upload className="h-3.5 w-3.5" />
        Upload Image
      </Button>
    </div>
  );
}
