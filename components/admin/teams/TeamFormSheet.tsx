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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Team } from "./types";

interface TeamFormData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  designation: string;
  mobile: string;
  location: string;
  profilePhoto: string;
  role: string;
  status: Team["status"];
}

interface TeamFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingTeam: Team | null;
  onSave: (data: TeamFormData) => void;
}

export function TeamFormSheet({
  open,
  onOpenChange,
  editingTeam,
  onSave,
}: TeamFormSheetProps) {
  const [formData, setFormData] = useState<TeamFormData>({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    designation: "",
    mobile: "",
    location: "",
    profilePhoto: "",
    role: "team",
    status: "active",
  });

  useEffect(() => {
    if (editingTeam) {
      setFormData({
        firstName: editingTeam.firstName,
        lastName: editingTeam.lastName,
        email: editingTeam.email,
        organization: editingTeam.organization,
        designation: editingTeam.designation,
        mobile: editingTeam.mobile,
        location: editingTeam.location,
        profilePhoto: editingTeam.profilePhoto,
        role: editingTeam.role,
        status: editingTeam.status,
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        designation: "",
        mobile: "",
        location: "",
        profilePhoto: "",
        role: "team",
        status: "active",
      });
    }
  }, [editingTeam]);

  const handleSubmit = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground">
            {editingTeam ? "Edit Team Member" : "Add Team Member"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground">First Name</Label>
              <Input
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="First name"
              />
            </div>
            <div>
              <Label className="text-foreground">Last Name</Label>
              <Input
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <Label className="text-foreground">Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="email@example.com"
            />
          </div>

          <div>
            <Label className="text-foreground">Organization (Optional)</Label>
            <Input
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              placeholder="Organization name"
            />
          </div>

          <div>
            <Label className="text-foreground">Designation (Optional)</Label>
            <Input
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
              placeholder="Job title"
            />
          </div>

          <div>
            <Label className="text-foreground">Mobile (Optional)</Label>
            <Input
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              placeholder="Phone number"
            />
          </div>

          <div>
            <Label className="text-foreground">Location (Optional)</Label>
            <Input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="City, Country"
            />
          </div>

          <div>
            <Label className="text-foreground">
              Profile Photo URL (Optional)
            </Label>
            <Input
              value={formData.profilePhoto}
              onChange={(e) =>
                setFormData({ ...formData, profilePhoto: e.target.value })
              }
              placeholder="Image URL"
            />
          </div>

          <div>
            <Label className="text-foreground">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as Team["status"] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              color="primary"
              className="flex-1 cursor-pointer"
            >
              {editingTeam ? "Update" : "Create"}
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
