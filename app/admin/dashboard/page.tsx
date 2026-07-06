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
  Organizer,
  OrganizerTab,
} from "@/components/admin";

const EVENT_COUNT = 100; // Change this to 100, 500, 1000, etc.

const eventNames = [
  "Medical Conference",
  "Tech Summit",
  "AI Expo",
  "Startup Meetup",
  "Healthcare Summit",
  "Education Expo",
  "Cloud Conference",
  "FinTech Summit",
  "Business Expo",
  "Developer Conference",
  "Innovation Summit",
  "Marketing Meetup",
  "Cyber Security Summit",
  "Data Science Conference",
  "Blockchain Expo",
  "Women Leadership Summit",
  "Digital India Summit",
  "Product Launch",
  "Networking Event",
  "Global Conference",
];

const venues = [
  "HITEX",
  "HICC",
  "Pragati Maidan",
  "Jio Convention Centre",
  "BIEC",
  "World Trade Center",
  "Convention Hall A",
  "Convention Hall B",
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

const eventTypes = [
  "Conference",
  "Workshop",
  "Seminar",
  "Exhibition",
  "Networking",
  "Summit",
];

const statuses = ["Published", "Draft", "Suspended", "Completed"] as const;

const eventImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600",
  "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
];

const initialEvents: Event[] = Array.from({ length: EVENT_COUNT }, (_, i) => {
  const month = String((i % 12) + 1).padStart(2, "0");
  const day = String((i % 28) + 1).padStart(2, "0");

  return {
    id: String(i + 1),
    eventName: `${eventNames[i % eventNames.length]} ${2026 + (i % 3)}`,
    eventLogo: eventImages[i % eventImages.length],
    venueName: venues[i % venues.length],
    timeZone: "IST",
    startDateTime: `2026-${month}-${day}T09:00`,
    endDateTime: `2026-${month}-${day}T18:00`,
    eventType: eventTypes[i % eventTypes.length],
    status: statuses[i % statuses.length],
    city: cities[i % cities.length],
  };
});

const TEAM_COUNT = 50;

const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Sarah",
  "David",
  "Emily",
  "Daniel",
  "Sophia",
  "James",
  "Olivia",
  "William",
  "Emma",
  "Liam",
  "Ava",
  "Noah",
  "Mia",
  "Ethan",
  "Isabella",
  "Lucas",
  "Charlotte",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Brown",
  "Williams",
  "Jones",
  "Miller",
  "Davis",
  "Wilson",
  "Taylor",
  "Thomas",
];

const organizations = [
  "Tech Corp",
  "Events Co",
  "AIG Hospitals",
  "Global Events",
  "Event Masters",
  "Conference Hub",
  "Innovate India",
  "Summit Solutions",
];

const designations = [
  "Event Manager",
  "Coordinator",
  "Project Manager",
  "Marketing Executive",
  "Operations Lead",
  "Volunteer",
  "Administrator",
  "Speaker Manager",
];

const locations = [
  "Hyderabad",
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

const profilePhotos = [
  "https://images.unsplash.com/photo-1695927621677-ec96e048dce2?w=600",
  "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
];

const teamStatuses: Team["status"][] = ["active", "inactive"];

const initialTeams: Team[] = Array.from({ length: TEAM_COUNT }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];

  return {
    id: String(i + 1),
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@example.com`,
    organization: organizations[i % organizations.length],
    designation: designations[i % designations.length],
    mobile: `+91 ${9000000000 + i}`,
    location: locations[i % locations.length],
    profilePhoto: profilePhotos[i % profilePhotos.length],
    role: "team",
    status: teamStatuses[i % teamStatuses.length],
  };
});

const VENUE_COUNT = 50;

const venueNames = [
  "HITEX",
  "HICC",
  "Pragati Maidan",
  "Jio Convention Centre",
  "BIEC",
  "World Trade Center",
  "Convention Hall A",
  "Convention Hall B",
  "Expo Center",
  "Grand Convention",
];

const venueCities = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

const venueCountries = ["India"];

const venueImages = [
  "https://images.unsplash.com/photo-1521543387600-c745f8e83d77?w=600",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600",
];

const venueDistanceTypes = [
  "Airport",
  "Railway Station",
  "Bus Stand",
  "Metro Station",
];

const venueStatuses: Venue["status"][] = ["Active", "Inactive"];

const initialVenues: Venue[] = Array.from({ length: VENUE_COUNT }, (_, i) => ({
  id: String(i + 1),

  venueName: `${venueNames[i % venueNames.length]} ${i + 1}`,

  venueAddress: `${100 + i}, ${
    venueNames[i % venueNames.length]
  }, ${venueCities[i % venueCities.length]}`,

  city: venueCities[i % venueCities.length],

  country: venueCountries[0],

  website: `https://venue${i + 1}.example.com`,

  venueImage: venueImages[i % venueImages.length],

  googleMapLink: `https://maps.google.com/?q=${encodeURIComponent(
    `${venueNames[i % venueNames.length]}, ${
      venueCities[i % venueCities.length]
    }`,
  )}`,

  distanceFrom: [
    {
      from: venueDistanceTypes[i % venueDistanceTypes.length],
      unit: `${5 + (i % 25)} km`,
    },
  ],

  status: venueStatuses[i % venueStatuses.length],
}));

const TICKET_COUNT = 50;

const ticketModules = [
  "Event Creation",
  "Payment Issue",
  "Registration",
  "User Management",
  "Team Management",
  "Venue Management",
  "Email Notification",
  "Certificate",
  "Dashboard",
  "Reports",
  "Login",
  "Profile",
  "Settings",
  "Speaker Management",
  "Sponsor Management",
];

const ticketDetails = [
  "Unable to create new event.",
  "Payment gateway is not working.",
  "Registration form submission failed.",
  "Unable to update user profile.",
  "Venue details are not saving.",
  "Team member invitation failed.",
  "Email notifications are delayed.",
  "Certificate download failed.",
  "Dashboard is loading slowly.",
  "Unable to export reports.",
  "Login failed with valid credentials.",
  "Image upload is not working.",
  "Data is not syncing properly.",
  "Page is showing a blank screen.",
  "Unexpected server error occurred.",
];

const ticketStatuses: SupportTicket["status"][] = [
  "Open",
  "In Progress",
  "Closed",
];

const initialTickets: SupportTicket[] = Array.from(
  { length: TICKET_COUNT },
  (_, i) => {
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - i);

    return {
      id: String(i + 1),
      module: ticketModules[i % ticketModules.length],
      details: ticketDetails[i % ticketDetails.length],
      uploadImage: "",
      status: ticketStatuses[i % ticketStatuses.length],
      createdAt: createdDate.toISOString(),
    };
  },
);

const initialOrganizer: Organizer = {
  id: "1",
  // Profile Fields
  orgLogo:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&auto=format&fit=crop&q=60",
  orgBanner:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=60",
  orgName: "Meety Events Private Limited",
  orgAbout:
    "Meety Events is a premier event management company specializing in medical conferences, corporate events, and trade exhibitions. With over 10 years of experience, we have successfully organized 500+ events across India.",
  orgWebsite: "https://meetyevents.com",
  orgAddress1: "Office No. 207, HITEX 2nd Floor",
  orgAddress2: "HITEX Trade Fair Office Building",
  orgCity: "Hyderabad",
  orgState: "Telangana",
  orgCountry: "India",
  orgZip: "500084",
  orgTaxId: "GSTIN: 36AAACA1234A1Z",
  orgFb: "https://facebook.com/meetyevents",
  orgLin: "https://linkedin.com/company/meetyevents",
  orgX: "https://x.com/meetyevents",
  // License Fields
  orgCode: "MEETY2024",
  orgValidFrom: "2024-01-01",
  orgValidTill: "2026-12-31",
  orgEventNo: 24,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [organizer, setOrganizer] = useState<Organizer>(initialOrganizer);

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

  const handleUpdateOrganizer = (id: string, data: Partial<Organizer>) => {
    setOrganizer({ ...organizer, ...data, id } as Organizer);
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
                <SimpleTabsTrigger value="organizer">
                  Organizer
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

          <SimpleTabsContent value="organizer" className="mt-6">
            <OrganizerTab
              organizer={organizer}
              onUpdateOrganizer={handleUpdateOrganizer}
            />
          </SimpleTabsContent>
        </SimpleTabs>
      </div>
    </div>
  );
}
