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
import type { Organizer, OrganizerFormData } from "./types";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";

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

  const [selectedLogo, setSelectedLogo] = useState<string>("");
  const [croppedLogo, setCroppedLogo] = useState<string>("");
  const [logoRef, setLogoRef] = useState<HTMLImageElement | null>(null);

  const [logoCrop, setLogoCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
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

  const handleLogoCropSave = async () => {
    if (!logoRef || !logoCrop.width || !logoCrop.height) return;

    const canvas = document.createElement("canvas");

    const scaleX = logoRef.naturalWidth / logoRef.width;
    const scaleY = logoRef.naturalHeight / logoRef.height;

    canvas.width = logoCrop.width;
    canvas.height = logoCrop.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      logoRef,
      logoCrop.x * scaleX,
      logoCrop.y * scaleY,
      logoCrop.width * scaleX,
      logoCrop.height * scaleY,
      0,
      0,
      logoCrop.width,
      logoCrop.height,
    );

    const base64Image = canvas.toDataURL("image/jpeg");

    setCroppedLogo(base64Image);

    setFormData({
      ...formData,
      orgLogo: base64Image,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const countries = [
    "India",
    "USA",
    "UK",
    "UAE",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Singapore",
    "Malaysia",
    "Thailand",
    "Sri Lanka",
    "Nepal",
    "Bangladesh",
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground">
            {editingOrganizer ? "Edit Organizer" : "Organizer Settings"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-foreground">
                Organizer Logo <span className="text-destructive">*</span>
              </Label>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    const imageUrl = URL.createObjectURL(file);

                    setSelectedLogo(imageUrl);
                  }
                }}
              />

              {selectedLogo && (
                <div className="space-y-4">
                  {/* Crop Area */}
                  <div className="overflow-hidden rounded-xl border border-border">
                    <ReactCrop
                      crop={logoCrop}
                      onChange={(c) => setLogoCrop(c)}
                      aspect={1}
                    >
                      <img
                        ref={setLogoRef}
                        src={selectedLogo}
                        alt="Organizer Logo"
                        className="max-h-[300px] w-full object-contain"
                      />
                    </ReactCrop>
                  </div>

                  {/* Save Crop Button */}
                  <div className="flex justify-end">
                    <Button
                      color="primary"
                      onClick={handleLogoCropSave}
                      className="cursor-pointer"
                    >
                      Save Logo
                    </Button>
                  </div>

                  {/* Preview */}
                  <div className="flex justify-center">
                    <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-border bg-muted">
                      <Image
                        src={croppedLogo || selectedLogo}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label className="text-foreground">
                Organizer Banner URL <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.orgBanner}
                onChange={(e) =>
                  setFormData({ ...formData, orgBanner: e.target.value })
                }
                placeholder="Enter banner URL"
              />
            </div>

            <div>
              <Label className="text-foreground">
                Organizer Name <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.orgName}
                onChange={(e) =>
                  setFormData({ ...formData, orgName: e.target.value })
                }
                placeholder="Enter organizer name"
              />
            </div>

            <div>
              <Label className="text-foreground">
                About the Organizer <span className="text-destructive">*</span>
              </Label>
              <Textarea
                value={formData.orgAbout}
                onChange={(e) =>
                  setFormData({ ...formData, orgAbout: e.target.value })
                }
                placeholder="Tell us about the organizer"
                rows={4}
              />
            </div>

            <div>
              <Label className="text-foreground">
                Website <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.orgWebsite}
                onChange={(e) =>
                  setFormData({ ...formData, orgWebsite: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label className="text-foreground">
                Tax ID <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.orgTaxId}
                onChange={(e) =>
                  setFormData({ ...formData, orgTaxId: e.target.value })
                }
                placeholder="GST / VAT / Tax ID"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4 pt-2 border-t border-border">
            <Label className="text-foreground text-base font-semibold">
              Address
            </Label>

            <div>
              <Label className="text-foreground">
                Address Line 1 <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.orgAddress1}
                onChange={(e) =>
                  setFormData({ ...formData, orgAddress1: e.target.value })
                }
                placeholder="Street address"
              />
            </div>

            <div>
              <Label className="text-foreground">Address Line 2</Label>
              <Input
                value={formData.orgAddress2}
                onChange={(e) =>
                  setFormData({ ...formData, orgAddress2: e.target.value })
                }
                placeholder="Apartment, suite, unit, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">
                  City <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.orgCity}
                  onChange={(e) =>
                    setFormData({ ...formData, orgCity: e.target.value })
                  }
                  placeholder="City"
                />
              </div>

              <div>
                <Label className="text-foreground">
                  State <span className="text-destructive">*</span>
                </Label>
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
              <div>
                <Label className="text-foreground">
                  Country <span className="text-destructive">*</span>
                </Label>
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

              <div>
                <Label className="text-foreground">
                  Zip Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={formData.orgZip}
                  onChange={(e) =>
                    setFormData({ ...formData, orgZip: e.target.value })
                  }
                  placeholder="Postal code"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4 pt-2 border-t border-border">
            <Label className="text-foreground text-base font-semibold">
              Social Media
            </Label>

            <div>
              <Label className="text-foreground">
                Facebook <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.orgFb}
                onChange={(e) =>
                  setFormData({ ...formData, orgFb: e.target.value })
                }
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div>
              <Label className="text-foreground">
                LinkedIn <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.orgLin}
                onChange={(e) =>
                  setFormData({ ...formData, orgLin: e.target.value })
                }
                placeholder="https://linkedin.com/company/yourpage"
              />
            </div>

            <div>
              <Label className="text-foreground">
                X (formerly Twitter) <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.orgX}
                onChange={(e) =>
                  setFormData({ ...formData, orgX: e.target.value })
                }
                placeholder="https://x.com/yourhandle"
              />
            </div>
          </div>

          {/* License */}
          <div className="space-y-4 pt-2 border-t border-border">
            <Label className="text-foreground text-base font-semibold">
              EventsCraft License
            </Label>

            <div>
              <Label className="text-foreground">
                Organizer Code <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.orgCode}
                onChange={(e) =>
                  setFormData({ ...formData, orgCode: e.target.value })
                }
                placeholder="Unique organizer code"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">
                  Validity From <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  value={formData.orgValidFrom}
                  onChange={(e) =>
                    setFormData({ ...formData, orgValidFrom: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="text-foreground">
                  Validity Till <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  value={formData.orgValidTill}
                  onChange={(e) =>
                    setFormData({ ...formData, orgValidTill: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label className="text-foreground">
                Number of Events <span className="text-destructive">*</span>
              </Label>
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
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
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
