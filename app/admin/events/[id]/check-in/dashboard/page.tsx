"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, XCircle, UserPlus, Scan } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendeeProfileTable } from "@/components/admin/onsite/AttendeeProfileTable";
import { AttendeeProfileFormSheet } from "@/components/admin/onsite/AttendeeProfileFormSheet";
import { DataImport } from "@/components/admin/onsite/DataImport";
import { AttendeeProfile, OnsiteStats } from "@/lib/types/onsite";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

// Mock stats
const mockStats: OnsiteStats = {
  totalAttendees: 1245,
  checkedIn: 876,
  notCheckedIn: 369,
  totalSpotRegistrations: 45,
  totalScanCategories: 8,
};

// Mock attendee profiles
const defaultProfiles: AttendeeProfile[] = [
  {
    id: "1",
    name: "Attendee",
    status: "Active",
    isDefault: true,
    canDelete: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Speaker",
    status: "Active",
    isDefault: true,
    canDelete: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Exhibitor",
    status: "Active",
    isDefault: true,
    canDelete: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Visitor",
    status: "Active",
    isDefault: true,
    canDelete: false,
    createdAt: "",
    updatedAt: "",
  },
];

export default function OnsiteCheckinDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [profiles, setProfiles] = useState<AttendeeProfile[]>(defaultProfiles);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<AttendeeProfile | null>(
    null,
  );

  const statItems = [
    {
      title: "Total Attendees",
      value: mockStats.totalAttendees,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Checked In",
      value: mockStats.checkedIn,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Not Checked In",
      value: mockStats.notCheckedIn,
      icon: XCircle,
      color: "bg-red-500",
    },
    {
      title: "Spot Registrations",
      value: mockStats.totalSpotRegistrations,
      icon: UserPlus,
      color: "bg-purple-500",
    },
    {
      title: "Scan Categories",
      value: mockStats.totalScanCategories,
      icon: Scan,
      color: "bg-orange-500",
    },
  ];

  const handleAddProfile = async (data: any) => {
    const newProfile: AttendeeProfile = {
      id: String(profiles.length + 1),
      ...data,
      isDefault: false,
      canDelete: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProfiles([...profiles, newProfile]);
  };

  const handleEditProfile = async (data: any) => {
    if (editingProfile) {
      setProfiles(
        profiles.map((p) =>
          p.id === editingProfile.id
            ? { ...p, ...data, updatedAt: new Date().toISOString() }
            : p,
        ),
      );
    }
  };

  const handleEdit = (profile: AttendeeProfile) => {
    setEditingProfile(profile);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Onsite Check-in</h2>
        <p className="text-muted-foreground">
          Manage onsite check-in for Event #{eventId}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statItems.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <SimpleTabs defaultValue="attendee-profiles" className="w-full">
        <SimpleTabsList>
          <SimpleTabsTrigger value="attendee-profiles">
            Attendee Profile
          </SimpleTabsTrigger>

          <SimpleTabsTrigger value="data-import">Data Import</SimpleTabsTrigger>

          <SimpleTabsTrigger value="spot-registration">
            Spot Registration
          </SimpleTabsTrigger>

          <SimpleTabsTrigger value="send-qr">Send QR Code</SimpleTabsTrigger>

          <SimpleTabsTrigger value="scan-point">Scan Point</SimpleTabsTrigger>

          <SimpleTabsTrigger value="privileges">Privileges</SimpleTabsTrigger>

          <SimpleTabsTrigger value="onsite-key">Onsite Key</SimpleTabsTrigger>
        </SimpleTabsList>

        <SimpleTabsContent value="attendee-profiles">
          <AttendeeProfileTable profiles={profiles} onEdit={handleEdit} />

          <AttendeeProfileFormSheet
            open={isFormOpen}
            onOpenChange={setIsFormOpen}
            profile={editingProfile}
            onSubmit={editingProfile ? handleEditProfile : handleAddProfile}
            isDefault={editingProfile?.isDefault}
          />
        </SimpleTabsContent>

        <SimpleTabsContent value="data-import">
          <DataImport />
        </SimpleTabsContent>

        <SimpleTabsContent value="spot-registration">
          <div className="text-center py-12 text-muted-foreground">
            <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Spot Registration</h3>
            <p>Spot registration form will be available here</p>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="send-qr">
          <div className="text-center py-12 text-muted-foreground">
            <Scan className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Send QR Code</h3>
            <p>Bulk QR code sending will be available here</p>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="scan-point">
          <div className="text-center py-12 text-muted-foreground">
            <Scan className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Scan Point</h3>
            <p>Scan point management will be available here</p>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="privileges">
          <div className="text-center py-12 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Privileges</h3>
            <p>Privileges management will be available here</p>
          </div>
        </SimpleTabsContent>

        <SimpleTabsContent value="onsite-key">
          <div className="text-center py-12 text-muted-foreground">
            <Scan className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Onsite Key</h3>
            <p>Onsite key management will be available here</p>
          </div>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
