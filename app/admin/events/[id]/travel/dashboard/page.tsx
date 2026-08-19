"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
  UserPlus,
  Plus,
  Building2,
  Calendar,
} from "lucide-react";
import { TravelStats } from "@/lib/types/travel";

const mockStats: TravelStats = {
  totalEnquiries: 45,
  pendingEnquiries: 12,
  assignedEnquiries: 18,
  completedEnquiries: 15,
  totalAgents: 8,
  activeAgents: 6,
};

export default function TravelDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  const statItems = [
    {
      title: "Total Enquiries",
      value: mockStats.totalEnquiries,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Pending Enquiries",
      value: mockStats.pendingEnquiries,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Assigned Enquiries",
      value: mockStats.assignedEnquiries,
      icon: UserCheck,
      color: "bg-purple-500",
    },
    {
      title: "Completed Enquiries",
      value: mockStats.completedEnquiries,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Total Agents",
      value: mockStats.totalAgents,
      icon: Building2,
      color: "bg-orange-500",
    },
    {
      title: "Active Agents",
      value: mockStats.activeAgents,
      icon: UserPlus,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Travel Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of travel arrangements for Event #{eventId}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Enquiry</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Travel</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Agent</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Calendar className="h-5 w-5" />
              <span>View Schedule</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
