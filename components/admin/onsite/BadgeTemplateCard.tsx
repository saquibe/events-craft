// components/admin/onsite/badge-design/BadgeTemplateCard.tsx
"use client";

import { BadgeTemplate } from "./BadgeDesignContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Copy, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeTemplateCardProps {
  template: BadgeTemplate;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function BadgeTemplateCard({
  template,
  onSelect,
  onDuplicate,
  onDelete,
}: BadgeTemplateCardProps) {
  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      common: "Common",
      delegate: "Delegate",
      speaker: "Speaker",
      exhibitor: "Exhibitor",
      staff: "Staff",
      sponsor: "Sponsor",
      organizer: "Organizer",
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      common: "bg-blue-100 text-blue-700",
      delegate: "bg-purple-100 text-purple-700",
      speaker: "bg-green-100 text-green-700",
      exhibitor: "bg-orange-100 text-orange-700",
      staff: "bg-gray-100 text-gray-700",
      sponsor: "bg-pink-100 text-pink-700",
      organizer: "bg-red-100 text-red-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  // Preview badge rendering
  const renderPreviewBadge = () => {
    return (
      <div className="relative w-full aspect-[105/148] max-w-[180px] mx-auto bg-white rounded-lg shadow-sm border overflow-hidden">
        {template.background.type !== "none" && (
          <div
            className="absolute inset-0"
            style={{
              background:
                template.background.type === "gradient"
                  ? template.background.value
                  : template.background.type === "color"
                    ? template.background.value
                    : undefined,
              backgroundImage:
                template.background.type === "image" &&
                template.background.imageUrl
                  ? `url(${template.background.imageUrl})`
                  : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        <div className="relative z-10 p-3 h-full flex flex-col items-center justify-center">
          <div className="text-center space-y-1">
            <div className="text-[8px] font-bold text-gray-800 truncate w-full max-w-[90%] mx-auto">
              Zylker Summit 2024
            </div>
            <div className="text-[10px] font-bold text-gray-900 truncate w-full max-w-[90%] mx-auto">
              Alexander Fleming
            </div>
            <div className="text-[7px] text-gray-600 truncate w-full max-w-[90%] mx-auto">
              Zylker Corporation
            </div>
            <div className="text-[8px] font-bold text-red-600">VIP PASS</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="group relative hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm truncate max-w-[150px]">
              {template.name}
            </h3>
            <Badge className={cn("text-xs", getTypeColor(template.type))}>
              {getTypeLabel(template.type)}
            </Badge>
          </div>
          {template.isDefault && (
            <Badge color="secondary" className="text-xs">
              Default
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {renderPreviewBadge()}
        <div className="mt-2 text-center text-xs text-muted-foreground">
          {template.size.width} × {template.size.height} {template.size.unit} •{" "}
          {template.orientation}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2 pt-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 gap-1 text-xs"
          onClick={onSelect}
        >
          <Eye className="h-3 w-3" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 gap-1 text-xs"
          onClick={onDuplicate}
        >
          <Copy className="h-3 w-3" />
          Duplicate
        </Button>
        {!template.isDefault && (
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-1 text-xs text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
