"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsForm } from "@/components/admin/presentation/SettingsForm";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

const mockSettings = {
  talk: {
    submissionOpenDate: "2025-12-01",
    submissionCloseDate: "2026-01-15",
    firstReminderDays: 7,
    secondReminderDays: 3,
    thirdReminderDays: 1,
  },
  paper: {
    submissionOpenDate: "2025-12-01",
    submissionCloseDate: "2026-01-15",
    firstReminderDays: 7,
    secondReminderDays: 3,
    thirdReminderDays: 1,
  },
  eposter: {
    submissionOpenDate: "2025-12-01",
    submissionCloseDate: "2026-01-15",
    firstReminderDays: 7,
    secondReminderDays: 3,
    thirdReminderDays: 1,
  },
};

export default function PresentationSettingsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [settings, setSettings] = useState(mockSettings);

  const handleSave = (type: "talk" | "paper" | "eposter", data: any) => {
    setSettings({ ...settings, [type]: data });
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} settings saved!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Presentation Settings
        </h2>
        <p className="text-muted-foreground">
          Configure presentation settings for Event #{eventId}
        </p>
      </div>

      <SimpleTabs defaultValue="talk" className="w-full">
        <SimpleTabsList>
          <SimpleTabsTrigger value="talk">Invited Talk</SimpleTabsTrigger>

          <SimpleTabsTrigger value="paper">Paper</SimpleTabsTrigger>

          <SimpleTabsTrigger value="eposter">ePoster</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="talk">
          <SettingsForm
            type="Talk"
            settings={settings.talk}
            onSave={(data) => handleSave("talk", data)}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="paper">
          <SettingsForm
            type="Paper"
            settings={settings.paper}
            onSave={(data) => handleSave("paper", data)}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="eposter">
          <SettingsForm
            type="ePoster"
            settings={settings.eposter}
            onSave={(data) => handleSave("eposter", data)}
          />
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
