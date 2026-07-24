"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { Save, Type, AlignLeft } from "lucide-react";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ReactCrop, { Crop } from "react-image-crop";

export default function EmailHeaderFooterPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [activeTab, setActiveTab] = useState("header");
  const [selectedImage, setSelectedImage] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

  const handleCropSave = () => {
    if (!imageRef || !crop.width || !crop.height) return;

    const canvas = document.createElement("canvas");

    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      imageRef,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    const base64Image = canvas.toDataURL("image/jpeg");

    setCroppedImage(base64Image);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Email Settings</h2>
          <p className="text-muted-foreground">
            Configure header and footer for all emails
          </p>
        </div>
        <Button className="text-base cursor-pointer" color="primary">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>

      <SimpleTabs
        defaultValue="header"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="border-b border-border mb-6">
          <SimpleTabsList>
            <SimpleTabsTrigger
              value="header"
              className="flex items-center gap-2"
            >
              <Type className="h-4 w-4" />
              Header
            </SimpleTabsTrigger>

            <SimpleTabsTrigger
              value="footer"
              className="flex items-center gap-2"
            >
              <AlignLeft className="h-4 w-4" />
              Footer
            </SimpleTabsTrigger>
          </SimpleTabsList>
        </div>

        <SimpleTabsContent value="header" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Header Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-default">Header Type</Label>

                <RadioGroup
                  defaultValue="text"
                  className="flex flex-wrap items-center gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="header-text" />
                    <Label
                      htmlFor="header-text"
                      className="cursor-pointer font-normal"
                    >
                      Text Header
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="header-image" />
                    <Label
                      htmlFor="header-image"
                      className="cursor-pointer font-normal"
                    >
                      Image Header
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-default">Header Text</Label>
                <Input
                  placeholder="Enter header text"
                  defaultValue="[eventName] - Official Event"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-default">Header Logo (Optional)</Label>

                <div className="space-y-3">
                  <Input
                    type="file"
                    accept="image/*"
                    className="cursor-pointer file:cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (!file) return;

                      const imageUrl = URL.createObjectURL(file);
                      setSelectedImage(imageUrl);
                    }}
                  />

                  {selectedImage && (
                    <div className="space-y-3">
                      <div className="overflow-hidden rounded-xl border border-border">
                        <ReactCrop
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          aspect={3}
                        >
                          <img
                            ref={setImageRef}
                            src={selectedImage}
                            alt="Header Logo"
                            className="max-h-[300px] w-full object-contain"
                          />
                        </ReactCrop>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          color="primary"
                          className="cursor-pointer"
                          onClick={handleCropSave}
                        >
                          Save Crop
                        </Button>
                      </div>

                      <div className="flex justify-center">
                        <div className="relative h-24 w-60 overflow-hidden rounded-xl border border-border bg-muted">
                          <Image
                            src={croppedImage || selectedImage}
                            alt="Header Preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Header</Label>
                  <p className="text-sm text-muted-foreground">
                    Show header in all emails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-t-lg">
                  <h3 className="text-lg font-semibold text-center">
                    Medical Conference 2026 - Official Event
                  </h3>
                </div>
                <div className="bg-card p-4 rounded-b-lg">
                  <p className="text-muted-foreground text-sm text-center">
                    This is a preview of how your email header will appear
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="footer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Footer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-default">Footer Text</Label>
                <Textarea
                  placeholder="Enter footer text"
                  className="min-h-[100px]"
                  defaultValue="© 2026 [eventName]. All rights reserved.\nContact: support@event.com"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-default">Social Media Links</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Facebook URL" />
                  <Input placeholder="Twitter URL" />
                  <Input placeholder="LinkedIn URL" />
                  <Input placeholder="Instagram URL" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-default">Unsubscribe Link</Label>
                <Input placeholder="Unsubscribe URL" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Footer</Label>
                  <p className="text-sm text-muted-foreground">
                    Show footer in all emails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="bg-card p-4 rounded-t-lg">
                  <p className="text-sm text-center text-muted-foreground">
                    This is a preview of how your email footer will appear
                  </p>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-b-lg">
                  <p className="text-xs text-center text-muted-foreground">
                    © 2026 Medical Conference 2026. All rights reserved.
                  </p>
                  <div className="flex justify-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Facebook</span>
                    <span>Twitter</span>
                    <span>LinkedIn</span>
                    <span>Instagram</span>
                  </div>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    <a href="#" className="text-primary">
                      Unsubscribe
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
