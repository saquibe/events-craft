"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Clock, GitBranch } from "lucide-react";

interface Feature {
  name: string;
  status: "coming" | "in-progress" | "planned";
  progress: number;
}

const features: Feature[] = [
  { name: "Speaker Management", status: "in-progress", progress: 75 },
  { name: "Agenda Builder", status: "coming", progress: 45 },
  { name: "Abstract System", status: "planned", progress: 10 },
  { name: "Presentation Manager", status: "in-progress", progress: 60 },
  { name: "Certificate Generator", status: "coming", progress: 30 },
  { name: "Exhibitor Portal", status: "planned", progress: 5 },
];

const getBadgeColor = (status: Feature["status"]): BadgeProps["color"] => {
  switch (status) {
    case "in-progress":
      return "primary";
    case "coming":
      return "warning";
    case "planned":
      return "secondary";
    default:
      return "default";
  }
};

export function ComingSoonWidget() {
  return (
    <Card className="border-dashed border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Upcoming Features
          <Badge color="info" className="ml-2">
            Development
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{feature.name}</span>

                  <Badge
                    color={getBadgeColor(feature.status)}
                    className="text-xs"
                  >
                    {feature.status === "in-progress"
                      ? "In Progress"
                      : feature.status === "coming"
                        ? "Coming Soon"
                        : "Planned"}
                  </Badge>
                </div>

                <span className="text-xs text-muted-foreground">
                  {feature.progress}%
                </span>
              </div>

              <Progress value={feature.progress} className="h-2" />
            </div>
          ))}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Next release: Q2 2026</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GitBranch className="h-4 w-4" />
              <span>6 features in development</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
