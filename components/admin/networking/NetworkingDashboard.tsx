"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users2,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { NetworkingStats } from "@/lib/types/networking";

interface NetworkingDashboardProps {
  stats: NetworkingStats;
}

export function NetworkingDashboard({ stats }: NetworkingDashboardProps) {
  const statItems = [
    {
      title: "Total Meetings",
      value: stats.totalMeetings,
      icon: Users2,
      color: "bg-blue-500",
    },
    {
      title: "Pending Meetings",
      value: stats.pendingMeetings,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Confirmed Meetings",
      value: stats.confirmedMeetings,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Rejected Meetings",
      value: stats.rejectedMeetings,
      icon: XCircle,
      color: "bg-red-500",
    },
    {
      title: "Total Locations",
      value: stats.totalLocations,
      icon: MapPin,
      color: "bg-purple-500",
    },
    {
      title: "Total Time Slots",
      value: stats.totalTimeSlots,
      icon: Calendar,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Networking Dashboard
        </h2>
        <p className="text-muted-foreground">
          Overview of networking meetings, locations, and time slots.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
}
