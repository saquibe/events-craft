// components/admin/invitation/InvitationDesignCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Copy, Trash2, Eye } from "lucide-react";
import { InvitationDesign } from "@/lib/types/rsvp";

interface InvitationDesignCardProps {
  design: InvitationDesign;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function InvitationDesignCard({
  design,
  onEdit,
  onDuplicate,
  onDelete,
}: InvitationDesignCardProps) {
  const fieldCount = design.fields.length;
  const hasBackground =
    design.background.type !== "none" && design.background.imageUrl;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-sm font-semibold truncate max-w-[180px]">
              {design.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge color="outline" className="text-[10px]">
                {design.size.preset ||
                  design.size.width + "×" + design.size.height}
              </Badge>
              <Badge color="secondary" className="text-[10px]">
                {design.orientation}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              title="Edit"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              title="Duplicate"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div
          className="relative w-full aspect-[210/297] max-w-[180px] mx-auto bg-white rounded border overflow-hidden"
          style={{
            background:
              design.background.type === "color"
                ? design.background.value
                : undefined,
            backgroundImage: hasBackground
              ? `url(${design.background.imageUrl})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
            {design.fields.length === 0 ? (
              <div className="text-center text-xs text-gray-400">
                <span>No fields added</span>
              </div>
            ) : (
              <div className="space-y-1 w-full">
                {design.fields.slice(0, 4).map((field) => (
                  <div
                    key={field.id}
                    className="text-[8px] truncate px-1 py-0.5 bg-muted/30 rounded"
                    style={{
                      color: field.color || "#1a1a2e",
                      textAlign: field.alignment || "center",
                      fontSize: Math.max(6, (field.fontSize || 14) * 0.4),
                      backgroundColor: field.backgroundColor || "transparent",
                    }}
                  >
                    {field.content || field.label}
                  </div>
                ))}
                {design.fields.length > 4 && (
                  <div className="text-[8px] text-muted-foreground text-center">
                    +{design.fields.length - 4} more
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {fieldCount} field{fieldCount !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            Click to edit
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
