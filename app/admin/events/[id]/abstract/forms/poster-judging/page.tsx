"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { FormBuilder, FormConfig } from "@/components/admin/common/FormBuilder";

export default function PosterJudgingFormPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  const [formConfig, setFormConfig] = useState<FormConfig>({
    id: "poster-judging",
    title: "Poster Judging Form",
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleFormSave = (config: FormConfig) => {
    setFormConfig(config);
    alert("Poster judging form saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Poster Judging Form
        </h2>
        <p className="text-muted-foreground">
          Configure the poster judging form for Event #{eventId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Poster Judging Form</CardTitle>
        </CardHeader>
        <CardContent>
          <FormBuilder
            initialConfig={formConfig}
            onSave={handleFormSave}
            title="Poster Judging Form"
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="cursor-pointer text-base">
          Cancel
        </Button>
        <Button
          onClick={() => handleFormSave(formConfig)}
          className="cursor-pointer text-base"
          color="primary"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Form
        </Button>
      </div>
    </div>
  );
}
