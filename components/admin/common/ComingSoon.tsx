"use client";

import { useParams } from "next/navigation";
import Logo from "@/components/partials/auth/logo";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
  estimatedDate?: string;
  featureName?: string;
  showBackButton?: boolean;
}

const ComingSoon = ({
  title = "Coming Soon",
  description = "This feature is currently under development. We&apos;re working hard to bring you an amazing experience. Check back later for updates!",
  estimatedDate = "Q2 2026",
  featureName = "Feature",
  showBackButton = true,
}: ComingSoonProps) => {
  const params = useParams();
  const eventId = params?.id;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-6">
      <Card className="w-full max-w-6xl overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background via-background to-primary/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Feature Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Coming Soon</span>
              <span className="w-px h-4 bg-primary/20" />
              <span className="text-sm font-medium">{estimatedDate}</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                {title}
              </h1>
              {eventId && (
                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Event ID: {eventId}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg">
              {description}
            </p>

            {/* Feature Info */}
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Feature: {featureName}</p>
                  <p className="text-xs text-muted-foreground">
                    We&apos;re building something awesome for you
                  </p>
                </div>
              </div>
            </div>

            {/* Notify Form */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-muted/30 rounded-lg p-1 border border-border">
                <Input
                  type="email"
                  placeholder="Enter your email to get notified"
                  className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 h-12"
                />
                <Button className="w-full sm:w-auto h-12 px-6">
                  Notify Me
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We&apos;ll notify you when this feature is launched.
              </p>
            </div>

            {/* Back Button */}
            {showBackButton && (
              <div className="pt-4">
                <Link
                  href={`/admin/events/${eventId}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Event Overview
                </Link>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl" />
              <div className="absolute inset-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-16 h-16 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Under Construction
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We're working on this feature
                  </p>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComingSoon;
