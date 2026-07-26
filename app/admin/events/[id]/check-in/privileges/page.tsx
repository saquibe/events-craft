"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Save, Shield } from "lucide-react";

const mockProfiles = [
  { id: "1", name: "Attendee" },
  { id: "2", name: "Speaker" },
  { id: "3", name: "Exhibitor" },
  { id: "4", name: "Visitor" },
];

const permissions = [
  { id: "check-in", label: "Check-in" },
  { id: "scan", label: "Scan QR" },
  { id: "print-badge", label: "Print Badge" },
  { id: "view-profile", label: "View Profile" },
  { id: "edit-profile", label: "Edit Profile" },
  { id: "send-email", label: "Send Email" },
  { id: "export-data", label: "Export Data" },
  { id: "manage-users", label: "Manage Users" },
];

// Mock privileges
const mockPrivileges: Record<string, string[]> = {
  "1": ["check-in", "view-profile"],
  "2": ["check-in", "scan", "print-badge", "view-profile", "send-email"],
  "3": ["check-in", "scan", "print-badge", "view-profile", "export-data"],
  "4": ["check-in", "view-profile"],
};

export default function PrivilegesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [privileges, setPrivileges] = useState(mockPrivileges);
  const [isSaving, setIsSaving] = useState(false);

  const handleTogglePermission = (profileId: string, permissionId: string) => {
    setPrivileges((prev) => {
      const current = prev[profileId] || [];
      if (current.includes(permissionId)) {
        return {
          ...prev,
          [profileId]: current.filter((p) => p !== permissionId),
        };
      } else {
        return { ...prev, [profileId]: [...current, permissionId] };
      }
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Privileges saved successfully!");
    }, 1000);
  };

  const handleSelectAll = (profileId: string, checked: boolean) => {
    if (checked) {
      setPrivileges({
        ...privileges,
        [profileId]: permissions.map((p) => p.id),
      });
    } else {
      setPrivileges({ ...privileges, [profileId]: [] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Privileges</h2>
          <p className="text-muted-foreground">
            Manage permissions for each badge profile for Event #{eventId}
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="cursor-pointer text-base"
          color="primary"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Privileges"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Badge Profile Privileges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Badge Profile</TableHead>
                {permissions.map((perm) => (
                  <TableHead key={perm.id} className="text-center text-xs">
                    {perm.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">
                    {profile.name}
                    {profile.id === "2" && (
                      <Badge color="secondary" className="ml-2 text-xs">
                        Speaker
                      </Badge>
                    )}
                  </TableCell>
                  {permissions.map((perm) => {
                    const isChecked =
                      privileges[profile.id]?.includes(perm.id) || false;
                    return (
                      <TableCell key={perm.id} className="text-center">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() =>
                            handleTogglePermission(profile.id, perm.id)
                          }
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
