"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Save, RotateCcw, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";
import { DatePicker } from "@/components/admin/common/DatePicker";

const defaultSettings = {
  // General Settings
  enableAbstractSubmission: true,
  enableReviewerAssignment: true,
  enableApprovalWorkflow: true,

  // Submission Settings
  submissionFormOpenDate: "2025-12-01T09:00",
  submissionFormCloseDate: "2026-01-15T23:59",
  submissionLimitPerCategory: 50,
  maxCoAuthors: 5,
  minWordCount: 200,
  maxWordCount: 500,

  // Review Settings
  reviewersPerAbstract: 2,
  reviewDeadlineDays: 14,
  enableDoubleBlindReview: true,
  enableReviewerComments: true,

  // Judging Settings
  judgingFormOpenDate: "2026-01-20T09:00",
  judgingFormCloseDate: "2026-02-15T23:59",
  enableTalkJudging: true,
  enablePaperJudging: true,
  enablePosterJudging: true,
  judgesPerPresentation: 3,

  // Notification Settings
  sendSubmissionConfirmation: true,
  sendReviewCompletionEmail: true,
  sendAcceptanceEmail: true,
  sendRejectionEmail: true,
  sendReminderEmails: true,
  reminderDaysBefore: 3,
};

export default function AbstractSettingsPage() {
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
    // Simulate API call
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
            Abstract Settings
          </h2>
          <p className="text-muted-foreground">
            Configure abstract management settings for Event #{eventId}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="cursor-pointer text-base"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="cursor-pointer text-base"
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
          <SimpleTabsTrigger value="submission">Submission</SimpleTabsTrigger>
          <SimpleTabsTrigger value="review">Review</SimpleTabsTrigger>
          <SimpleTabsTrigger value="judging">Judging</SimpleTabsTrigger>
          <SimpleTabsTrigger value="notifications">
            Notifications
          </SimpleTabsTrigger>
        </SimpleTabsList>

        {/* General Settings */}
        <SimpleTabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                General Settings
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Basic configuration for abstract management
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">
                    Enable Abstract Submission
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to submit abstracts
                  </p>
                </div>
                <Switch
                  checked={settings.enableAbstractSubmission}
                  onCheckedChange={(checked) =>
                    handleChange("enableAbstractSubmission", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">
                    Enable Reviewer Assignment
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow assigning reviewers to abstracts
                  </p>
                </div>
                <Switch
                  checked={settings.enableReviewerAssignment}
                  onCheckedChange={(checked) =>
                    handleChange("enableReviewerAssignment", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">
                    Enable Approval Workflow
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable approval workflow for abstracts
                  </p>
                </div>
                <Switch
                  checked={settings.enableApprovalWorkflow}
                  onCheckedChange={(checked) =>
                    handleChange("enableApprovalWorkflow", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Submission Settings */}
        <SimpleTabsContent value="submission" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Submission Settings
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Configure abstract submission parameters
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-default">
                    Submission Form Open Date
                  </Label>
                  <DatePicker
                    value={settings.submissionFormOpenDate}
                    onChange={(value) =>
                      handleChange("submissionFormOpenDate", value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-default">
                    Submission Form Close Date
                  </Label>
                  <DatePicker
                    value={settings.submissionFormCloseDate}
                    onChange={(value) =>
                      handleChange("submissionFormCloseDate", value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-default">
                    Submission Limit per Category
                  </Label>
                  <Input
                    type="number"
                    placeholder="Enter limit"
                    value={settings.submissionLimitPerCategory}
                    onChange={(e) =>
                      handleChange(
                        "submissionLimitPerCategory",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of submissions allowed per category
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-default">Max Co-Authors</Label>
                  <Input
                    type="number"
                    placeholder="Enter max co-authors"
                    value={settings.maxCoAuthors}
                    onChange={(e) =>
                      handleChange(
                        "maxCoAuthors",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-default">Minimum Word Count</Label>
                  <Input
                    type="number"
                    placeholder="Enter minimum word count"
                    value={settings.minWordCount}
                    onChange={(e) =>
                      handleChange(
                        "minWordCount",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-default">Maximum Word Count</Label>
                  <Input
                    type="number"
                    placeholder="Enter maximum word count"
                    value={settings.maxWordCount}
                    onChange={(e) =>
                      handleChange(
                        "maxWordCount",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Review Settings */}
        <SimpleTabsContent value="review" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Review Settings
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Configure abstract review process
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-default">Reviewers per Abstract</Label>
                  <Input
                    type="number"
                    placeholder="Enter number of reviewers"
                    value={settings.reviewersPerAbstract}
                    onChange={(e) =>
                      handleChange(
                        "reviewersPerAbstract",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-default">Review Deadline (Days)</Label>
                  <Input
                    type="number"
                    placeholder="Enter deadline in days"
                    value={settings.reviewDeadlineDays}
                    onChange={(e) =>
                      handleChange(
                        "reviewDeadlineDays",
                        parseInt(e.target.value) || 0,
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">
                    Enable Double-Blind Review
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Hide author identities from reviewers
                  </p>
                </div>
                <Switch
                  checked={settings.enableDoubleBlindReview}
                  onCheckedChange={(checked) =>
                    handleChange("enableDoubleBlindReview", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">
                    Enable Reviewer Comments
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow reviewers to add comments
                  </p>
                </div>
                <Switch
                  checked={settings.enableReviewerComments}
                  onCheckedChange={(checked) =>
                    handleChange("enableReviewerComments", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Judging Settings */}
        <SimpleTabsContent value="judging" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Judging Settings
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Configure judging process for presentations
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-default">Judging Form Open Date</Label>
                  <DatePicker
                    value={settings.judgingFormOpenDate}
                    onChange={(value) =>
                      handleChange("judgingFormOpenDate", value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-default">
                    Judging Form Close Date
                  </Label>
                  <DatePicker
                    value={settings.judgingFormCloseDate}
                    onChange={(value) =>
                      handleChange("judgingFormCloseDate", value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-default">Judges per Presentation</Label>
                <Input
                  type="number"
                  placeholder="Enter number of judges"
                  value={settings.judgesPerPresentation}
                  onChange={(e) =>
                    handleChange(
                      "judgesPerPresentation",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Talk Judging</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow talk presentation judging
                  </p>
                </div>
                <Switch
                  checked={settings.enableTalkJudging}
                  onCheckedChange={(checked) =>
                    handleChange("enableTalkJudging", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Paper Judging</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow paper presentation judging
                  </p>
                </div>
                <Switch
                  checked={settings.enablePaperJudging}
                  onCheckedChange={(checked) =>
                    handleChange("enablePaperJudging", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Poster Judging</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow poster presentation judging
                  </p>
                </div>
                <Switch
                  checked={settings.enablePosterJudging}
                  onCheckedChange={(checked) =>
                    handleChange("enablePosterJudging", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Notification Settings */}
        <SimpleTabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Notification Settings
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Configure email notification preferences
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">
                    Send Submission Confirmation
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Send confirmation email after submission
                  </p>
                </div>
                <Switch
                  checked={settings.sendSubmissionConfirmation}
                  onCheckedChange={(checked) =>
                    handleChange("sendSubmissionConfirmation", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">
                    Send Review Completion Email
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Notify authors when review is complete
                  </p>
                </div>
                <Switch
                  checked={settings.sendReviewCompletionEmail}
                  onCheckedChange={(checked) =>
                    handleChange("sendReviewCompletionEmail", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Send Acceptance Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Send acceptance notification to authors
                  </p>
                </div>
                <Switch
                  checked={settings.sendAcceptanceEmail}
                  onCheckedChange={(checked) =>
                    handleChange("sendAcceptanceEmail", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Send Rejection Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Send rejection notification to authors
                  </p>
                </div>
                <Switch
                  checked={settings.sendRejectionEmail}
                  onCheckedChange={(checked) =>
                    handleChange("sendRejectionEmail", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Send Reminder Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send reminder emails for pending submissions
                  </p>
                </div>
                <Switch
                  checked={settings.sendReminderEmails}
                  onCheckedChange={(checked) =>
                    handleChange("sendReminderEmails", checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="text-default">Reminder Days Before</Label>
                <Input
                  type="number"
                  placeholder="Enter days before"
                  value={settings.reminderDaysBefore}
                  onChange={(e) =>
                    handleChange(
                      "reminderDaysBefore",
                      parseInt(e.target.value) || 0,
                    )
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Send reminder emails this many days before the deadline
                </p>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          variant="outline"
          onClick={handleReset}
          className="cursor-pointer text-base"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="cursor-pointer text-base"
          color="primary"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save All Settings"}
        </Button>
      </div>
    </div>
  );
}
