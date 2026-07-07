"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Mail, Sparkles } from "lucide-react";

interface ComingSoonSimpleProps {
  title?: string;
  description?: string;
}

export function ComingSoonSimple({
  title = "Coming Soon",
  description = "This feature is currently under development. Check back later!",
}: ComingSoonSimpleProps) {
  const params = useParams();
  const eventId = params?.id;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-2xl border-dashed border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="inline-flex p-4 bg-primary/10 rounded-full">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {eventId && (
              <p className="text-sm text-muted-foreground mt-1">
                Event: {eventId}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-md mx-auto">
            {description}
          </p>

          {/* Notify Section */}
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email for updates"
              className="flex-1"
            />
            <Button className="w-full sm:w-auto gap-2">
              <Mail className="h-4 w-4" />
              Notify Me
            </Button>
          </div>

          {/* Back Link */}
          {eventId && (
            <Link
              href={`/admin/events/${eventId}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Event
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
