"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, RotateCcw } from "lucide-react";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

const defaultSettings = {
  enableEManual: true,
  enableMenuBuilder: true,
  enableInformation: true,
  enableForms: true,
  enableContractors: true,
  enableItems: true,
  enableOrders: true,
  requireLogin: true,
  enableRichText: true,
};

export default function EManualSettingsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      setSettings(defaultSettings);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            eManual Settings
          </h2>
          <p className="text-muted-foreground">
            Configure eManual settings for Event #{eventId}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="text-base cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="text-base cursor-pointer"
            color="primary"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>

      <SimpleTabs defaultValue="general" className="w-full">
        <SimpleTabsList>
          <SimpleTabsTrigger value="general">General</SimpleTabsTrigger>

          <SimpleTabsTrigger value="features">Features</SimpleTabsTrigger>

          <SimpleTabsTrigger value="security">Security</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable eManual</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable eManual module for this event
                  </p>
                </div>
                <Switch
                  checked={settings.enableEManual}
                  onCheckedChange={(checked) =>
                    handleChange("enableEManual", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Menu Builder</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow menu creation and management
                  </p>
                </div>
                <Switch
                  checked={settings.enableMenuBuilder}
                  onCheckedChange={(checked) =>
                    handleChange("enableMenuBuilder", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Information</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow information content management
                  </p>
                </div>
                <Switch
                  checked={settings.enableInformation}
                  onCheckedChange={(checked) =>
                    handleChange("enableInformation", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Forms</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow form creation and management
                  </p>
                </div>
                <Switch
                  checked={settings.enableForms}
                  onCheckedChange={(checked) =>
                    handleChange("enableForms", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Contractors</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow contractor management
                  </p>
                </div>
                <Switch
                  checked={settings.enableContractors}
                  onCheckedChange={(checked) =>
                    handleChange("enableContractors", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Items</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow item management
                  </p>
                </div>
                <Switch
                  checked={settings.enableItems}
                  onCheckedChange={(checked) =>
                    handleChange("enableItems", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Orders</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow order management
                  </p>
                </div>
                <Switch
                  checked={settings.enableOrders}
                  onCheckedChange={(checked) =>
                    handleChange("enableOrders", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Require Login</Label>
                  <p className="text-sm text-muted-foreground">
                    Require users to login to access eManual
                  </p>
                </div>
                <Switch
                  checked={settings.requireLogin}
                  onCheckedChange={(checked) =>
                    handleChange("requireLogin", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">
                    Enable Rich Text Editor
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable rich text editor for information content
                  </p>
                </div>
                <Switch
                  checked={settings.enableRichText}
                  onCheckedChange={(checked) =>
                    handleChange("enableRichText", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
