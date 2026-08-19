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
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import {
  DateTimePicker,
  DynamicFormRenderer,
  FormBuilder,
  FormConfig,
} from "@/components/admin/common";

export default function TravelFormPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [activeTab, setActiveTab] = useState("form");
  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: "travel-form",
    title: "Travel Form",
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [formData, setFormData] = useState({
    pickupDateTime: "",
    pickupLocation: "",
    dropLocation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dynamicValues, setDynamicValues] = useState<Record<string, any>>({});

  const handleFormBuilderSave = (config: FormConfig) => {
    setFormConfig(config);
    alert("Form fields saved successfully!");
  };

  const handleSaveForm = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Travel form saved successfully!");
    }, 1000);
  };

  const handleDynamicChange = (values: Record<string, any>) => {
    setDynamicValues(values);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Travel Form</h2>
        <p className="text-muted-foreground">
          Configure the travel form for Event #{eventId}
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
              <CardTitle>Travel Form Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Fixed Fields */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Fixed Fields
                </h4>

                <div className="space-y-2">
                  <Label className="text-default">Pickup Date & Time *</Label>
                  <DateTimePicker
                    value={formData.pickupDateTime}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        pickupDateTime: value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-default">Pickup Location *</Label>
                    <Input
                      placeholder="Enter pickup location"
                      value={formData.pickupLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pickupLocation: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-default">Drop Location *</Label>
                    <Input
                      placeholder="Enter drop location"
                      value={formData.dropLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dropLocation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActiveTab("builder")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Fields
                </Button>
              </div>

              {/* Dynamic Fields - Rendered by DynamicFormRenderer */}
              {formConfig.fields.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    Additional Fields ({formConfig.fields.length})
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    These fields will appear in the travel form
                  </p>

                  <DynamicFormRenderer
                    config={formConfig}
                    values={dynamicValues}
                    onChange={handleDynamicChange}
                    onFileUpload={async (fieldId, file) => {
                      // Handle file upload - return the file URL
                      // In real app, upload to S3 or server
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
          <FormBuilder
            initialConfig={formConfig}
            onSave={handleFormBuilderSave}
            title="Travel Form"
          />
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
