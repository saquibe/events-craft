//app/(main)/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Search,
  MapPinned,
  CalendarDays,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

  const getFilteredEvents = () => {
    switch (activeTab) {
      case "Upcoming Events":
        return upcomingEvents;
      case "Past Events":
        return pastEvents;
      default:
        return upcomingEvents;
    }
  };

  const filteredEvents = getFilteredEvents();
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  // Reset to page 1 when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-default-50">
      {/* Events Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-6 text-sm font-medium text-blue-900 mb-8">
          {TABS.map((tab) => {
            let count = 0;
            switch (tab) {
              case "Upcoming Events":
                count = upcomingEvents.length;
                break;
              case "Past Events":
                count = pastEvents.length;
                break;
              default:
                count = 0;
            }

            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={clsx(
                  "pb-2 transition-all cursor-pointer text-lg font-semibold",
                  activeTab === tab
                    ? "border-b-2 border-[#e15a29] text-[#e15a29]"
                    : "text-gray-500 hover:text-[#e15a29]",
                )}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No {activeTab.toLowerCase()} found
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Show Event Closed badge for past events */}
                    {/* {event.isPast && (
                      <Badge className="absolute top-3 right-3 bg-gray-200 text-gray-700 hover:bg-gray-200 px-2 py-1 text-xs font-medium border border-gray-300">
                        Event Closed
                      </Badge>
                    )} */}
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold line-clamp-2">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3 flex-grow">
                    <div className="space-y-2">
                      {/* Date Range */}
                      <div className="flex items-center gap-2 text-sm text-default-600">
                        <CalendarDays className="h-4 w-4 text-[#e15a29]" />
                        <span>
                          {formatDateRange(event.startDate, event.endDate)}
                        </span>
                      </div>

                      {/* Location/Venue */}
                      <div className="flex items-center gap-2 text-sm text-default-600">
                        <MapPin className="h-4 w-4 text-[#e15a29]" />
                        <span className="line-clamp-2">
                          {event.venue || event.location}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Link
                      href={
                        activeTab === "Upcoming Events" ? "/admin/login" : "#"
                      }
                      className="w-full"
                    >
                      <Button
                        className={clsx(
                          "w-full font-medium transition-all duration-200",
                          activeTab === "Upcoming Events"
                            ? "bg-[#e15a29] hover:bg-[#e15a29]/90 text-white cursor-pointer"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300 cursor-pointer",
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
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {getPageNumbers().map((page, index) => (
                    <Button
                      key={index}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        typeof page === "number" && setCurrentPage(page)
                      }
                      disabled={page === "..."}
                      className={clsx(
                        "min-w-[40px] cursor-pointer",
                        currentPage === page &&
                          "bg-[#e15a29] hover:bg-[#e15a29]/90",
                        page === "..." && "cursor-default",
                      )}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Showing results info */}
            <div className="text-center text-sm text-gray-500 mt-4">
              Showing {startIndex + 1} -{" "}
              {Math.min(endIndex, filteredEvents.length)} of{" "}
              {filteredEvents.length} events
            </div>
          </>
        )}
      </div>

      {/* Company Info Section - Logo and Address */}
      <div className="bg-gradient-to-r from-[#e15a29]/5 to-[#e15a29]/10 py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/all-img/login-bg-2.jpg"
                  alt="Meety Events Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Meety Events Private Limited
                </h2>
                <p className="text-gray-500 text-sm">
                  Creating memorable experiences
                </p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-16 bg-gray-300"></div>

            {/* Office Address */}
            <div className="flex items-start gap-3">
              <MapPinned className="h-5 w-5 text-[#e15a29] mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 font-medium">Registered Office</p>
                <p className="text-gray-500 text-sm">
                  Office No. 207, HITEX 2nd Floor,
                  <br />
                  HITEX Trade Fair Office Building,
                  <br />
                  Izzatnagar, Hyderabad – 500084
                  <br />– India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
