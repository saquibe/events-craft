"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings2, FormInput } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

export default function TalkJudgingFormPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [activeTab, setActiveTab] = useState("builder");
  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: "talk-judging",
    title: "Talk Judging Form",
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [dynamicValues, setDynamicValues] = useState<Record<string, any>>({});

  const handleFormBuilderSave = (config: FormConfig) => {
    setFormConfig(config);
    alert("Talk judging form saved successfully!");
  };

  const handleDynamicChange = (values: Record<string, any>) => {
    setDynamicValues(values);
  };

  const handleSubmitJudging = () => {
    alert("Judging submitted successfully!");
    console.log("Form values:", dynamicValues);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Talk Judging Form</h2>
        <p className="text-muted-foreground">
          Configure the talk judging form for Event #{eventId}
        </p>
      </div>

      <SimpleTabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <SimpleTabsList className="grid w-full max-w-md grid-cols-2">
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

          <SimpleTabsTrigger value="form" className="flex items-center gap-2">
            <FormInput className="h-4 w-4" />
            Form View
          </SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="builder" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Talk Judging Form Builder</CardTitle>
              <p className="text-sm text-muted-foreground">
                Build your form by adding fields. Drag to reorder.
              </p>
            </CardHeader>
            <CardContent>
              <FormBuilder
                initialConfig={formConfig}
                onSave={handleFormBuilderSave}
                title="Talk Judging Form"
              />
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="form" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Talk Judging Form</CardTitle>
              <p className="text-sm text-muted-foreground">
                Fill out the judging form
              </p>
            </CardHeader>
            <CardContent>
              {formConfig.fields.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No fields found.</p>
                  <p className="text-sm mt-1">
                    Please go to "Form Builder" tab to create the form.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <DynamicFormRenderer
                    config={formConfig}
                    values={dynamicValues}
                    onChange={handleDynamicChange}
                    onFileUpload={async (fieldId, file) => {
                      console.log(`Uploading file for ${fieldId}:`, file.name);
                      return URL.createObjectURL(file);
                    }}
                  />

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="cursor-pointer text-base"
                      onClick={() => setDynamicValues({})}
                    >
                      Reset
                    </Button>
                    <Button
                      className="cursor-pointer text-base"
                      color="primary"
                      onClick={handleSubmitJudging}
                    >
                      Submit Judging
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
