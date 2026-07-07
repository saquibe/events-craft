"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventHeader } from "./components/EventHeader";
import { EventSidebar } from "./components/EventSidebar";

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

export default function EventDetailPage() {
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams<{ id: string }>();
  const eventId = params?.id;

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");

    if (!isAuth) {
      router.push("/admin/login");
      return;
    }

    if (!eventId) return;

    const data = getEventData(eventId);
    setEvent(data);
    setLoading(false);
  }, [eventId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <Button onClick={() => router.push("/admin/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with event name */}
      <EventHeader event={event} />

      {/* Main content with sidebar and page content */}
      <div className="flex flex-1 overflow-hidden">
        <EventSidebar eventId={event.id} />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Event overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-semibold">{event.startDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-semibold">{event.endDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Venue</p>
                  <p className="font-semibold">{event.venue}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className="mt-1">{event.status}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder content - this will be replaced by route content */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-muted-foreground">
              Select a menu item from the sidebar to manage different aspects of
              this event.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
