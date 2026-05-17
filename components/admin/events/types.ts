export interface Event {
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

export interface EventFormData {
  eventName: string;
  eventLogo: string;
  venueName: string;
  timeZone: string;
  startDateTime: string;
  endDateTime: string;
  eventType: string;
  status: Event["status"];
}

export interface EventsTabProps {
  events: Event[];
  venues: { id: string; venueName: string }[];
  onUpdateEvent: (id: string, data: Partial<Event>) => void;
  onDeleteEvent: (id: string) => void;
}

export interface EventsTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Event["status"]) => void;
}

export interface EventFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingEvent: Event | null;
  venues: { id: string; venueName: string }[];
  onSave: (data: EventFormData) => void;
}
