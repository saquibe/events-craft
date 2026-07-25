"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  File,
  Image,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { PresentationStats } from "@/lib/types/presentation";

interface PresentationDashboardProps {
  stats: PresentationStats;
}

export function PresentationDashboard({ stats }: PresentationDashboardProps) {
  const statItems = [
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Talks",
      value: stats.totalTalks,
      icon: File,
      color: "bg-green-500",
    },
    {
      title: "Papers",
      value: stats.totalPapers,
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      title: "ePosters",
      value: stats.totalEPosters,
      icon: Image,
      color: "bg-orange-500",
    },
    {
      title: "Pending Talks",
      value: stats.pendingTalks,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Pending Papers",
      value: stats.pendingPapers,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Pending ePosters",
      value: stats.pendingEPosters,
      icon: Clock,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Presentation Dashboard
        </h2>
        <p className="text-muted-foreground">
          Overview of all presentation submissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
