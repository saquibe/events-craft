"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Save } from "lucide-react";
import { DatePicker } from "../common/DatePicker";

interface SettingsFormProps {
  type: "Talk" | "Paper" | "ePoster";
  settings: {
    submissionOpenDate: string;
    submissionCloseDate: string;
    firstReminderDays: number;
    secondReminderDays: number;
    thirdReminderDays: number;
  };
  onSave: (data: any) => void;
}

export function SettingsForm({ type, settings, onSave }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    ...settings,
    isSubmissionOpenDateEnabled: !!settings.submissionOpenDate,
    isSubmissionCloseDateEnabled: !!settings.submissionCloseDate,
    isFirstReminderEnabled: settings.firstReminderDays > 0,
    isSecondReminderEnabled: settings.secondReminderDays > 0,
    isThirdReminderEnabled: settings.thirdReminderDays > 0,
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const dataToSave = {
      submissionOpenDate: formData.isSubmissionOpenDateEnabled
        ? formData.submissionOpenDate
        : "",
      submissionCloseDate: formData.isSubmissionCloseDateEnabled
        ? formData.submissionCloseDate
        : "",
      firstReminderDays: formData.isFirstReminderEnabled
        ? formData.firstReminderDays
        : 0,
      secondReminderDays: formData.isSecondReminderEnabled
        ? formData.secondReminderDays
        : 0,
      thirdReminderDays: formData.isThirdReminderEnabled
        ? formData.thirdReminderDays
        : 0,
    };
    onSave(dataToSave);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{type} Settings</span>
          <Button
            onClick={handleSubmit}
            className="cursor-pointer text-base"
            color="primary"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Submission Open Date */}
        <div className="space-y-2">
          <Label>Submission Open Date</Label>
          <div className="flex items-center gap-4">
            <RadioGroup
              value={formData.isSubmissionOpenDateEnabled ? "yes" : "no"}
              onValueChange={(value) => {
                const isEnabled = value === "yes";
                handleChange("isSubmissionOpenDateEnabled", isEnabled);
                if (!isEnabled) {
                  handleChange("submissionOpenDate", "");
                } else if (!formData.submissionOpenDate) {
                  handleChange(
                    "submissionOpenDate",
                    new Date().toISOString().split("T")[0],
                  );
                }
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${type}-open-yes`} />
                <Label htmlFor={`${type}-open-yes`} className="cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${type}-open-no`} />
                <Label htmlFor={`${type}-open-no`} className="cursor-pointer">
                  No
                </Label>
              </div>
            </RadioGroup>
            {formData.isSubmissionOpenDateEnabled && (
              <div className="flex-1">
                <DatePicker
                  value={formData.submissionOpenDate}
                  onChange={(value) =>
                    handleChange("submissionOpenDate", value)
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* Submission Close Date */}
        <div className="space-y-2">
          <Label>Submission Close Date</Label>
          <div className="flex items-center gap-4">
            <RadioGroup
              value={formData.isSubmissionCloseDateEnabled ? "yes" : "no"}
              onValueChange={(value) => {
                const isEnabled = value === "yes";
                handleChange("isSubmissionCloseDateEnabled", isEnabled);
                if (!isEnabled) {
                  handleChange("submissionCloseDate", "");
                } else if (!formData.submissionCloseDate) {
                  handleChange(
                    "submissionCloseDate",
                    new Date().toISOString().split("T")[0],
                  );
                }
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${type}-close-yes`} />
                <Label htmlFor={`${type}-close-yes`} className="cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${type}-close-no`} />
                <Label htmlFor={`${type}-close-no`} className="cursor-pointer">
                  No
                </Label>
              </div>
            </RadioGroup>
            {formData.isSubmissionCloseDateEnabled && (
              <div className="flex-1">
                <DatePicker
                  value={formData.submissionCloseDate}
                  onChange={(value) =>
                    handleChange("submissionCloseDate", value)
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* 1st Submission Reminder */}
        <div className="space-y-2">
          <Label>1st Submission Reminder</Label>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <RadioGroup
              value={formData.isFirstReminderEnabled ? "yes" : "no"}
              onValueChange={(value) => {
                const isEnabled = value === "yes";
                handleChange("isFirstReminderEnabled", isEnabled);
                if (!isEnabled) {
                  handleChange("firstReminderDays", 0);
                } else if (formData.firstReminderDays === 0) {
                  handleChange("firstReminderDays", 7);
                }
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${type}-first-reminder-yes`} />
                <Label
                  htmlFor={`${type}-first-reminder-yes`}
                  className="cursor-pointer"
                >
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${type}-first-reminder-no`} />
                <Label
                  htmlFor={`${type}-first-reminder-no`}
                  className="cursor-pointer"
                >
                  No
                </Label>
              </div>
            </RadioGroup>
            {formData.isFirstReminderEnabled && (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="number"
                  value={formData.firstReminderDays}
                  onChange={(e) =>
                    handleChange(
                      "firstReminderDays",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-20"
                  min={1}
                />
                <span className="text-sm text-muted-foreground">
                  days before
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2nd Submission Reminder */}
        <div className="space-y-2">
          <Label>2nd Submission Reminder</Label>
          <div className="flex items-center gap-4">
            <RadioGroup
              value={formData.isSecondReminderEnabled ? "yes" : "no"}
              onValueChange={(value) => {
                const isEnabled = value === "yes";
                handleChange("isSecondReminderEnabled", isEnabled);
                if (!isEnabled) {
                  handleChange("secondReminderDays", 0);
                } else if (formData.secondReminderDays === 0) {
                  handleChange("secondReminderDays", 3);
                }
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id={`${type}-second-reminder-yes`}
                />
                <Label
                  htmlFor={`${type}-second-reminder-yes`}
                  className="cursor-pointer"
                >
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${type}-second-reminder-no`} />
                <Label
                  htmlFor={`${type}-second-reminder-no`}
                  className="cursor-pointer"
                >
                  No
                </Label>
              </div>
            </RadioGroup>
            {formData.isSecondReminderEnabled && (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="number"
                  value={formData.secondReminderDays}
                  onChange={(e) =>
                    handleChange(
                      "secondReminderDays",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-20"
                  min={1}
                />
                <span className="text-sm text-muted-foreground">
                  days before
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 3rd Submission Reminder */}
        <div className="space-y-2">
          <Label>3rd Submission Reminder</Label>
          <div className="flex items-center gap-4">
            <RadioGroup
              value={formData.isThirdReminderEnabled ? "yes" : "no"}
              onValueChange={(value) => {
                const isEnabled = value === "yes";
                handleChange("isThirdReminderEnabled", isEnabled);
                if (!isEnabled) {
                  handleChange("thirdReminderDays", 0);
                } else if (formData.thirdReminderDays === 0) {
                  handleChange("thirdReminderDays", 1);
                }
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${type}-third-reminder-yes`} />
                <Label
                  htmlFor={`${type}-third-reminder-yes`}
                  className="cursor-pointer"
                >
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${type}-third-reminder-no`} />
                <Label
                  htmlFor={`${type}-third-reminder-no`}
                  className="cursor-pointer"
                >
                  No
                </Label>
              </div>
            </RadioGroup>
            {formData.isThirdReminderEnabled && (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  type="number"
                  value={formData.thirdReminderDays}
                  onChange={(e) =>
                    handleChange(
                      "thirdReminderDays",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  className="w-20"
                  min={1}
                />
                <span className="text-sm text-muted-foreground">
                  days before
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
