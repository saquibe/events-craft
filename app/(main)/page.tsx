"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  MapPinned,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SimpleTabs,
  SimpleTabsList,
  SimpleTabsTrigger,
  SimpleTabsContent,
} from "@/components/ui/simple-tabs";

import { useState } from "react";
import clsx from "clsx";
import { formatDateRange } from "@/lib/date";

const EVENT_COUNT = 50;

const titles = [
  "Medical Conference",
  "Cardiology Summit",
  "Neurology Forum",
  "AI in Healthcare Summit",
  "Healthcare Expo",
  "Surgery Symposium",
  "Pediatrics Conference",
  "Orthopedic Meet",
  "Dermatology Congress",
  "Radiology Workshop",
  "Emergency Medicine Summit",
  "Global Oncology Congress",
  "Medical Innovation Expo",
  "Clinical Research Conference",
  "Digital Health Summit",
  "Nursing Excellence Forum",
  "Pharma Conference",
  "Medical Education Summit",
  "Public Health Congress",
  "International Healthcare Forum",
];

const descriptions = [
  "Join leading healthcare professionals and industry experts.",
  "Explore the latest innovations in medical science.",
  "Learn from world-renowned speakers and researchers.",
  "Hands-on workshops and networking opportunities.",
  "Discover cutting-edge technologies in healthcare.",
];

const venues = [
  "AIG Hospitals",
  "HITEX Exhibition Center",
  "HICC",
  "AIIMS Convention Center",
  "Apollo Hospitals",
  "NIMS Auditorium",
  "KIMS Hospital",
  "Medical College Auditorium",
];

const cities = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

const images = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200",
];

const categories = [
  "Medical",
  "Technology",
  "Healthcare",
  "Business",
  "Education",
];

const events = Array.from({ length: EVENT_COUNT }, (_, i) => {
  const month = (i % 12) + 1;
  const day = (i % 28) + 1;

  const startDate = new Date(2026, month - 1, day);
  const endDate = new Date(2026, month - 1, day + 2);

  return {
    id: String(i + 1),
    title: `${titles[i % titles.length]} ${2026 + (i % 3)}`,
    description: descriptions[i % descriptions.length],
    startDate,
    endDate,
    location: `${venues[i % venues.length]}, ${cities[i % cities.length]}`,
    venue: venues[i % venues.length],
    attendees: 100 + ((i * 37) % 1900), // 100-1999 attendees
    image: images[i % images.length],
    category: categories[i % categories.length],
    isPast: endDate < new Date(),
  };
});

const ITEMS_PER_PAGE = 9;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);

  const upcomingEvents = events.filter((event) => !event.isPast);
  const pastEvents = events.filter((event) => event.isPast);

  const filteredEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Events Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Tabs using SimpleTabs component */}
        <SimpleTabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex justify-start">
            <SimpleTabsList>
              <SimpleTabsTrigger value="upcoming">
                Upcoming Events ({upcomingEvents.length})
              </SimpleTabsTrigger>
              <SimpleTabsTrigger value="past">
                Past Events ({pastEvents.length})
              </SimpleTabsTrigger>
            </SimpleTabsList>
          </div>

          <SimpleTabsContent value="upcoming" className="mt-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No upcoming events found
                </p>
              </div>
            ) : (
              <>
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="group overflow-hidden border border-border bg-card hover:border-primary/30 hover:bg-muted/20 transition-all duration-300 flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      {/* Header */}
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-semibold line-clamp-3">
                          {event.title}
                        </CardTitle>
                      </CardHeader>

                      {/* Content */}
                      <CardContent className="space-y-3 flex-grow">
                        <div className="space-y-3">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span>
                              {formatDateRange(event.startDate, event.endDate)}
                            </span>
                          </div>

                          {/* Venue */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="line-clamp-2">
                              {event.venue || event.location}
                            </span>
                          </div>
                        </div>
                      </CardContent>

                      {/* Footer */}
                      <CardFooter>
                        <Link href="/admin/login" className="w-full">
                          <Button color="primary" className="w-full">
                            Register
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      color="primary"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex gap-2">
                      {getPageNumbers().map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          color="primary"
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      color="primary"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Results */}
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Showing {startIndex + 1} -{" "}
                  {Math.min(endIndex, filteredEvents.length)} of{" "}
                  {filteredEvents.length} events
                </div>
              </>
            )}
          </SimpleTabsContent>

          <SimpleTabsContent value="past" className="mt-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No past events found
                </p>
              </div>
            ) : (
              <>
                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 flex flex-col opacity-80"
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300 grayscale"
                        />
                      </div>

                      {/* Header */}
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-semibold line-clamp-2">
                          {event.title}
                        </CardTitle>
                      </CardHeader>

                      {/* Content */}
                      <CardContent className="space-y-3 flex-grow">
                        <div className="space-y-3">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span>
                              {formatDateRange(event.startDate, event.endDate)}
                            </span>
                          </div>

                          {/* Venue */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="line-clamp-2">
                              {event.venue || event.location}
                            </span>
                          </div>
                        </div>
                      </CardContent>

                      {/* Footer */}
                      <CardFooter>
                        <Button
                          className="w-full bg-muted text-muted-foreground border border-border hover:bg-muted/80 cursor-not-allowed"
                          disabled
                        >
                          Event Closed
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      color="primary"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex gap-2">
                      {getPageNumbers().map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          color="primary"
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      color="primary"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Results */}
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Showing {startIndex + 1} -{" "}
                  {Math.min(endIndex, filteredEvents.length)} of{" "}
                  {filteredEvents.length} events
                </div>
              </>
            )}
          </SimpleTabsContent>
        </SimpleTabs>
      </div>

      {/* Company Section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 py-16 mt-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
            {/* Company */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/all-img/login-bg-2.jpg"
                  alt="EventsCraft Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  EventsCraft Private Limited
                </h2>

                <p className="text-muted-foreground text-sm">
                  Crafting seamless event experiences
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-border" />

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPinned className="h-5 w-5 text-primary mt-1 flex-shrink-0" />

              <div>
                <p className="text-foreground font-medium">Registered Office</p>

                <p className="text-muted-foreground text-sm">
                  Office No. 207, HITEX 2nd Floor,
                  <br />
                  HITEX Trade Fair Office Building,
                  <br />
                  Izzatnagar, Hyderabad – 500084
                  <br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
