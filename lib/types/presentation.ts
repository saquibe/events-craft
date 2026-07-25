export type PresentationType = "Talk" | "Paper" | "ePoster";

export interface Presentation {
  id: string;
  type: PresentationType;
  presenterName: string;
  presenterEmail: string;
  abstractId: string;
  topic: string;
  dateTime: string;
  location: string;
  status: "Submitted" | "Pending" | "Accepted" | "Rejected";
  fileUrl?: string;
  submittedAt: string;
  updatedAt: string;
}

export interface PresentationGuidelines {
  id: string;
  type: PresentationType;
  content: string;
  updatedAt: string;
}

export interface PresentationSettings {
  id: string;
  type: PresentationType;
  submissionOpenDate: string;
  submissionCloseDate: string;
  firstReminderDays: number;
  secondReminderDays: number;
  thirdReminderDays: number;
  updatedAt: string;
}

export interface PresentationStats {
  totalSubmissions: number;
  totalTalks: number;
  totalPapers: number;
  totalEPosters: number;
  pendingTalks: number;
  pendingPapers: number;
  pendingEPosters: number;
}
