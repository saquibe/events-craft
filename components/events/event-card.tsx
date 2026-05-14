"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    attendees: number;
    image?: string;
  };
  locale: string;
}

export default function EventCard({ event, locale }: EventCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      {event.image && (
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
      )}
      <CardHeader>
        <h3 className="text-xl font-semibold">{event.title}</h3>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-gray-600 line-clamp-2">{event.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          {/* <span>{formatDate(event.date, locale)}</span> */}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="h-4 w-4" />
          <span>{event.attendees} attendees</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/${locale}/events/${event.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
