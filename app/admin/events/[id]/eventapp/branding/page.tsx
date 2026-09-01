"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Save, Eye } from "lucide-react";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

interface BrandingSettings {
  brandColor: string;
  textColor: string;
  secondaryTextColor: string;
  cardColor: string;
  backgroundColor: string;
  subBackgroundColor: string;
}

const defaultBranding: BrandingSettings = {
  brandColor: "#406AE8",
  textColor: "#1E2137",
  secondaryTextColor: "#555869",
  cardColor: "#FFFFFF",
  backgroundColor: "#FFFFFF",
  subBackgroundColor: "#F7F7FA",
};

export default function BrandingPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [branding, setBranding] = useState<BrandingSettings>(defaultBranding);
  const [activeTab, setActiveTab] = useState("app-theme");

  const handleColorChange = (field: keyof BrandingSettings, value: string) => {
    setBranding({ ...branding, [field]: value });
  };

  const handleReset = () => {
    setBranding(defaultBranding);
  };

  const handleSave = () => {
    alert("Branding settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Branding</h2>
        <p className="text-muted-foreground">
          The overall look of your app, applied across every page.
        </p>
      </div>

      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <SimpleTabsList>
          <SimpleTabsTrigger value="app-theme">App Theme</SimpleTabsTrigger>
          <SimpleTabsTrigger value="advanced">
            Advanced Color Customization
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="preview">Preview</SimpleTabsTrigger>
        </SimpleTabsList>

        {/* App Theme Tab */}
        <SimpleTabsContent value="app-theme" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>App Theme</CardTitle>
              <p className="text-sm text-muted-foreground">
                The overall look of your app, applied across every page.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Brand Color */}
              <div className="space-y-2">
                <Label>Brand</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={branding.brandColor}
                      onChange={(e) =>
                        handleColorChange("brandColor", e.target.value)
                      }
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={branding.brandColor}
                      onChange={(e) =>
                        handleColorChange("brandColor", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Buttons, links, active tabs, and icons
                  </span>
                </div>
              </div>

              {/* Text Color */}
              <div className="space-y-2">
                <Label>Text</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={branding.textColor}
                      onChange={(e) =>
                        handleColorChange("textColor", e.target.value)
                      }
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={branding.textColor}
                      onChange={(e) =>
                        handleColorChange("textColor", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Titles and body text
                  </span>
                </div>
              </div>

              {/* Secondary Text Color */}
              <div className="space-y-2">
                <Label>Secondary Text</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={branding.secondaryTextColor}
                      onChange={(e) =>
                        handleColorChange("secondaryTextColor", e.target.value)
                      }
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={branding.secondaryTextColor}
                      onChange={(e) =>
                        handleColorChange("secondaryTextColor", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Supporting details and less prominent text
                  </span>
                </div>
              </div>

              {/* Card Color */}
              <div className="space-y-2">
                <Label>Cards</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={branding.cardColor}
                      onChange={(e) =>
                        handleColorChange("cardColor", e.target.value)
                      }
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={branding.cardColor}
                      onChange={(e) =>
                        handleColorChange("cardColor", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    The panels your content sits on
                  </span>
                </div>
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <Label>Background</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={branding.backgroundColor}
                      onChange={(e) =>
                        handleColorChange("backgroundColor", e.target.value)
                      }
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={branding.backgroundColor}
                      onChange={(e) =>
                        handleColorChange("backgroundColor", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    The area behind your content on all tabs
                  </span>
                </div>
              </div>

              {/* Sub-background Color */}
              <div className="space-y-2">
                <Label>Sub-background</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      value={branding.subBackgroundColor}
                      onChange={(e) =>
                        handleColorChange("subBackgroundColor", e.target.value)
                      }
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={branding.subBackgroundColor}
                      onChange={(e) =>
                        handleColorChange("subBackgroundColor", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    An alternate background used on some pages
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="text-base"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset app theme
                </Button>
                <Button
                  onClick={handleSave}
                  className="text-base"
                  color="primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Theme
                </Button>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Advanced Color Customization Tab */}
        <SimpleTabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Color Customization</CardTitle>
              <p className="text-sm text-muted-foreground">
                Give a part of the app its own colors. They follow your App
                Theme above until you change them.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Feed</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Header & bottom bar</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value="#FFFFFF"
                          className="w-12 h-10 p-1"
                        />
                        <Input value="#FFFFFF" className="w-32" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Venue Map</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Home tab</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value="#FFFFFF"
                          className="w-12 h-10 p-1"
                        />
                        <Input value="#FFFFFF" className="w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="text-base"
                color="primary"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Preview Tab */}
        <SimpleTabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="max-w-md mx-auto border rounded-xl overflow-hidden shadow-lg"
                style={{ backgroundColor: branding.backgroundColor }}
              >
                {/* Status Bar */}
                <div className="bg-black text-white px-4 py-2 flex justify-between text-xs">
                  <span>9:41</span>
                  <span>EventsCraft.io</span>
                </div>

                {/* Header */}
                <div
                  className="p-4"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm opacity-80">View profile</p>
                      <p className="font-semibold">Mintu Nath</p>
                    </div>
                    <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
                      88
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="p-4 space-y-3"
                  style={{ backgroundColor: branding.backgroundColor }}
                >
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: branding.cardColor,
                      color: branding.textColor,
                    }}
                  >
                    <p className="font-semibold">Personal Profile</p>
                    <p
                      className="text-sm"
                      style={{ color: branding.secondaryTextColor }}
                    >
                      Edit Account & Profile
                    </p>
                  </div>

                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: branding.subBackgroundColor,
                      color: branding.textColor,
                    }}
                  >
                    <p className="font-semibold">My Tickets & Add-ons</p>
                    <p
                      className="text-sm"
                      style={{ color: branding.secondaryTextColor }}
                    >
                      Settings
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
