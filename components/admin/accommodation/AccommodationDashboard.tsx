"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, Bed, Calendar, CheckCircle, Clock, Users } from "lucide-react";
import { AccommodationStats } from "@/lib/types/accommodation";

interface AccommodationDashboardProps {
  stats: AccommodationStats;
}

export function AccommodationDashboard({ stats }: AccommodationDashboardProps) {
  const statItems = [
    {
      title: "Total Hotels",
      value: stats.totalHotels,
      icon: Hotel,
      color: "bg-blue-500",
    },
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      icon: Bed,
      color: "bg-green-500",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "Confirmed Bookings",
      value: stats.confirmedBookings,
      icon: CheckCircle,
      color: "bg-emerald-500",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Checked-in",
      value: stats.checkedIn,
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Accommodation Dashboard
        </h2>
        <p className="text-muted-foreground">
          Overview of hotels, rooms, and bookings.
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
