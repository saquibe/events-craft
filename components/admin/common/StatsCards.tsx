"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Ticket, DollarSign } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
}

const statsData: StatsCardProps[] = [
  { title: "Total Events", value: "24", icon: Calendar },
  { title: "Total Attendees", value: "12,345", icon: Users },
  { title: "Tickets Sold", value: "8,234", icon: Ticket },
  { title: "Revenue", value: "$124,567", icon: DollarSign },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat) => (
        <Card key={stat.title} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-foreground">
                  {stat.value}
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
