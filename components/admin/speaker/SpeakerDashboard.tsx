"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Mic2,
  UserPlus,
  TrendingUp,
  Mail,
  CheckCircle,
  Clock,
} from "lucide-react";
import type { Speaker } from "@/lib/types/speaker";

interface SpeakerDashboardProps {
  speakers: Speaker[];
}

export function SpeakerDashboard({ speakers }: SpeakerDashboardProps) {
  const totalSpeakers = speakers.length;
  const activeSpeakers = speakers.filter(
    (s) => s.status === "registered",
  ).length;
  const pendingInvitations = speakers.filter(
    (s) => !s.speakerAcceptance,
  ).length;
  const nationalSpeakers = speakers.filter(
    (s) => s.speakerTypeId === "1",
  ).length;
  const internationalSpeakers = speakers.filter(
    (s) => s.speakerTypeId === "2",
  ).length;
  const invitedSpeakers = speakers.filter((s) => s.speakerEmail).length;

  const stats = [
    {
      title: "Total Speakers",
      value: totalSpeakers,
      icon: Users,
      color: "bg-blue-500",
      description: `${activeSpeakers} active`,
    },
    {
      title: "Pending Invitations",
      value: pendingInvitations,
      icon: Clock,
      color: "bg-yellow-500",
      description: "Awaiting response",
    },
    {
      title: "National Speakers",
      value: nationalSpeakers,
      icon: UserPlus,
      color: "bg-green-500",
      description: `${Math.round((nationalSpeakers / totalSpeakers) * 100) || 0}% of total`,
    },
    {
      title: "International Speakers",
      value: internationalSpeakers,
      icon: TrendingUp,
      color: "bg-purple-500",
      description: `${Math.round((internationalSpeakers / totalSpeakers) * 100) || 0}% of total`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Speaker Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of all speakers and their submissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
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
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Speakers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {speakers.slice(0, 5).map((speaker) => (
                <div key={speaker.id} className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mic2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {speaker.prefix} {speaker.firstName} {speaker.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getSpeakerTypeName(speaker.speakerTypeId)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {speaker.speakerAcceptance ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-xs">
                      {speaker.speakerAcceptance ? "Accepted" : "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Add Speaker", icon: "👤", color: "bg-blue-500" },
                {
                  label: "Convert to Speaker",
                  icon: "🔄",
                  color: "bg-green-500",
                },
                {
                  label: "Send Invitations",
                  icon: "✉️",
                  color: "bg-purple-500",
                },
                {
                  label: "View All Speakers",
                  icon: "👥",
                  color: "bg-orange-500",
                },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <span className="text-xl">{action.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-center">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function - move to a separate file
const getSpeakerTypeName = (id: string): string => {
  const types = {
    "1": "National Speaker",
    "2": "International Speaker",
  };
  return types[id as keyof typeof types] || "Unknown";
};
