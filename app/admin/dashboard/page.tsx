"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SimpleTabs,
  SimpleTabsList,
  SimpleTabsTrigger,
  SimpleTabsContent,
} from "@/components/ui/simple-tabs";
import {
  EventsTab,
  TeamsTab,
  VenuesTab,
  SupportTab,
  type Event,
  type Team,
  type Venue,
  type SupportTicket,
} from "@/components/admin";

// Dummy Data
const initialEvents: Event[] = [
  {
    id: "1",
    eventName: "ABCON 2026",
    eventLogo:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
    venueName: "HITEX",
    timeZone: "IST",
    startDateTime: "2026-12-06T10:00",
    endDateTime: "2026-12-08T18:00",
    eventType: "Conference",
    status: "Published",
    city: "Hyderabad",
  },
  {
    id: "2",
    eventName:
      "Medical Conference 2026 Medical Conference 2026 Medical Conference 2026",
    eventLogo:
      "https://plus.unsplash.com/premium_photo-1663089174939-5870e2e8d62e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
    venueName: "HICC",
    timeZone: "IST",
    startDateTime: "2026-11-15T09:00",
    endDateTime: "2026-11-17T18:00",
    eventType: "Conference",
    status: "Draft",
    city: "Hyderabad",
  },
];

const initialTeams: Team[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    organization: "Tech Corp",
    designation: "Event Manager",
    mobile: "+91 9876543210",
    location: "Hyderabad",
    profilePhoto:
      "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww",
    role: "team",
    status: "active",
  },
  {
    id: "2",
    firstName: "Jane Smith",
    lastName: "Smith",
    email: "jane@example.com",
    organization: "Events Co",
    designation: "Coordinator",
    mobile: "+91 9876543211",
    location: "Mumbai",
    profilePhoto:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww",
    role: "team",
    status: "active",
  },
];

const initialVenues: Venue[] = [
  {
    id: "1",
    venueName: "HITEX",
    venueAddress: "HITEX Trade Fair Office Building",
    city: "Hyderabad",
    country: "India",
    website: "https://hitex.in",
    venueImage:
      "https://images.unsplash.com/photo-1521543387600-c745f8e83d77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVudWV8ZW58MHx8MHx8fDA%3D",
    googleMapLink: "",
    distanceFrom: [{ from: "Airport", unit: "15 km" }],
    status: "Active",
  },
  {
    id: "2",
    venueName: "Hyderabad International Convention Centre Hyderabad",
    venueAddress: "Hyderabad International Convention Centre",
    city: "Hyderabad",
    country: "India",
    website: "https://hicc.com",
    venueImage:
      "https://media.istockphoto.com/id/1302442919/photo/luxury-beach-villa-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=b0GO1cEmtHSuwmdlmkJGZVhiBoAtn-gNp6LYcPg12AQ=",
    googleMapLink: "",
    distanceFrom: [{ from: "Airport", unit: "20 km" }],
    status: "Active",
  },
];

const initialTickets: SupportTicket[] = [
  {
    id: "1",
    module: "Event Creation",
    details: "Unable to create new event",
    uploadImage: "",
    status: "Open",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    module: "Payment Issue",
    details: "Payment gateway not working",
    uploadImage: "",
    status: "In Progress",
    createdAt: new Date().toISOString(),
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) router.push("/admin/login");
  }, [router]);

  const handleUpdateEvent = (id: string, data: Partial<Event>) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleUpdateTeam = (id: string, data: Partial<Team>) => {
    setTeams(teams.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const handleDeleteTeam = (id: string) => {
    setTeams(teams.filter((t) => t.id !== id));
  };

  const handleUpdateVenue = (id: string, data: Partial<Venue>) => {
    setVenues(venues.map((v) => (v.id === id ? { ...v, ...data } : v)));
  };

  const handleDeleteVenue = (id: string) => {
    setVenues(venues.filter((v) => v.id !== id));
  };

  const handleUpdateTicket = (id: string, data: Partial<SupportTicket>) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SimpleTabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Main tabs - CENTERED with bottom border */}
          <div className="border-b border-border">
            <div className="flex justify-center">
              <SimpleTabsList>
                <SimpleTabsTrigger value="events">Events</SimpleTabsTrigger>
                <SimpleTabsTrigger value="teams">Teams</SimpleTabsTrigger>
                <SimpleTabsTrigger value="venues">Venues</SimpleTabsTrigger>
                <SimpleTabsTrigger value="support">
                  Support Tickets
                </SimpleTabsTrigger>
              </SimpleTabsList>
            </div>
          </div>

          <SimpleTabsContent value="events" className="mt-6">
            <EventsTab
              events={events}
              venues={venues}
              onUpdateEvent={handleUpdateEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </SimpleTabsContent>

          <SimpleTabsContent value="teams" className="mt-6">
            <TeamsTab
              teams={teams}
              onUpdateTeam={handleUpdateTeam}
              onDeleteTeam={handleDeleteTeam}
            />
          </SimpleTabsContent>

          <SimpleTabsContent value="venues" className="mt-6">
            <VenuesTab
              venues={venues}
              onUpdateVenue={handleUpdateVenue}
              onDeleteVenue={handleDeleteVenue}
            />
          </SimpleTabsContent>

          <SimpleTabsContent value="support" className="mt-6">
            <SupportTab tickets={tickets} onUpdateTicket={handleUpdateTicket} />
          </SimpleTabsContent>
        </SimpleTabs>
      </div>
    </div>
  );
}
