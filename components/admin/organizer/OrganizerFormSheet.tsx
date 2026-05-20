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
import type { Organizer } from "./types";

interface OrganizerFormData {
  orgLogo: string;
  orgBanner: string;
  orgName: string;
  orgAbout: string;
  orgWebsite: string;
  orgAddress1: string;
  orgAddress2: string;
  orgCity: string;
  orgState: string;
  orgCountry: string;
  orgZip: string;
  orgTaxId: string;
  orgFb: string;
  orgLin: string;
  orgX: string;
  orgCode: string;
  orgValidFrom: string;
  orgValidTill: string;
  orgEventNo: number;
}

interface OrganizerFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingOrganizer: Organizer | null;
  onSave: (data: OrganizerFormData) => void;
}

export function OrganizerFormSheet({
  open,
  onOpenChange,
  editingOrganizer,
  onSave,
}: OrganizerFormSheetProps) {
  const [formData, setFormData] = useState<OrganizerFormData>({
    orgLogo: "",
    orgBanner: "",
    orgName: "",
    orgAbout: "",
    orgWebsite: "",
    orgAddress1: "",
    orgAddress2: "",
    orgCity: "",
    orgState: "",
    orgCountry: "",
    orgZip: "",
    orgTaxId: "",
    orgFb: "",
    orgLin: "",
    orgX: "",
    orgCode: "",
    orgValidFrom: "",
    orgValidTill: "",
    orgEventNo: 0,
  });

  useEffect(() => {
    if (editingOrganizer) {
      setFormData({
        orgLogo: editingOrganizer.orgLogo,
        orgBanner: editingOrganizer.orgBanner,
        orgName: editingOrganizer.orgName,
        orgAbout: editingOrganizer.orgAbout,
        orgWebsite: editingOrganizer.orgWebsite,
        orgAddress1: editingOrganizer.orgAddress1,
        orgAddress2: editingOrganizer.orgAddress2,
        orgCity: editingOrganizer.orgCity,
        orgState: editingOrganizer.orgState,
        orgCountry: editingOrganizer.orgCountry,
        orgZip: editingOrganizer.orgZip,
        orgTaxId: editingOrganizer.orgTaxId,
        orgFb: editingOrganizer.orgFb,
        orgLin: editingOrganizer.orgLin,
        orgX: editingOrganizer.orgX,
        orgCode: editingOrganizer.orgCode,
        orgValidFrom: editingOrganizer.orgValidFrom,
        orgValidTill: editingOrganizer.orgValidTill,
        orgEventNo: editingOrganizer.orgEventNo,
      });
    }
  }, [editingOrganizer]);

  const handleSubmit = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Argentina",
    "Australia",
    "Austria",
    "Bangladesh",
    "Belgium",
    "Brazil",
    "Canada",
    "China",
    "Denmark",
    "Egypt",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hong Kong",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Kuwait",
    "Malaysia",
    "Maldives",
    "Mexico",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "UAE",
    "UK",
    "USA",
    "Vietnam",
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground">
            {editingOrganizer ? "Edit Organizer" : "Organizer Settings"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {/* Organizer Logo */}
          <div>
            <Label className="text-foreground">Organizer Logo URL</Label>
            <Input
              value={formData.orgLogo}
              onChange={(e) =>
                setFormData({ ...formData, orgLogo: e.target.value })
              }
              placeholder="Enter logo URL"
            />
          </div>

          {/* Organizer Banner */}
          <div>
            <Label className="text-foreground">Organizer Banner URL</Label>
            <Input
              value={formData.orgBanner}
              onChange={(e) =>
                setFormData({ ...formData, orgBanner: e.target.value })
              }
              placeholder="Enter banner URL"
            />
          </div>

          {/* Organizer Name */}
          <div>
            <Label className="text-foreground">Organizer Name</Label>
            <Input
              value={formData.orgName}
              onChange={(e) =>
                setFormData({ ...formData, orgName: e.target.value })
              }
              placeholder="Enter organizer name"
            />
          </div>

          {/* About the Organizer */}
          <div>
            <Label className="text-foreground">About the Organizer</Label>
            <Textarea
              value={formData.orgAbout}
              onChange={(e) =>
                setFormData({ ...formData, orgAbout: e.target.value })
              }
              placeholder="Tell us about the organizer"
              rows={4}
            />
          </div>

          {/* Website */}
          <div>
            <Label className="text-foreground">Website</Label>
            <Input
              value={formData.orgWebsite}
              onChange={(e) =>
                setFormData({ ...formData, orgWebsite: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          {/* Address Line 1 */}
          <div>
            <Label className="text-foreground">Address Line 1</Label>
            <Input
              value={formData.orgAddress1}
              onChange={(e) =>
                setFormData({ ...formData, orgAddress1: e.target.value })
              }
              placeholder="Street address"
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <Label className="text-foreground">Address Line 2</Label>
            <Input
              value={formData.orgAddress2}
              onChange={(e) =>
                setFormData({ ...formData, orgAddress2: e.target.value })
              }
              placeholder="Apartment, suite, unit, etc. (optional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* City */}
            <div>
              <Label className="text-foreground">City</Label>
              <Input
                value={formData.orgCity}
                onChange={(e) =>
                  setFormData({ ...formData, orgCity: e.target.value })
                }
                placeholder="City"
              />
            </div>

            {/* State */}
            <div>
              <Label className="text-foreground">State</Label>
              <Input
                value={formData.orgState}
                onChange={(e) =>
                  setFormData({ ...formData, orgState: e.target.value })
                }
                placeholder="State / Province"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Country */}
            <div>
              <Label className="text-foreground">Country</Label>
              <Select
                value={formData.orgCountry}
                onValueChange={(value) =>
                  setFormData({ ...formData, orgCountry: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Zip Code */}
            <div>
              <Label className="text-foreground">Zip Code</Label>
              <Input
                value={formData.orgZip}
                onChange={(e) =>
                  setFormData({ ...formData, orgZip: e.target.value })
                }
                placeholder="Postal code"
              />
            </div>
          </div>

          {/* Tax ID */}
          <div>
            <Label className="text-foreground">Tax ID</Label>
            <Input
              value={formData.orgTaxId}
              onChange={(e) =>
                setFormData({ ...formData, orgTaxId: e.target.value })
              }
              placeholder="GST / VAT / Tax ID"
            />
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 pt-2">
            <Label className="text-foreground text-base font-semibold">
              Social Media
            </Label>

            {/* Facebook */}
            <div>
              <Label className="text-foreground">Facebook</Label>
              <Input
                value={formData.orgFb}
                onChange={(e) =>
                  setFormData({ ...formData, orgFb: e.target.value })
                }
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <Label className="text-foreground">LinkedIn</Label>
              <Input
                value={formData.orgLin}
                onChange={(e) =>
                  setFormData({ ...formData, orgLin: e.target.value })
                }
                placeholder="https://linkedin.com/company/yourpage"
              />
            </div>

            {/* X (Twitter) */}
            <div>
              <Label className="text-foreground">X (formerly Twitter)</Label>
              <Input
                value={formData.orgX}
                onChange={(e) =>
                  setFormData({ ...formData, orgX: e.target.value })
                }
                placeholder="https://x.com/yourhandle"
              />
            </div>
          </div>

          {/* Organizer Code */}
          <div>
            <Label className="text-foreground">Organizer Code</Label>
            <Input
              value={formData.orgCode}
              onChange={(e) =>
                setFormData({ ...formData, orgCode: e.target.value })
              }
              placeholder="Unique organizer code"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Validity From */}
            <div>
              <Label className="text-foreground">Validity From</Label>
              <Input
                type="date"
                value={formData.orgValidFrom}
                onChange={(e) =>
                  setFormData({ ...formData, orgValidFrom: e.target.value })
                }
              />
            </div>

            {/* Validity Till */}
            <div>
              <Label className="text-foreground">Validity Till</Label>
              <Input
                type="date"
                value={formData.orgValidTill}
                onChange={(e) =>
                  setFormData({ ...formData, orgValidTill: e.target.value })
                }
              />
            </div>
          </div>

          {/* Number of Events */}
          <div>
            <Label className="text-foreground">Number of Events</Label>
            <Input
              type="number"
              value={formData.orgEventNo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  orgEventNo: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Total events organized"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              color="primary"
              className="flex-1 cursor-pointer"
            >
              {editingOrganizer ? "Update" : "Save Settings"}
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
