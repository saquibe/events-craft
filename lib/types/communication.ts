// Automated Email Modules
export const AUTOMATED_MODULES = [
  { id: "user", label: "User", icon: "👤" },
  { id: "registration", label: "Registration", icon: "📝" },
  { id: "abstract", label: "Abstract", icon: "📄" },
  { id: "speaker", label: "Speaker", icon: "🎤" },
  { id: "agenda", label: "Agenda", icon: "📅" },
  { id: "presentation", label: "Presentation", icon: "📊" },
  { id: "certificate", label: "Certificate", icon: "🏆" },
  { id: "exhibitor", label: "Exhibitor", icon: "🏢" },
  { id: "emanual", label: "eManual", icon: "📖" },
  { id: "networking", label: "Networking", icon: "🤝" },
  { id: "lead", label: "Lead", icon: "⭐" },
  { id: "accommodation", label: "Accommodation", icon: "🏨" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "eventapp", label: "Event App", icon: "📱" },
  { id: "onsite", label: "Onsite Check-in", icon: "✅" },
  { id: "accounting", label: "Accounting", icon: "💰" },
];

// Email Templates by Module - Updated
export const EMAIL_TEMPLATES = {
  exhibitor: {
    admin: [
      {
        id: "exhibitor-admin-1",
        name: "Add Exhibitor - Welcome to [eventName]",
      },
      {
        id: "exhibitor-admin-2",
        name: "Add Attendee Registration (Conference) Quota",
      },
      {
        id: "exhibitor-admin-3",
        name: "Add Free Visitor Registration (Exhibition) Quota",
      },
      {
        id: "exhibitor-admin-4",
        name: "Add Exhibitor Badge (Staff/Stall Team) Quota",
      },
    ],
    exhibitor: [
      {
        id: "exhibitor-exhibitor-1",
        name: "Add Attendee Registration (Conference)",
      },
      {
        id: "exhibitor-exhibitor-2",
        name: "Add Visitor Registration (Exhibition)",
      },
      {
        id: "exhibitor-exhibitor-3",
        name: "Add Exhibitor Badge (Staff/Stall Team)",
      },
    ],
  },
  emanual: {
    admin: [
      { id: "emanual-1", name: "1st Form Submission Reminder" },
      { id: "emanual-2", name: "2nd Form Submission Reminder" },
      { id: "emanual-3", name: "3rd Form Submission Reminder" },
      { id: "emanual-4", name: "Add Official Contractor" },
    ],
  },
  presentation: {
    admin: [
      { id: "presentation-1", name: "1st Form Submission Reminder" },
      { id: "presentation-2", name: "2nd Form Submission Reminder" },
      { id: "presentation-3", name: "3rd Form Submission Reminder" },
    ],
  },
  user: {
    admin: [
      { id: "user-1", name: "Welcome to [eventName]" },
      { id: "user-2", name: "Password Reset" },
    ],
  },
  registration: {
    admin: [
      { id: "registration-1", name: "Registration Confirmation" },
      { id: "registration-2", name: "Registration Reminder" },
    ],
  },
  abstract: {
    admin: [
      { id: "abstract-1", name: "Abstract Submission Confirmation" },
      { id: "abstract-2", name: "Abstract Review Status" },
    ],
  },
  certificate: {
    admin: [
      { id: "certificate-1", name: "Certificate Generation" },
      { id: "certificate-2", name: "Certificate Download Link" },
    ],
  },
  networking: {
    admin: [
      { id: "networking-1", name: "Networking Invitation" },
      { id: "networking-2", name: "Meeting Request" },
    ],
  },
  lead: {
    admin: [
      { id: "lead-1", name: "Lead Notification" },
      { id: "lead-2", name: "Lead Follow-up" },
    ],
  },
  accommodation: {
    admin: [
      { id: "accommodation-1", name: "Accommodation Booking Confirmation" },
      { id: "accommodation-2", name: "Accommodation Reminder" },
    ],
  },
  travel: {
    admin: [
      { id: "travel-1", name: "Travel Itinerary" },
      { id: "travel-2", name: "Travel Reminder" },
    ],
  },
  eventapp: {
    admin: [
      { id: "eventapp-1", name: "App Download Link" },
      { id: "eventapp-2", name: "App Update Notification" },
    ],
  },
  onsite: {
    admin: [
      { id: "onsite-1", name: "Check-in Confirmation" },
      { id: "onsite-2", name: "Check-in Reminder" },
    ],
  },
  accounting: {
    admin: [
      { id: "accounting-1", name: "Invoice Generation" },
      { id: "accounting-2", name: "Payment Reminder" },
    ],
  },
};
