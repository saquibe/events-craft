"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

export default function NetworkingSettingsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Networking Settings
        </h2>
        <p className="text-muted-foreground">
          Configure networking settings for Event #{eventId}
        </p>
      </div>

      <SimpleTabs defaultValue="general" className="w-full">
        <SimpleTabsList>
          <SimpleTabsTrigger value="general">General</SimpleTabsTrigger>

          <SimpleTabsTrigger value="meetings">Meetings</SimpleTabsTrigger>

          <SimpleTabsTrigger value="notifications">
            Notifications
          </SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-default">
                  Maximum Meetings per User
                </Label>
                <Input type="number" placeholder="10" defaultValue="10" />
              </div>

              <div className="space-y-2">
                <Label className="text-default">
                  Meeting Duration (minutes)
                </Label>
                <Input type="number" placeholder="15" defaultValue="15" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Enable Networking</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to schedule networking meetings
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="meetings">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Require Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Require admin approval for meeting requests
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Allow Cancellation</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to cancel scheduled meetings
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label className="text-default">Meeting Reminder Time</Label>
                <Input
                  placeholder="15 minutes before"
                  defaultValue="15 minutes before"
                />
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        <SimpleTabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for meeting updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Meeting Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send meeting reminders to participants
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-default">Request Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify admins of new meeting requests
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>

      <div className="flex gap-3">
        <Button className="text-base cursor-pointer" color="primary">
          Save Settings
        </Button>
        <Button variant="outline" className="text-base cursor-pointer">
          Reset to Default
        </Button>
      </div>
    </div>
  );
}
