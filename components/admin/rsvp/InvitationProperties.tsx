// components/admin/invitation/InvitationProperties.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Type, Image as ImageIcon, Square } from "lucide-react";
import { InvitationDesign, InvitationField } from "@/lib/types/rsvp";

interface InvitationPropertiesProps {
  design: InvitationDesign;
  selectedFieldId: string | null;
  onFieldUpdate: (fieldId: string, updates: Partial<InvitationField>) => void;
  onFieldDelete: (fieldId: string) => void;
  onDesignUpdate: (id: string, updates: Partial<InvitationDesign>) => void;
  onBackgroundChange: (background: any) => void;
}

export function InvitationProperties({
  design,
  selectedFieldId,
  onFieldUpdate,
  onFieldDelete,
  onDesignUpdate,
  onBackgroundChange,
}: InvitationPropertiesProps) {
  const selectedField = design.fields.find((f) => f.id === selectedFieldId);

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">Properties</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedField ? (
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Label</Label>
              <Input
                value={selectedField.label}
                onChange={(e) =>
                  onFieldUpdate(selectedField.id, { label: e.target.value })
                }
                className="h-8 text-xs"
              />
            </div>
            {selectedField.type === "text" && (
              <>
                <div>
                  <Label className="text-xs">Content</Label>
                  <Input
                    value={selectedField.content}
                    onChange={(e) =>
                      onFieldUpdate(selectedField.id, {
                        content: e.target.value,
                      })
                    }
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Font Size</Label>
                  <Input
                    type="number"
                    value={selectedField.fontSize || 16}
                    onChange={(e) =>
                      onFieldUpdate(selectedField.id, {
                        fontSize: parseInt(e.target.value) || 16,
                      })
                    }
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={selectedField.color || "#1a1a2e"}
                      onChange={(e) =>
                        onFieldUpdate(selectedField.id, {
                          color: e.target.value,
                        })
                      }
                      className="w-12 h-8 p-0"
                    />
                    <Input
                      type="text"
                      value={selectedField.color || "#1a1a2e"}
                      onChange={(e) =>
                        onFieldUpdate(selectedField.id, {
                          color: e.target.value,
                        })
                      }
                      className="flex-1 h-8 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={selectedField.backgroundColor || "#ffffff"}
                      onChange={(e) =>
                        onFieldUpdate(selectedField.id, {
                          backgroundColor: e.target.value,
                        })
                      }
                      className="w-12 h-8 p-0"
                    />
                    <Input
                      type="text"
                      value={selectedField.backgroundColor || "#ffffff"}
                      onChange={(e) =>
                        onFieldUpdate(selectedField.id, {
                          backgroundColor: e.target.value,
                        })
                      }
                      className="flex-1 h-8 text-xs"
                      placeholder="Transparent"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Alignment</Label>
                  <Select
                    value={selectedField.alignment || "center"}
                    onValueChange={(value: any) =>
                      onFieldUpdate(selectedField.id, { alignment: value })
                    }
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
            <div className="flex items-center justify-between">
              <Label className="text-xs">Visible</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {selectedField.isVisible ? "Yes" : "No"}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs"
                  onClick={() =>
                    onFieldUpdate(selectedField.id, {
                      isVisible: !selectedField.isVisible,
                    })
                  }
                >
                  Toggle
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">X</Label>
                <Input
                  type="number"
                  value={Math.round(selectedField.x)}
                  onChange={(e) =>
                    onFieldUpdate(selectedField.id, {
                      x: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Y</Label>
                <Input
                  type="number"
                  value={Math.round(selectedField.y)}
                  onChange={(e) =>
                    onFieldUpdate(selectedField.id, {
                      y: parseFloat(e.target.value) || 0,
                    })
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
                    onFieldUpdate(selectedField.id, {
                      width: parseFloat(e.target.value) || 0,
                    })
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
                    onFieldUpdate(selectedField.id, {
                      height: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="h-8 text-xs"
                />
              </div>
            </div>
            <Button
              color="destructive"
              size="sm"
              className="w-full text-xs"
              onClick={() => onFieldDelete(selectedField.id)}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete Field
            </Button>
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Select a field to edit its properties
          </div>
        )}
      </CardContent>
    </Card>
  );
}
