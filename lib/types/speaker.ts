export interface SpeakerType {
  id: string;
  name: string;
  description?: string;
}

export interface Speaker {
  id: string;
  email: string;
  prefix: string;
  firstName: string;
  lastName: string;
  mobile?: string;
  designation?: string;
  company?: string;
  profilePhoto?: string;
  speakerTypeId: string;
  speakerType?: SpeakerType;
  speakerAcceptance: boolean;
  speakerEmail: boolean;
  registrationId?: string;
  status: "registered" | "pending" | "invited";
  createdAt: string;
  updatedAt: string;
}

export interface SpeakerFormData {
  email: string;
  prefix: string;
  firstName: string;
  lastName: string;
  mobile?: string;
  designation?: string;
  company?: string;
  profilePhoto?: string;
  speakerTypeId: string;
  speakerAcceptance: boolean;
  speakerEmail: boolean;
}

export interface ConvertToSpeakerData {
  id: string;
  name: string;
  registration: string;
  email: string;
  mobile: string;
  designation: string;
  company: string;
  type: "Attendee" | "Speaker";
  status: "Registered" | "Pending Registration";
}
