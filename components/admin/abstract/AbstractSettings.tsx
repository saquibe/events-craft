"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

interface AbstractSettingsProps {
  settings: {
    submissionFormOpenDate: string;
    submissionFormCloseDate: string;
    judgingFormOpenDate: string;
    judgingFormCloseDate: string;
    submissionLimitPerCategory: number;
  };
  onSave: (data: any) => void;
}

export function AbstractSettings({ settings, onSave }: AbstractSettingsProps) {
  const [formData, setFormData] = useState(settings);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Abstract Settings</span>
          <Button
            onClick={() => onSave(formData)}
            className="cursor-pointer text-base"
            color="primary"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Submission Form Open Date</Label>
            <Input
              type="date"
              value={formData.submissionFormOpenDate}
              onChange={(e) =>
                handleChange("submissionFormOpenDate", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Submission Form Close Date</Label>
            <Input
              type="date"
              value={formData.submissionFormCloseDate}
              onChange={(e) =>
                handleChange("submissionFormCloseDate", e.target.value)
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Judging Form Open Date</Label>
            <Input
              type="date"
              value={formData.judgingFormOpenDate}
              onChange={(e) =>
                handleChange("judgingFormOpenDate", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Judging Form Close Date</Label>
            <Input
              type="date"
              value={formData.judgingFormCloseDate}
              onChange={(e) =>
                handleChange("judgingFormCloseDate", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Submission Limit per Category</Label>
          <Input
            type="number"
            placeholder="Enter limit"
            value={formData.submissionLimitPerCategory}
            onChange={(e) =>
              handleChange(
                "submissionLimitPerCategory",
                parseInt(e.target.value) || 0,
              )
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
