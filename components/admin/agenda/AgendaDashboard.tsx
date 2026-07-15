"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Users,
  MapPin,
  Layers,
  Clock,
  CheckCircle,
} from "lucide-react";
import { AgendaStats } from "@/lib/types/agenda";

interface AgendaDashboardProps {
  stats: AgendaStats;
}

export function AgendaDashboard({ stats }: AgendaDashboardProps) {
  const statItems = [
    {
      title: "Total Sessions",
      value: stats.totalSessions,
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Total Topics",
      value: stats.totalTopics,
      icon: Layers,
      color: "bg-green-500",
    },
    {
      title: "Total Halls",
      value: stats.totalHalls,
      icon: MapPin,
      color: "bg-purple-500",
    },
    {
      title: "Total Tracks",
      value: stats.totalTracks,
      icon: Users,
      color: "bg-orange-500",
    },
    {
      title: "Upcoming Sessions",
      value: stats.upcomingSessions,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Completed Sessions",
      value: stats.completedSessions,
      icon: CheckCircle,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Agenda Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of the event agenda and schedule.
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
