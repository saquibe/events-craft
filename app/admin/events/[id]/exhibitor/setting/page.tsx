"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/components/admin/common/DatePicker";
import { useState } from "react";

export default function ExhibitorSettingsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [registrationDeadline, setRegistrationDeadline] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Exhibitor Settings
        </h2>
        <p className="text-muted-foreground">
          Configure exhibitor settings for Event #{eventId}
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Maximum Exhibitors</Label>
                  <Input type="number" placeholder="100" defaultValue="100" />
                </div>
                <div className="space-y-2">
                  <Label>Registration Deadline</Label>
                  <DatePicker
                    value={registrationDeadline}
                    onChange={setRegistrationDeadline}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Self-Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow exhibitors to register themselves
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registration Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Require admin approval for new registrations
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Send Confirmation Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Send confirmation email to new exhibitors
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Badge Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Badge Printing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow exhibitors to print their badges
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Badge Template</Label>
                <Input placeholder="Select badge template" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
