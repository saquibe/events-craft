//app/(main)/page.tsx
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

import { useState } from "react";
import clsx from "clsx";

// Dummy data directly in the page
const events = [
  {
    id: "1",
    title:
      "4th Mid-Term IAOHNS 2026 4th Mid-Term IAOHNS 2026 4th Mid-Term IAOHNS 2026 4th Mid-Term IAOHNS 2026",
    description:
      "Join the biggest medical conference of the year with industry leaders and innovative speakers.",
    startDate: new Date("2026-05-29"),
    endDate: new Date("2026-05-30"),
    location: "Auditorium, AIG Hospitals, Gachibowli",
    venue: "Auditorium, AIG Hospitals, Gachibowli",
    attendees: 1200,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    category: "Medical",
    isPast: false,
  },
  {
    id: "2",
    title: "International Conference on Neurology",
    description:
      "Experience live presentations from top neurologists around the world.",
    startDate: new Date("2026-04-15"),
    endDate: new Date("2026-04-17"),
    location: "Convention Center, Mumbai",
    venue: "Convention Center, Mumbai",
    attendees: 800,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
    category: "Medical",
    isPast: true,
  },
  {
    id: "3",
    title: "Annual Surgery Symposium",
    description: "Connect with leading surgeons and medical professionals.",
    startDate: new Date("2026-06-10"),
    endDate: new Date("2026-06-12"),
    location: "Medical College, Delhi",
    venue: "Medical College, Delhi",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    category: "Medical",
    isPast: false,
  },
  {
    id: "4",
    title: "Pediatrics Conference 2026",
    description: "Latest advancements in child healthcare.",
    startDate: new Date("2026-03-05"),
    endDate: new Date("2026-03-07"),
    location: "Convention Hall, Bangalore",
    venue: "Convention Hall, Bangalore",
    attendees: 600,
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6",
    category: "Medical",
    isPast: true,
  },
  {
    id: "5",
    title: "Cardiology Summit",
    description: "International summit on heart health and research.",
    startDate: new Date("2026-07-20"),
    endDate: new Date("2026-07-22"),
    location: "Heart Institute, Chennai",
    venue: "Heart Institute, Chennai",
    attendees: 400,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    category: "Medical",
    isPast: false,
  },
  {
    id: "6",
    title: "Radiology Workshop 2026",
    description: "Hands-on workshop on modern radiology techniques.",
    startDate: new Date("2026-02-10"),
    endDate: new Date("2026-02-12"),
    location: "Medical College, Pune",
    venue: "Medical College, Pune",
    attendees: 250,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
    category: "Medical",
    isPast: true,
  },
  {
    id: "7",
    title: "Cardiology Summit 2026",
    description:
      "International conference on advancements in cardiology and heart care.",
    startDate: new Date("2026-03-15"),
    endDate: new Date("2026-03-17"),
    location: "AIIMS, New Delhi",
    venue: "AIIMS Convention Center",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    category: "Medical",
    isPast: false,
  },
  {
    id: "8",
    title: "Neurology Research Forum 2026",
    description: "Explore the latest research and innovations in neurology.",
    startDate: new Date("2026-04-05"),
    endDate: new Date("2026-04-07"),
    location: "NIMHANS, Bengaluru",
    venue: "NIMHANS Auditorium",
    attendees: 350,
    image: "https://images.unsplash.com/photo-1580281657527-47b7b0988d83",
    category: "Medical",
    isPast: false,
  },
  {
    id: "9",
    title: "Pediatric Healthcare Expo 2026",
    description:
      "Conference focused on child healthcare and pediatric medicine.",
    startDate: new Date("2026-05-20"),
    endDate: new Date("2026-05-22"),
    location: "Hyderabad International Convention Centre",
    venue: "HICC, Hyderabad",
    attendees: 420,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
    category: "Medical",
    isPast: false,
  },
  {
    id: "10",
    title: "Orthopedic Surgery Meet 2026",
    description:
      "Advanced discussions and live demonstrations in orthopedic surgery.",
    startDate: new Date("2026-06-12"),
    endDate: new Date("2026-06-14"),
    location: "Apollo Hospitals, Chennai",
    venue: "Apollo Medical Hall",
    attendees: 280,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
    category: "Medical",
    isPast: false,
  },
  {
    id: "11",
    title: "Dermatology Conference 2026",
    description:
      "Latest treatments and innovations in dermatology and skincare.",
    startDate: new Date("2026-07-08"),
    endDate: new Date("2026-07-10"),
    location: "Kolkata Medical Center",
    venue: "KMC Auditorium",
    attendees: 300,
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464",
    category: "Medical",
    isPast: false,
  },
  {
    id: "12",
    title: "Emergency Medicine Workshop 2026",
    description: "Practical emergency medicine and trauma care training.",
    startDate: new Date("2026-08-18"),
    endDate: new Date("2026-08-20"),
    location: "Manipal Hospital, Jaipur",
    venue: "Emergency Training Center",
    attendees: 200,
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb",
    category: "Medical",
    isPast: false,
  },
  {
    id: "13",
    title: "Global Oncology Congress 2026",
    description:
      "Comprehensive discussions on cancer treatment and oncology research.",
    startDate: new Date("2026-09-25"),
    endDate: new Date("2026-09-27"),
    location: "Tata Memorial Hospital, Mumbai",
    venue: "TMH Conference Hall",
    attendees: 600,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    category: "Medical",
    isPast: false,
  },
  {
    id: "14",
    title: "Medical AI & Innovation Summit 2026",
    description:
      "Exploring artificial intelligence and digital transformation in healthcare.",
    startDate: new Date("2026-10-14"),
    endDate: new Date("2026-10-16"),
    location: "IIT Hyderabad",
    venue: "Innovation Hub Auditorium",
    attendees: 450,
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28",
    category: "Medical",
    isPast: false,
  },
];

const TABS = ["Upcoming Events", "Past Events"];
const ITEMS_PER_PAGE = 9;

function formatDateRange(startDate: Date, endDate: Date) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const startFormatted = formatter.format(startDate);
  const endFormatted = formatter.format(endDate);

  return `${startFormatted} – ${endFormatted}`;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Upcoming Events");
  const [currentPage, setCurrentPage] = useState(1);

  const upcomingEvents = events.filter((event) => !event.isPast);
  const pastEvents = events.filter((event) => event.isPast);

  const filteredEvents =
    activeTab === "Upcoming Events" ? upcomingEvents : pastEvents;

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
        {/* Tabs */}
        <div className="flex gap-6 mb-8">
          {TABS.map((tab) => {
            const count =
              tab === "Upcoming Events"
                ? upcomingEvents.length
                : pastEvents.length;

            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={clsx(
                  "pb-2 transition-all cursor-pointer text-lg font-semibold",
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No {activeTab.toLowerCase()} found
            </p>
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <Link
                      href={
                        activeTab === "Upcoming Events" ? "/admin/login" : "#"
                      }
                      className="w-full"
                    >
                      <Button
                        className={clsx(
                          "w-full font-medium transition-all duration-200 cursor-pointer",
                          activeTab === "Upcoming Events"
                            ? "bg-primary hover:bg-primary/80 text-primary-foreground"
                            : "bg-muted text-muted-foreground border border-border hover:bg-muted/80 cursor-not-allowed",
                        )}
                      >
                        {activeTab === "Upcoming Events"
                          ? "Register"
                          : "Event Closed"}
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
