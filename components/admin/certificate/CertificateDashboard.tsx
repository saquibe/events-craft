// components/admin/certificate/CertificateDashboard.tsx
"use client";

import { useCertificate } from "./CertificateContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Award, Users, Send } from "lucide-react";

export function CertificateDashboard() {
  const { certificates, attendees } = useCertificate();

  const totalCertificates = certificates.length;
  const totalAssigned = certificates.reduce(
    (acc, c) => acc + c.assignedTo.length,
    0,
  );
  const totalSent = certificates.reduce((acc, c) => acc + c.sentTo.length, 0);
  const totalAttendees = attendees.length;

  const stats = [
    {
      title: "Total Certificates",
      value: totalCertificates,
      icon: Award,
      color: "bg-blue-500",
    },
    {
      title: "Assigned",
      value: totalAssigned,
      icon: Users,
      color: "bg-orange-500",
    },
    {
      title: "Sent",
      value: totalSent,
      icon: Send,
      color: "bg-green-500",
    },
    {
      title: "Total Attendees",
      value: totalAttendees,
      icon: BarChart3,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <stat.icon
                    className={`h-6 w-6 ${stat.color.replace("bg-", "text-")}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recent Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {certificates.slice(0, 5).map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-2 bg-muted/20 rounded"
                >
                  <div>
                    <p className="text-sm font-medium">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cert.attendeeProfile} • {cert.attendance}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      cert.status === "sent"
                        ? "bg-green-100 text-green-700"
                        : cert.status === "assigned"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Attendance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Conference Attendees</span>
                <span className="text-sm font-medium">
                  {attendees.filter((a) => a.profile === "Delegate").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Faculty Members</span>
                <span className="text-sm font-medium">
                  {attendees.filter((a) => a.profile === "Faculty").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Committee Members</span>
                <span className="text-sm font-medium">
                  {attendees.filter((a) => a.profile === "Committee").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
