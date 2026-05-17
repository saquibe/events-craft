"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface SupportFormData {
  module: string;
  details: string;
  uploadImage: string;
  status: "Open" | "In Progress" | "Closed";
}

interface SupportFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: SupportFormData) => void;
}

export function SupportFormSheet({
  open,
  onOpenChange,
  onSave,
}: SupportFormSheetProps) {
  const [formData, setFormData] = useState<SupportFormData>({
    module: "",
    details: "",
    uploadImage: "",
    status: "Open",
  });

  const handleSubmit = () => {
    onSave(formData);
    setFormData({
      module: "",
      details: "",
      uploadImage: "",
      status: "Open",
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground">
            Create Support Ticket
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div>
            <Label className="text-foreground">Module</Label>
            <Select
              value={formData.module}
              onValueChange={(value) =>
                setFormData({ ...formData, module: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Event Creation">Event Creation</SelectItem>
                <SelectItem value="User Management">User Management</SelectItem>
                <SelectItem value="Payment Issue">Payment Issue</SelectItem>
                <SelectItem value="Technical Support">
                  Technical Support
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-foreground">Details</Label>
            <Textarea
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              placeholder="Describe your issue"
              rows={5}
            />
          </div>

          <div>
            <Label className="text-foreground">Upload Image (Optional)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({
                      ...formData,
                      uploadImage: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <div>
            <Label className="text-foreground">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as SupportFormData["status"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              color="primary"
              className="flex-1 cursor-pointer"
            >
              Create
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
