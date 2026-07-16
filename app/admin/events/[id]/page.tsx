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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <Button onClick={() => router.push("/admin/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Key metrics and statistics for your event.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registrations
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">66% of capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New registration</p>
                  <p className="text-xs text-muted-foreground">
                    John Doe registered for the event
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Speaker added</p>
                  <p className="text-xs text-muted-foreground">
                    Dr. Sarah Johnson added as speaker
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  1 hour ago
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Agenda updated</p>
                  <p className="text-xs text-muted-foreground">
                    Day 2 schedule has been updated
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  3 hours ago
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Manage Speakers", icon: "👤" },
                { label: "Edit Agenda", icon: "📅" },
                { label: "View Registrations", icon: "📋" },
                { label: "Send Emails", icon: "✉️" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
