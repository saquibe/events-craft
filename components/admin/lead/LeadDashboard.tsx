"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Calendar, TrendingUp, Building2 } from "lucide-react";
import { LeadStats } from "@/lib/types/lead";

interface LeadDashboardProps {
  stats: LeadStats;
}

export function LeadDashboard({ stats }: LeadDashboardProps) {
  const statItems = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Today's Leads",
      value: stats.todayLeads,
      icon: UserPlus,
      color: "bg-green-500",
    },
    {
      title: "This Week",
      value: stats.thisWeekLeads,
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "This Month",
      value: stats.thisMonthLeads,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
    {
      title: "Exhibitors",
      value: stats.exhibitorsWithLeads,
      icon: Building2,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Lead Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of all leads captured at the event.
        </p>
      </div>

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
    </div>
  );
}
