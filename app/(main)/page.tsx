//app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dummy data directly in the page
const events = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description:
      "Join the biggest tech conference of the year with industry leaders and innovative speakers.",
    date: new Date("2024-12-15"),
    location: "San Francisco, CA",
    attendees: 1200,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    category: "Technology",
  },
  {
    id: "2",
    title: "Music Festival",
    description:
      "Experience live performances from top artists around the world.",
    date: new Date("2024-11-20"),
    location: "Austin, TX",
    attendees: 5000,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
    category: "Music",
  },
  {
    id: "3",
    title: "Startup Networking",
    description: "Connect with founders, investors, and entrepreneurs.",
    date: new Date("2024-10-10"),
    location: "New York, NY",
    attendees: 300,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    category: "Business",
  },
  {
    id: "4",
    title: "Art Exhibition",
    description: "Showcase of modern art from emerging artists.",
    date: new Date("2024-11-05"),
    location: "Chicago, IL",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6",
    category: "Art",
  },
  {
    id: "5",
    title: "Food Festival",
    description: "Taste cuisines from around the world.",
    date: new Date("2024-09-25"),
    location: "Miami, FL",
    attendees: 3000,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    category: "Food",
  },
  {
    id: "6",
    title: "Web Development Workshop",
    description: "Learn modern web development techniques.",
    date: new Date("2024-10-20"),
    location: "Seattle, WA",
    attendees: 150,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
    category: "Education",
  },
];

function formatDate(date: Date) {
  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-default-50">
      {/* Hero Section with brand color */}
      <div className="relative bg-gradient-to-r from-[#e15a29] to-[#e15a29]/90 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">Events Craft</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover and join amazing events happening near you
          </p>

          {/* Search Bar - Fixed alignment */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10 bg-white text-default-900 w-full h-11"
              />
            </div>
            <Button className="bg-white text-[#e15a29] hover:bg-gray-100 font-semibold px-8 h-11 whitespace-nowrap">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-default-900">
            Upcoming Events
          </h2>
          <Link href="/events">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-[#e15a29]">
                  {event.category}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-default-600 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-default-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-default-500">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-default-500">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees.toLocaleString()} attendees</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Link href={`/events/${event.id}`} className="w-full">
                  <Button className="w-full bg-[#e15a29] hover:bg-[#e15a29]/90 text-white">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-default-100 py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-default-900 mb-4">
            Want to host your own event?
          </h2>
          <p className="text-default-600 mb-8 max-w-2xl mx-auto">
            Create and manage events easily with our platform. Reach thousands
            of attendees.
          </p>
          <Link href="/admin/login">
            <Button className="bg-[#e15a29] hover:bg-[#e15a29]/90 text-white px-8 py-3 text-lg">
              Create an Event
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
