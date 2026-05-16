"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  Ticket,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Globe,
  Image as ImageIcon,
  Link as LinkIcon,
  Ruler,
  X,
  Upload,
  Eye,
  CheckCircle,
  Clock,
  Archive,
  Send,
  Reply,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

// Types
interface Event {
  id: string;
  eventName: string;
  eventLogo: string;
  venueName: string;
  timeZone: string;
  startDateTime: string;
  endDateTime: string;
  eventType: string;
  status: "Draft" | "Published" | "Completed" | "Draft Deleted";
  city: string;
}

interface Team {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  designation: string;
  mobile: string;
  location: string;
  profilePhoto: string;
  role: string;
  status: "active" | "inactive";
}

interface Venue {
  id: string;
  venueName: string;
  venueAddress: string;
  city: string;
  country: string;
  website: string;
  venueImage: string;
  googleMapLink: string;
  distanceFrom: { from: string; unit: string }[];
  status: "Active" | "Inactive";
}

interface SupportTicket {
  id: string;
  module: string;
  details: string;
  uploadImage: string;
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("events");

  // State for Events
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      eventName: "ABCON 2026",
      eventLogo: "",
      venueName: "HITEX",
      timeZone: "IST",
      startDateTime: "2026-12-06T10:00",
      endDateTime: "2026-12-08T18:00",
      eventType: "Conference",
      status: "Published" as const, // Use 'as const' for literal type
      city: "Hyderabad",
    },
  ]);
  const [isEventSheetOpen, setIsEventSheetOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState<Omit<Event, "id" | "city">>({
    eventName: "",
    eventLogo: "",
    venueName: "",
    timeZone: "IST",
    startDateTime: "",
    endDateTime: "",
    eventType: "",
    status: "Draft",
  });

  // State for Teams
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      organization: "Tech Corp",
      designation: "Event Manager",
      mobile: "+91 9876543210",
      location: "Hyderabad",
      profilePhoto: "",
      role: "team",
      status: "active",
    },
  ]);
  const [isTeamSheetOpen, setIsTeamSheetOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [teamForm, setTeamForm] = useState<Omit<Team, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    designation: "",
    mobile: "",
    location: "",
    profilePhoto: "",
    role: "team",
    status: "active",
  });

  // State for Venues
  const [venues, setVenues] = useState<Venue[]>([
    {
      id: "1",
      venueName: "HITEX",
      venueAddress: "HITEX Trade Fair Office Building",
      city: "Hyderabad",
      country: "India",
      website: "https://hitex.in",
      venueImage: "",
      googleMapLink: "",
      distanceFrom: [{ from: "Airport", unit: "15 km" }],
      status: "Active",
    },
  ]);
  const [isVenueSheetOpen, setIsVenueSheetOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [venueForm, setVenueForm] = useState<Omit<Venue, "id">>({
    venueName: "",
    venueAddress: "",
    city: "",
    country: "",
    website: "",
    venueImage: "",
    googleMapLink: "",
    distanceFrom: [{ from: "", unit: "" }],
    status: "Active",
  });

  // State for Support Tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "1",
      module: "Event Creation",
      details: "Unable to create new event",
      uploadImage: "",
      status: "Open",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [isTicketSheetOpen, setIsTicketSheetOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<SupportTicket | null>(
    null,
  );
  const [ticketForm, setTicketForm] = useState<
    Omit<SupportTicket, "id" | "createdAt">
  >({
    module: "",
    details: "",
    uploadImage: "",
    status: "Open",
  });

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
    }
  }, [router]);

  // Event Handlers
  const handleCreateEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      eventName: eventForm.eventName,
      eventLogo: eventForm.eventLogo,
      venueName: eventForm.venueName,
      timeZone: eventForm.timeZone,
      startDateTime: eventForm.startDateTime,
      endDateTime: eventForm.endDateTime,
      eventType: eventForm.eventType,
      status: eventForm.status as
        | "Draft"
        | "Published"
        | "Completed"
        | "Draft Deleted", // Type assertion
      city: "Hyderabad",
    };
    setEvents([newEvent, ...events]);
    setIsEventSheetOpen(false);
    setEventForm({
      eventName: "",
      eventLogo: "",
      venueName: "",
      timeZone: "IST",
      startDateTime: "",
      endDateTime: "",
      eventType: "",
      status: "Draft",
    });
  };

  const handleUpdateEvent = () => {
    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                ...eventForm,
                status: eventForm.status as
                  | "Draft"
                  | "Published"
                  | "Completed"
                  | "Draft Deleted",
              }
            : event,
        ),
      );
      setIsEventSheetOpen(false);
      setEditingEvent(null);
      setEventForm({
        eventName: "",
        eventLogo: "",
        venueName: "",
        timeZone: "IST",
        startDateTime: "",
        endDateTime: "",
        eventType: "",
        status: "Draft",
      });
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleUpdateEventStatus = (id: string, status: Event["status"]) => {
    setEvents(
      events.map((event) => (event.id === id ? { ...event, status } : event)),
    );
  };

  // Team Handlers
  const handleCreateTeam = () => {
    const newTeam: Team = {
      id: Date.now().toString(),
      ...teamForm,
    };
    setTeams([newTeam, ...teams]);
    setIsTeamSheetOpen(false);
    setTeamForm({
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      designation: "",
      mobile: "",
      location: "",
      profilePhoto: "",
      role: "team",
      status: "active",
    });
  };

  const handleUpdateTeam = () => {
    if (editingTeam) {
      setTeams(
        teams.map((team) =>
          team.id === editingTeam.id ? { ...team, ...teamForm } : team,
        ),
      );
      setIsTeamSheetOpen(false);
      setEditingTeam(null);
      setTeamForm({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        designation: "",
        mobile: "",
        location: "",
        profilePhoto: "",
        role: "team",
        status: "active",
      });
    }
  };

  const handleDeleteTeam = (id: string) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  const handleUpdateTeamStatus = (
    id: string,
    status: "active" | "inactive",
  ) => {
    setTeams(
      teams.map((team) => (team.id === id ? { ...team, status } : team)),
    );
  };

  // Venue Handlers
  const handleCreateVenue = () => {
    const newVenue: Venue = {
      id: Date.now().toString(),
      ...venueForm,
    };
    setVenues([newVenue, ...venues]);
    setIsVenueSheetOpen(false);
    setVenueForm({
      venueName: "",
      venueAddress: "",
      city: "",
      country: "",
      website: "",
      venueImage: "",
      googleMapLink: "",
      distanceFrom: [{ from: "", unit: "" }],
      status: "Active",
    });
  };

  const handleUpdateVenue = () => {
    if (editingVenue) {
      setVenues(
        venues.map((venue) =>
          venue.id === editingVenue.id ? { ...venue, ...venueForm } : venue,
        ),
      );
      setIsVenueSheetOpen(false);
      setEditingVenue(null);
      setVenueForm({
        venueName: "",
        venueAddress: "",
        city: "",
        country: "",
        website: "",
        venueImage: "",
        googleMapLink: "",
        distanceFrom: [{ from: "", unit: "" }],
        status: "Active",
      });
    }
  };

  const handleDeleteVenue = (id: string) => {
    setVenues(venues.filter((venue) => venue.id !== id));
  };

  const handleUpdateVenueStatus = (
    id: string,
    status: "Active" | "Inactive",
  ) => {
    setVenues(
      venues.map((venue) => (venue.id === id ? { ...venue, status } : venue)),
    );
  };

  // Ticket Handlers
  const handleCreateTicket = () => {
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      ...ticketForm,
      createdAt: new Date().toISOString(),
    };
    setTickets([newTicket, ...tickets]);
    setIsTicketSheetOpen(false);
    setTicketForm({
      module: "",
      details: "",
      uploadImage: "",
      status: "Open",
    });
  };

  const handleUpdateTicketStatus = (
    id: string,
    status: SupportTicket["status"],
  ) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket,
      ),
    );
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      Draft: "bg-gray-100 text-gray-700",
      Published: "bg-green-100 text-green-700",
      Completed: "bg-blue-100 text-blue-700",
      "Draft Deleted": "bg-red-100 text-red-700",
      active: "bg-green-100 text-green-700",
      inactive: "bg-gray-100 text-gray-700",
      Active: "bg-green-100 text-green-700",
      Inactive: "bg-gray-100 text-gray-700",
      Open: "bg-yellow-100 text-yellow-700",
      "In Progress": "bg-blue-100 text-blue-700",
      Closed: "bg-green-100 text-green-700",
    };
    return statusColors[status] || "bg-gray-100 text-gray-700";
  };

  // Filter upcoming vs past events
  const today = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.startDateTime) >= today,
  );
  const pastEvents = events.filter(
    (event) => new Date(event.startDateTime) < today,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="support">Support Tickets</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Events</h2>
              <Sheet open={isEventSheetOpen} onOpenChange={setIsEventSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-[#e15a29] hover:bg-[#e15a29]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      {editingEvent ? "Edit Event" : "Create Event"}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label>Event Name</Label>
                      <Input
                        value={eventForm.eventName}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            eventName: e.target.value,
                          })
                        }
                        placeholder="Enter event name"
                      />
                    </div>
                    <div>
                      <Label>Event Logo URL</Label>
                      <Input
                        value={eventForm.eventLogo}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            eventLogo: e.target.value,
                          })
                        }
                        placeholder="Enter logo URL"
                      />
                    </div>
                    <div>
                      <Label>Venue</Label>
                      <Select
                        value={eventForm.venueName}
                        onValueChange={(value) =>
                          setEventForm({ ...eventForm, venueName: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select venue" />
                        </SelectTrigger>
                        <SelectContent>
                          {venues.map((venue) => (
                            <SelectItem key={venue.id} value={venue.venueName}>
                              {venue.venueName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Event Time Zone</Label>
                      <Select
                        value={eventForm.timeZone}
                        onValueChange={(value) =>
                          setEventForm({ ...eventForm, timeZone: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                          <SelectItem value="EST">EST (UTC-5)</SelectItem>
                          <SelectItem value="PST">PST (UTC-8)</SelectItem>
                          <SelectItem value="GMT">GMT (UTC+0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Start Date & Time</Label>
                      <Input
                        type="datetime-local"
                        value={eventForm.startDateTime}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            startDateTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>End Date & Time</Label>
                      <Input
                        type="datetime-local"
                        value={eventForm.endDateTime}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            endDateTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Event Type</Label>
                      <Select
                        value={eventForm.eventType}
                        onValueChange={(value) =>
                          setEventForm({ ...eventForm, eventType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Exhibition">Exhibition</SelectItem>
                          <SelectItem value="Conference">Conference</SelectItem>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Seminar">Seminar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select
                        value={eventForm.status}
                        onValueChange={(value) =>
                          setEventForm({
                            ...eventForm,
                            status: value as
                              | "Draft"
                              | "Published"
                              | "Completed"
                              | "Draft Deleted",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Draft Deleted">
                            Draft Deleted
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={
                          editingEvent ? handleUpdateEvent : handleCreateEvent
                        }
                        className="flex-1 bg-[#e15a29] hover:bg-[#e15a29]/90"
                      >
                        {editingEvent ? "Update" : "Create"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEventSheetOpen(false);
                          setEditingEvent(null);
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Event Tabs */}
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            {event.eventLogo ? (
                              <Image
                                src={event.eventLogo}
                                alt={event.eventName}
                                width={40}
                                height={40}
                                className="rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {event.eventName}
                          </TableCell>
                          <TableCell>
                            {new Date(event.startDateTime).toLocaleDateString()}{" "}
                            to{" "}
                            {new Date(event.endDateTime).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{event.city}</TableCell>
                          <TableCell>{event.eventType}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(event.status)}>
                              {event.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingEvent(event);
                                    setEventForm({
                                      eventName: event.eventName,
                                      eventLogo: event.eventLogo,
                                      venueName: event.venueName,
                                      timeZone: event.timeZone,
                                      startDateTime: event.startDateTime,
                                      endDateTime: event.endDateTime,
                                      eventType: event.eventType,
                                      status: event.status,
                                    });
                                    setIsEventSheetOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateEventStatus(
                                      event.id,
                                      "Published",
                                    )
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Publish
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateEventStatus(event.id, "Draft")
                                  }
                                >
                                  <Clock className="h-4 w-4 mr-2" />
                                  Draft
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            {event.eventLogo ? (
                              <Image
                                src={event.eventLogo}
                                alt={event.eventName}
                                width={40}
                                height={40}
                                className="rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {event.eventName}
                          </TableCell>
                          <TableCell>
                            {new Date(event.startDateTime).toLocaleDateString()}{" "}
                            to{" "}
                            {new Date(event.endDateTime).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{event.city}</TableCell>
                          <TableCell>{event.eventType}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(event.status)}>
                              {event.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingEvent(event);
                                    setEventForm({
                                      eventName: event.eventName,
                                      eventLogo: event.eventLogo,
                                      venueName: event.venueName,
                                      timeZone: event.timeZone,
                                      startDateTime: event.startDateTime,
                                      endDateTime: event.endDateTime,
                                      eventType: event.eventType,
                                      status: event.status,
                                    });
                                    setIsEventSheetOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
              <Sheet open={isTeamSheetOpen} onOpenChange={setIsTeamSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-[#e15a29] hover:bg-[#e15a29]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      {editingTeam ? "Edit Team Member" : "Add Team Member"}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input
                          value={teamForm.firstName}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              firstName: e.target.value,
                            })
                          }
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input
                          value={teamForm.lastName}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              lastName: e.target.value,
                            })
                          }
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={teamForm.email}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, email: e.target.value })
                        }
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <Label>Organization (Optional)</Label>
                      <Input
                        value={teamForm.organization}
                        onChange={(e) =>
                          setTeamForm({
                            ...teamForm,
                            organization: e.target.value,
                          })
                        }
                        placeholder="Organization name"
                      />
                    </div>
                    <div>
                      <Label>Designation (Optional)</Label>
                      <Input
                        value={teamForm.designation}
                        onChange={(e) =>
                          setTeamForm({
                            ...teamForm,
                            designation: e.target.value,
                          })
                        }
                        placeholder="Job title"
                      />
                    </div>
                    <div>
                      <Label>Mobile (Optional)</Label>
                      <Input
                        value={teamForm.mobile}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, mobile: e.target.value })
                        }
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <Label>Location (Optional)</Label>
                      <Input
                        value={teamForm.location}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, location: e.target.value })
                        }
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <Label>Profile Photo URL (Optional)</Label>
                      <Input
                        value={teamForm.profilePhoto}
                        onChange={(e) =>
                          setTeamForm({
                            ...teamForm,
                            profilePhoto: e.target.value,
                          })
                        }
                        placeholder="Image URL"
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select
                        value={teamForm.status}
                        onValueChange={(value) =>
                          setTeamForm({
                            ...teamForm,
                            status: value as Team["status"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={
                          editingTeam ? handleUpdateTeam : handleCreateTeam
                        }
                        className="flex-1 bg-[#e15a29] hover:bg-[#e15a29]/90"
                      >
                        {editingTeam ? "Update" : "Create"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsTeamSheetOpen(false);
                          setEditingTeam(null);
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>
                        {team.profilePhoto ? (
                          <Avatar>
                            <AvatarImage src={team.profilePhoto} />
                            <AvatarFallback>
                              {team.firstName[0]}
                              {team.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarFallback>
                              {team.firstName[0]}
                              {team.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {team.firstName} {team.lastName}
                      </TableCell>
                      <TableCell>{team.email}</TableCell>
                      <TableCell>{team.mobile}</TableCell>
                      <TableCell>{team.organization}</TableCell>
                      <TableCell>{team.designation}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(team.status)}>
                          {team.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingTeam(team);
                                setTeamForm({
                                  firstName: team.firstName,
                                  lastName: team.lastName,
                                  email: team.email,
                                  organization: team.organization,
                                  designation: team.designation,
                                  mobile: team.mobile,
                                  location: team.location,
                                  profilePhoto: team.profilePhoto,
                                  role: team.role,
                                  status: team.status,
                                });
                                setIsTeamSheetOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Resend Invitation
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateTeamStatus(
                                  team.id,
                                  team.status === "active"
                                    ? "inactive"
                                    : "active",
                                )
                              }
                            >
                              {team.status === "active" ? (
                                <>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Suspend
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteTeam(team.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Venues Tab */}
          <TabsContent value="venues">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Venues</h2>
              <Sheet open={isVenueSheetOpen} onOpenChange={setIsVenueSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-[#e15a29] hover:bg-[#e15a29]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Venue
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      {editingVenue ? "Edit Venue" : "Add Venue"}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label>Venue Name</Label>
                      <Input
                        value={venueForm.venueName}
                        onChange={(e) =>
                          setVenueForm({
                            ...venueForm,
                            venueName: e.target.value,
                          })
                        }
                        placeholder="Enter venue name"
                      />
                    </div>
                    <div>
                      <Label>Venue Address</Label>
                      <Textarea
                        value={venueForm.venueAddress}
                        onChange={(e) =>
                          setVenueForm({
                            ...venueForm,
                            venueAddress: e.target.value,
                          })
                        }
                        placeholder="Enter full address"
                      />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input
                        value={venueForm.city}
                        onChange={(e) =>
                          setVenueForm({ ...venueForm, city: e.target.value })
                        }
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Select
                        value={venueForm.country}
                        onValueChange={(value) =>
                          setVenueForm({ ...venueForm, country: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="UK">UK</SelectItem>
                          <SelectItem value="UAE">UAE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Website (Optional)</Label>
                      <Input
                        value={venueForm.website}
                        onChange={(e) =>
                          setVenueForm({
                            ...venueForm,
                            website: e.target.value,
                          })
                        }
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <Label>Venue Image URL</Label>
                      <Input
                        value={venueForm.venueImage}
                        onChange={(e) =>
                          setVenueForm({
                            ...venueForm,
                            venueImage: e.target.value,
                          })
                        }
                        placeholder="Image URL"
                      />
                    </div>
                    <div>
                      <Label>Google Map Link (Optional)</Label>
                      <Input
                        value={venueForm.googleMapLink}
                        onChange={(e) =>
                          setVenueForm({
                            ...venueForm,
                            googleMapLink: e.target.value,
                          })
                        }
                        placeholder="Google Maps URL"
                      />
                    </div>
                    <div>
                      <Label>Distance From</Label>
                      {venueForm.distanceFrom.map((dist, idx) => (
                        <div key={idx} className="flex gap-2 mt-2">
                          <Input
                            placeholder="Location"
                            value={dist.from}
                            onChange={(e) => {
                              const newDist = [...venueForm.distanceFrom];
                              newDist[idx].from = e.target.value;
                              setVenueForm({
                                ...venueForm,
                                distanceFrom: newDist,
                              });
                            }}
                          />
                          <Input
                            placeholder="Distance"
                            value={dist.unit}
                            onChange={(e) => {
                              const newDist = [...venueForm.distanceFrom];
                              newDist[idx].unit = e.target.value;
                              setVenueForm({
                                ...venueForm,
                                distanceFrom: newDist,
                              });
                            }}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const newDist = venueForm.distanceFrom.filter(
                                (_, i) => i !== idx,
                              );
                              setVenueForm({
                                ...venueForm,
                                distanceFrom: newDist,
                              });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={() =>
                          setVenueForm({
                            ...venueForm,
                            distanceFrom: [
                              ...venueForm.distanceFrom,
                              { from: "", unit: "" },
                            ],
                          })
                        }
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Distance
                      </Button>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select
                        value={venueForm.status}
                        onValueChange={(value) =>
                          setVenueForm({
                            ...venueForm,
                            status: value as Venue["status"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={
                          editingVenue ? handleUpdateVenue : handleCreateVenue
                        }
                        className="flex-1 bg-[#e15a29] hover:bg-[#e15a29]/90"
                      >
                        {editingVenue ? "Update" : "Create"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsVenueSheetOpen(false);
                          setEditingVenue(null);
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {venues.map((venue) => (
                    <TableRow key={venue.id}>
                      <TableCell>
                        {venue.venueImage ? (
                          <Image
                            src={venue.venueImage}
                            alt={venue.venueName}
                            width={40}
                            height={40}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {venue.venueName}
                      </TableCell>
                      <TableCell>{venue.city}</TableCell>
                      <TableCell>{venue.country}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(venue.status)}>
                          {venue.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingVenue(venue);
                                setVenueForm({
                                  venueName: venue.venueName,
                                  venueAddress: venue.venueAddress,
                                  city: venue.city,
                                  country: venue.country,
                                  website: venue.website,
                                  venueImage: venue.venueImage,
                                  googleMapLink: venue.googleMapLink,
                                  distanceFrom: venue.distanceFrom,
                                  status: venue.status,
                                });
                                setIsVenueSheetOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateVenueStatus(
                                  venue.id,
                                  venue.status === "Active"
                                    ? "Inactive"
                                    : "Active",
                                )
                              }
                            >
                              {venue.status === "Active" ? (
                                <>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Suspend
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteVenue(venue.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="support">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Support Tickets
              </h2>
              <Sheet
                open={isTicketSheetOpen}
                onOpenChange={setIsTicketSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button className="bg-[#e15a29] hover:bg-[#e15a29]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Ticket
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Create Support Ticket</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label>Module</Label>
                      <Select
                        value={ticketForm.module}
                        onValueChange={(value) =>
                          setTicketForm({ ...ticketForm, module: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select module" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Event Creation">
                            Event Creation
                          </SelectItem>
                          <SelectItem value="User Management">
                            User Management
                          </SelectItem>
                          <SelectItem value="Payment Issue">
                            Payment Issue
                          </SelectItem>
                          <SelectItem value="Technical Support">
                            Technical Support
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Details</Label>
                      <Textarea
                        value={ticketForm.details}
                        onChange={(e) =>
                          setTicketForm({
                            ...ticketForm,
                            details: e.target.value,
                          })
                        }
                        placeholder="Describe your issue"
                        rows={5}
                      />
                    </div>
                    <div>
                      <Label>Upload Image (Optional)</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setTicketForm({
                                ...ticketForm,
                                uploadImage: reader.result as string,
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select
                        value={ticketForm.status}
                        onValueChange={(value) =>
                          setTicketForm({
                            ...ticketForm,
                            status: value as typeof ticketForm.status,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleCreateTicket}
                        className="flex-1 bg-[#e15a29] hover:bg-[#e15a29]/90"
                      >
                        Create
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsTicketSheetOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">
                        #{ticket.id.slice(0, 8)}
                      </TableCell>
                      <TableCell>{ticket.module}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {ticket.details}
                      </TableCell>
                      <TableCell>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Reply className="h-4 w-4 mr-2" />
                              Reply
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateTicketStatus(
                                  ticket.id,
                                  "In Progress",
                                )
                              }
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateTicketStatus(ticket.id, "Closed")
                              }
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Close
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
