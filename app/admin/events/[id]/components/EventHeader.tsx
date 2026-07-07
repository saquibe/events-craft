"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeProps } from "@/components/ui/badge";

interface EventHeaderProps {
  event: {
    id: string;
    eventName: string;
    status: string;
  };
}

export function EventHeader({ event }: EventHeaderProps) {
  const getBadgeColor = (): BadgeProps["color"] => {
    switch (event.status) {
      case "Published":
        return "success";
      case "Draft":
        return "secondary";
      case "Completed":
        return "primary";
      case "Suspended":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">{event.eventName}</h1>

            <Badge color={getBadgeColor()}>{event.status}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="cursor-pointer">
            Preview
          </Button>

          <Button size="sm" className="cursor-pointer">
            Publish
          </Button>
        </div>
      </div>
    </header>
  );
}
