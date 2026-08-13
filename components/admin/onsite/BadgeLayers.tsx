// components/admin/onsite/badge-design/BadgeLayers.tsx
"use client";

import { BadgeField } from "./BadgeDesignContext";
import { Button } from "@/components/ui/button";
import { GripVertical, Eye, EyeOff, Trash2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeLayersProps {
  fields: BadgeField[];
  selectedFieldId: string | null;
  onFieldSelect: (fieldId: string) => void;
  onFieldDelete: (fieldId: string) => void;
}

export function BadgeLayers({
  fields,
  selectedFieldId,
  onFieldSelect,
  onFieldDelete,
}: BadgeLayersProps) {
  return (
    <div className="p-4 bg-muted/20 rounded-lg border">
      <div className="flex items-center gap-2 mb-3">
        <Layers className="h-4 w-4" />
        <h4 className="font-medium">Layers</h4>
        <span className="text-xs text-muted-foreground ml-auto">
          {fields.length} elements
        </span>
      </div>

      <div className="space-y-1 max-h-[200px] overflow-y-auto">
        {fields.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4">
            No elements added yet
          </div>
        ) : (
          fields.map((field, index) => (
            <div
              key={field.id}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-all duration-200",
                selectedFieldId === field.id
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-muted/50",
              )}
              onClick={() => onFieldSelect(field.id)}
            >
              <GripVertical className="h-3 w-3 text-muted-foreground cursor-grab" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium truncate">
                    {field.label || field.type}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase">
                    {field.type}
                  </span>
                </div>
                {field.type === "text" && (
                  <div className="text-[10px] text-muted-foreground truncate">
                    {field.content}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle visibility
                  }}
                >
                  {field.isVisible ? (
                    <Eye className="h-3 w-3" />
                  ) : (
                    <EyeOff className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFieldDelete(field.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
