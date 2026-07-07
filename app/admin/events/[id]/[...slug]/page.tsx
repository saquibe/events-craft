"use client";

import ComingSoon from "@/components/admin/common/ComingSoon";
import { useParams } from "next/navigation";

// Map of URL patterns to feature names and descriptions
const featureMap: Record<string, { title: string; description: string }> = {
  // Event Setting
  settings: {
    title: "Event Settings",
    description: "Configure event details, branding, and general settings.",
  },

  // User
  users: {
    title: "User Management",
    description: "Manage all users registered for this event.",
  },

  // Registration
  "registration/types": {
    title: "Registration Types",
    description: "Configure different registration tiers and pricing.",
  },
  "registration/dashboard": {
    title: "Registration Dashboard",
    description: "View registration statistics and manage attendees.",
  },

  // Abstract
  "abstract/dashboard": {
    title: "Abstract Management",
    description: "Review and manage abstract submissions.",
  },

  // Speaker
  "speaker/dashboard": {
    title: "Speaker Dashboard",
    description: "Overview of all speakers and their sessions.",
  },
  "speaker/list": {
    title: "Speaker List",
    description: "View and manage all speakers.",
  },
  "speaker/convert": {
    title: "Convert to Speaker",
    description: "Convert registered users to speakers.",
  },
  "speaker/types": {
    title: "Speaker Types",
    description: "Configure different speaker categories.",
  },
  "speaker/settings": {
    title: "Speaker Settings",
    description: "Configure speaker-related settings.",
  },

  // Agenda
  "agenda/dashboard": {
    title: "Agenda Dashboard",
    description: "Overview of the event schedule.",
  },
  "agenda/halls": {
    title: "Hall Management",
    description: "Manage event halls and rooms.",
  },
  "agenda/tracks": {
    title: "Track Management",
    description: "Configure session tracks.",
  },
  "agenda/sessions": {
    title: "Session Management",
    description: "Create and manage sessions.",
  },
  "agenda/topics": {
    title: "Topic Management",
    description: "Manage session topics.",
  },
  "agenda/live-display": {
    title: "Live Display",
    description: "Manage live display settings.",
  },

  // Presentation
  "presentation/dashboard": {
    title: "Presentation Dashboard",
    description: "Overview of all presentations.",
  },
  "presentation/submitted/talk": {
    title: "Talk Submissions",
    description: "Review submitted talks.",
  },
  "presentation/submitted/eposter": {
    title: "ePoster Submissions",
    description: "Review submitted ePosters.",
  },
  "presentation/submitted/paper": {
    title: "Paper Submissions",
    description: "Review submitted papers.",
  },
  "presentation/forms/talk": {
    title: "Talk Submission Form",
    description: "Configure talk submission form.",
  },
  "presentation/forms/eposter": {
    title: "ePoster Submission Form",
    description: "Configure ePoster submission form.",
  },
  "presentation/forms/paper": {
    title: "Paper Submission Form",
    description: "Configure paper submission form.",
  },
  "presentation/guidelines/talk": {
    title: "Talk Guidelines",
    description: "Configure talk submission guidelines.",
  },
  "presentation/guidelines/eposter": {
    title: "ePoster Guidelines",
    description: "Configure ePoster submission guidelines.",
  },
  "presentation/guidelines/paper": {
    title: "Paper Guidelines",
    description: "Configure paper submission guidelines.",
  },
  "presentation/settings": {
    title: "Presentation Settings",
    description: "Configure presentation-related settings.",
  },

  // Certificate
  "certificate/dashboard": {
    title: "Certificate Dashboard",
    description: "Manage certificates for attendees and speakers.",
  },

  // Exhibitor
  "exhibitor/dashboard": {
    title: "Exhibitor Dashboard",
    description: "Manage exhibitors and sponsors.",
  },

  // eManual
  "emanual/dashboard": {
    title: "eManual Dashboard",
    description: "Manage event manuals and documents.",
  },

  // Networking
  "networking/dashboard": {
    title: "Networking Dashboard",
    description: "Manage networking features and connections.",
  },

  // Lead
  "lead/dashboard": {
    title: "Lead Management",
    description: "Track and manage leads from the event.",
  },

  // Accommodation
  "accommodation/dashboard": {
    title: "Accommodation Management",
    description: "Manage accommodation for attendees.",
  },

  // Travel
  "travel/dashboard": {
    title: "Travel Management",
    description: "Manage travel arrangements.",
  },

  // Event App
  "app/dashboard": {
    title: "Event App Management",
    description: "Configure the event mobile app.",
  },

  // Onsite Check-in
  "check-in/dashboard": {
    title: "Onsite Check-in",
    description: "Manage onsite check-in process.",
  },

  // Communication
  "communication/automated/speaker": {
    title: "Automated Emails - Speaker",
    description: "Configure automated emails for speakers.",
  },
  "communication/automated/agenda": {
    title: "Automated Emails - Agenda",
    description: "Configure automated emails for agenda updates.",
  },
  "communication/automated/presentation": {
    title: "Automated Emails - Presentation",
    description: "Configure automated emails for presentations.",
  },
  "communication/ondemand/create": {
    title: "On-Demand Emails - Create",
    description: "Create and send on-demand emails.",
  },
  "communication/ondemand/history": {
    title: "On-Demand Emails - History",
    description: "View email sending history.",
  },
  "communication/settings/header-footer": {
    title: "Email Settings - Header & Footer",
    description: "Configure email header and footer templates.",
  },
  "communication/settings/senders": {
    title: "Email Settings - Sender Emails",
    description: "Manage sender email addresses.",
  },

  // Accounting
  "accounting/dashboard": {
    title: "Accounting Dashboard",
    description: "View financial reports and manage transactions.",
  },

  // Analytics
  "analytics/dashboard": {
    title: "Analytics Dashboard",
    description: "View event analytics and insights.",
  },
};

export default function CatchAllComingSoonPage() {
  const params = useParams();
  const slug = (params?.slug as string[]) || [];
  const slugPath = slug.join("/");

  // Find matching feature
  const feature = featureMap[slugPath];

  if (feature) {
    return (
      <ComingSoon
        title={feature.title}
        description={feature.description}
        featureName={feature.title}
        estimatedDate="Q2 2026"
        showBackButton={true}
      />
    );
  }

  // Default coming soon for unmapped routes
  const lastSegment = slug[slug.length - 1] || "Feature";
  const title = lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <ComingSoon
      title={`${title} - Coming Soon`}
      description={`This feature is currently under development. Check back later for updates.`}
      featureName={title}
      estimatedDate="Q2 2026"
      showBackButton={true}
    />
  );
}
