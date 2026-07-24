"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Monitor, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SimpleTabs,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

// Mock data - replace with actual data
const mockSessions = [
  {
    id: "1",
    name: "Medical Conference 2026",
    track: "Main Track",
    hall: "Hall A",
    startTime: "09:00",
    endTime: "10:30",
    status: "ongoing",
  },
  {
    id: "2",
    name: "Tech Innovation Summit",
    track: "Tech Track",
    hall: "Hall B",
    startTime: "10:00",
    endTime: "11:30",
    status: "scheduled",
  },
];

export default function LiveDisplayPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [isLive, setIsLive] = useState(false);
  const [activeTab, setActiveTab] = useState("current");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Live Display</h2>
          <p className="text-muted-foreground">
            Manage and display live agenda for Event #{eventId}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={() => setIsLive(!isLive)}
            variant={"outline"}
            // className={isLive ? "bg-red-500 hover:bg-red-600" : ""}
            color="primary"
            className="cursor-pointer text-base"
          >
            {isLive ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Stop Live
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Live
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Live Display Preview
                {isLive && (
                  <Badge color="primary" className="ml-2 animate-pulse">
                    LIVE
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Monitor className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-muted-foreground">
                      {isLive
                        ? "Live display is active"
                        : "Live display is inactive"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isLive
                        ? "Currently showing agenda on display screens"
                        : "Click 'Start Live' to begin displaying"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Display Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Mode</label>
                <SimpleTabs value={activeTab} onValueChange={setActiveTab}>
                  <SimpleTabsList>
                    <SimpleTabsTrigger value="current">
                      Current
                    </SimpleTabsTrigger>

                    <SimpleTabsTrigger value="upcoming">
                      Upcoming
                    </SimpleTabsTrigger>

                    <SimpleTabsTrigger value="all">All</SimpleTabsTrigger>
                  </SimpleTabsList>
                </SimpleTabs>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Active Sessions</label>
                <div className="space-y-2">
                  {mockSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-2 border rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium">{session.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.track} • {session.hall}
                        </p>
                      </div>
                      <Badge
                        color={
                          session.status === "ongoing" ? "primary" : "secondary"
                        }
                      >
                        {session.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
