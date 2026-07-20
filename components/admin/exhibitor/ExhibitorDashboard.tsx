"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Users,
  MapPin,
  Layers,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { ExhibitorStats } from "@/lib/types/exhibitor";

interface ExhibitorDashboardProps {
  stats: ExhibitorStats;
}

export function ExhibitorDashboard({ stats }: ExhibitorDashboardProps) {
  const statItems = [
    {
      title: "Total Exhibitors",
      value: stats.totalExhibitors,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      title: "Active Exhibitors",
      value: stats.activeExhibitors,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Total Categories",
      value: stats.totalCategories,
      icon: Layers,
      color: "bg-purple-500",
    },
    {
      title: "Total Halls",
      value: stats.totalHalls,
      icon: MapPin,
      color: "bg-orange-500",
    },
    {
      title: "Total Stalls",
      value: stats.totalStalls,
      icon: TrendingUp,
      color: "bg-pink-500",
    },
    {
      title: "Occupied Stalls",
      value: `${stats.occupiedStalls}/${stats.totalStalls}`,
      icon: Users,
      color: "bg-cyan-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Exhibitor Dashboard
        </h2>
        <p className="text-muted-foreground">
          Overview of exhibitors, halls, and stalls.
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
