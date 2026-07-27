// app/admin/events/[id]/overview/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Users,
  Ticket,
  Eye,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - replace with actual data fetching
const getEventData = (id: string) => ({
  id,
  eventName: "Medical Conference 2026",
  status: "Published",
  venue: "HITEX, Hyderabad",
  startDate: "2026-01-15",
  endDate: "2026-01-17",
  timeZone: "IST",
  eventType: "Conference",
  eventLogo:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
});

export default function EventOverviewPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = (params?.id as string) || "";
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    // Fetch event data
    const data = getEventData(eventId);
    setEvent(data);
    setLoading(false);
  }, [eventId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] sm:min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] sm:min-h-[60vh] gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Event not found</h2>
        <Button onClick={() => router.push("/admin/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Registrations",
      value: "1,284",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Tickets Sold",
      value: "856",
      change: "66% capacity",
      trend: "neutral",
      icon: Ticket,
      color: "text-green-500",
    },
    {
      title: "Page Views",
      value: "3,842",
      change: "+8%",
      trend: "up",
      icon: Eye,
      color: "text-purple-500",
    },
    {
      title: "Conversion Rate",
      value: "22.3%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "New registration",
      description: "John Doe registered for the event",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Speaker added",
      description: "Dr. Sarah Johnson added as speaker",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Agenda updated",
      description: "Day 2 schedule has been updated",
      time: "3 hours ago",
    },
    {
      id: 4,
      title: "Payment received",
      description: "Payment of $250 from TechCorp",
      time: "5 hours ago",
    },
  ];

  const quickActions = [
    { label: "Manage Speakers", icon: "👤" },
    { label: "Edit Agenda", icon: "📅" },
    { label: "View Registrations", icon: "📋" },
    { label: "Send Emails", icon: "✉️" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Overview
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Key metrics and statistics for your event.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs sm:text-sm">
                {stat.trend === "up" && (
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                )}
                {stat.trend === "down" && (
                  <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up"
                      ? "text-green-500"
                      : stat.trend === "down"
                        ? "text-red-500"
                        : "text-muted-foreground"
                  }
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                    <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate">
                      {activity.title}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground flex-shrink-0">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-2 p-2 sm:p-3 rounded-lg border border-border hover:bg-muted transition-colors text-xs sm:text-sm"
                >
                  <span className="text-base sm:text-lg">{action.icon}</span>
                  <span className="truncate">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
