"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Settings2, FormInput, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  FormBuilder,
  FormConfig,
  DynamicFormRenderer,
} from "@/components/admin/common";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import { DatePicker } from "@/components/admin/common/DatePicker";
import { Menu } from "@/lib/types/emanual";

const mockMenus: Menu[] = [
  {
    id: "1",
    name: "Registration",
    type: "Form",
    status: "Active",
    order: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Workshop",
    type: "Form",
    status: "Active",
    order: 2,
    createdAt: "",
    updatedAt: "",
  },
];

export default function FormsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [activeTab, setActiveTab] = useState("form");
  const [menus] = useState<Menu[]>(mockMenus);
  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: "emanual-form",
    title: "Additional Fields",
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [formData, setFormData] = useState({
    menuId: "",
    lastDateOfSubmission: "",
    payment: false,
    status: "Active" as const,
  });
  const [dynamicValues, setDynamicValues] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormBuilderSave = (config: FormConfig) => {
    setFormConfig(config);
    alert("Form fields saved successfully!");
  };

  const handleDynamicChange = (values: Record<string, any>) => {
    setDynamicValues(values);
  };

  const handleSaveForm = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("eManual form saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Forms</h2>
        <p className="text-muted-foreground">
          Manage eManual forms for Event #{eventId}
        </p>
      </div>

      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <SimpleTabsList className="grid w-full max-w-md grid-cols-2">
          <SimpleTabsTrigger value="form" className="flex items-center gap-2">
            <FormInput className="h-4 w-4" />
            Form Settings
          </SimpleTabsTrigger>

          <SimpleTabsTrigger
            value="builder"
            className="flex items-center gap-2"
          >
            <Settings2 className="h-4 w-4" />
            Form Builder
            {formConfig.fields.length > 0 && (
              <Badge color="secondary" className="ml-2">
                {formConfig.fields.length}
              </Badge>
            )}
          </SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="form" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure the basic form settings
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Menu Name */}
              <div className="space-y-2">
                <Label className="text-default">Menu Name *</Label>
                <Select
                  value={formData.menuId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, menuId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select menu" />
                  </SelectTrigger>
                  <SelectContent>
                    {menus.map((menu) => (
                      <SelectItem key={menu.id} value={menu.id}>
                        {menu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Last Date of Submission */}
              <div className="space-y-2">
                <Label className="text-default">
                  Last Date of Submission *
                </Label>
                <DatePicker
                  value={formData.lastDateOfSubmission}
                  onChange={(value) =>
                    setFormData({ ...formData, lastDateOfSubmission: value })
                  }
                />
              </div>

              {/* Payment */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Payment</Label>
                  <p className="text-sm text-muted-foreground">
                    Require payment for form submission
                  </p>
                </div>
                <Switch
                  checked={formData.payment}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, payment: checked })
                  }
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-default">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("builder")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Fields
                </Button>
              </div>

              {/* Dynamic Fields */}
              {formConfig.fields.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    Additional Fields ({formConfig.fields.length})
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    These fields will appear in the form
                  </p>

                  <DynamicFormRenderer
                    config={formConfig}
                    values={dynamicValues}
                    onChange={handleDynamicChange}
                    onFileUpload={async (fieldId, file) => {
                      console.log(`Uploading file for ${fieldId}:`, file.name);
                      return URL.createObjectURL(file);
                    }}
                  />
                </div>
              )}

              <div className="flex justify-end pt-4 border-t">
                <Button
                  onClick={handleSaveForm}
                  disabled={isSubmitting}
                  className="text-base"
                  color="primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Form"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="builder" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Builder</CardTitle>
              <p className="text-sm text-muted-foreground">
                Build your form by adding custom fields. Drag to reorder.
              </p>
            </CardHeader>
            <CardContent>
              <FormBuilder
                initialConfig={formConfig}
                onSave={handleFormBuilderSave}
                title="Additional Form Fields"
              />
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
