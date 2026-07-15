"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SpeakerSettingsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Speaker Settings</h2>
        <p className="text-muted-foreground">
          Configure speaker settings for Event #{eventId}
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="invitation">Invitations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Maximum Speakers</Label>
                  <Input type="number" placeholder="100" defaultValue="100" />
                </div>
                <div className="space-y-2">
                  <Label>Speaker Registration Deadline</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Speaker Self-Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow speakers to register themselves
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invitation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Invitation Email Template</Label>
                <Input placeholder="Select email template" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-send Invitations</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically send invitations to new speakers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for speaker updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reminder Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send reminder emails to speakers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3">
        <Button>Save Settings</Button>
        <Button variant="outline">Reset to Default</Button>
      </div>
    </div>
  );
}
