export interface Hall {
  id: string;
  name: string;
  capacity?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Track {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  name: string;
  chairperson: string[]; // Array of user IDs
  trackId: string;
  track?: Track;
  hallId: string;
  hall?: Hall;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export type TopicType =
  | "Presentation"
  | "Panel Discussion"
  | "Quiz"
  | "Debate"
  | "Abstract Talk"
  | "ePoster Presentation"
  | "Paper Presentation";

export interface Topic {
  id: string;
  sessionId: string;
  session?: Session;
  topicType: TopicType;
  topic: string;
  speakers: string[]; // Array of speaker IDs
  moderator: string[]; // Array of moderator IDs
  panellists: string[]; // Array of panellist IDs
  teamMembers: string[]; // Array of team member IDs
  presenters: string[]; // Array of presenter IDs
  startTime: string;
  endTime: string;
  aboutTopic: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgendaStats {
  totalSessions: number;
  totalTopics: number;
  totalHalls: number;
  totalTracks: number;
  upcomingSessions: number;
  completedSessions: number;
}
