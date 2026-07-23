"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Users,
  FileText,
  Mic2,
  Calendar,
  Presentation,
  Award,
  Building2,
  BookOpen,
  Users2,
  TrendingUp,
  Hotel,
  Plane,
  Smartphone,
  ClipboardCheck,
  Mail,
  Calculator,
  BarChart3,
  Settings,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon?: any;
  href?: string;
  subItems?: MenuItem[];
}

const menuData: MenuItem[] = [
  {
    label: "Event Setting",
    icon: Settings,
    href: "/admin/events/[id]/settings",
  },
  {
    label: "User",
    icon: Users,
    href: "/admin/events/[id]/users",
  },
  {
    label: "Registration",
    icon: ClipboardCheck,
    subItems: [
      {
        label: "Registration Types",
        href: "/admin/events/[id]/registration/types",
      },
      {
        label: "Registration Dashboard",
        href: "/admin/events/[id]/registration/dashboard",
      },
    ],
  },
  {
    label: "Abstract",
    icon: FileText,
    href: "/admin/events/[id]/abstract/dashboard",
  },
  {
    label: "Speaker",
    icon: Mic2,
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/speaker/dashboard" },
      { label: "Speaker", href: "/admin/events/[id]/speaker/list" },
      {
        label: "Convert to Speaker",
        href: "/admin/events/[id]/speaker/convert",
      },
      { label: "Speaker Type", href: "/admin/events/[id]/speaker/types" },
      { label: "Setting", href: "/admin/events/[id]/speaker/settings" },
    ],
  },
  {
    label: "Agenda",
    icon: Calendar,
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/agenda/dashboard" },
      { label: "Hall", href: "/admin/events/[id]/agenda/halls" },
      { label: "Track", href: "/admin/events/[id]/agenda/tracks" },
      { label: "Session", href: "/admin/events/[id]/agenda/sessions" },
      { label: "Topic", href: "/admin/events/[id]/agenda/topics" },
      { label: "Live Display", href: "/admin/events/[id]/agenda/live-display" },
    ],
  },
  {
    label: "Presentation",
    icon: Presentation,
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/presentation/dashboard" },
      {
        label: "Submitted",
        subItems: [
          {
            label: "Talk Submitted",
            href: "/admin/events/[id]/presentation/submitted/talk",
          },
          {
            label: "ePoster Submitted",
            href: "/admin/events/[id]/presentation/submitted/eposter",
          },
          {
            label: "Paper Submitted",
            href: "/admin/events/[id]/presentation/submitted/paper",
          },
        ],
      },
      {
        label: "Submission Forms",
        subItems: [
          {
            label: "Talk Form",
            href: "/admin/events/[id]/presentation/forms/talk",
          },
          {
            label: "ePoster Form",
            href: "/admin/events/[id]/presentation/forms/eposter",
          },
          {
            label: "Paper Form",
            href: "/admin/events/[id]/presentation/forms/paper",
          },
        ],
      },
      {
        label: "Submission Guidelines",
        subItems: [
          {
            label: "Talk Guidelines",
            href: "/admin/events/[id]/presentation/guidelines/talk",
          },
          {
            label: "ePoster Guidelines",
            href: "/admin/events/[id]/presentation/guidelines/eposter",
          },
          {
            label: "Paper Guidelines",
            href: "/admin/events/[id]/presentation/guidelines/paper",
          },
        ],
      },
      { label: "Setting", href: "/admin/events/[id]/presentation/settings" },
    ],
  },
  {
    label: "Certificate",
    icon: Award,
    href: "/admin/events/[id]/certificate/dashboard",
  },
  {
    label: "Exhibitor",
    icon: Building2,
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/exhibitor/dashboard" },
      { label: "Exhibitor", href: "/admin/events/[id]/exhibitor/exhibitor" },
      { label: "Exhibition Hall", href: "/admin/events/[id]/exhibitor/halls" },
      {
        label: "Exhibition Stalls",
        href: "/admin/events/[id]/exhibitor/stalls",
      },
      { label: "Category", href: "/admin/events/[id]/exhibitor/category" },
      {
        label: "Attendee by Exhibitor",
        href: "/admin/events/[id]/exhibitor/attendee-by-exhibitor",
      },
      {
        label: "Visitor by Exhibitor",
        href: "/admin/events/[id]/exhibitor/visitor-by-exhibitor",
      },
      // {
      //   label: "Exhibitor Badges",
      //   href: "/admin/events/[id]/exhibitor/badges",
      // },
      {
        label: "Registration Quota",
        subItems: [
          {
            label: "Attendee Registration",
            href: "/admin/events/[id]/exhibitor/registration-quota/attendee",
          },
          {
            label: "Visitor Registration",
            href: "/admin/events/[id]/exhibitor/registration-quota/visitor",
          },
          {
            label: "Exhibitor Badge",
            href: "/admin/events/[id]/exhibitor/registration-quota/badges",
          },
        ],
      },
      { label: "Setting", href: "/admin/events/[id]/exhibitor/setting" },
    ],
  },
  {
    label: "eManual",
    icon: BookOpen,
    href: "/admin/events/[id]/emanual/dashboard",
  },
  {
    label: "Networking",
    icon: Users2,
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/networking/dashboard" },
      { label: "Meetings", href: "/admin/events/[id]/networking/meetings" },
      {
        label: "Location / Table",
        href: "/admin/events/[id]/networking/locations",
      },
      { label: "Time Slot", href: "/admin/events/[id]/networking/time-slots" },
      { label: "Settings", href: "/admin/events/[id]/networking/settings" },
    ],
  },
  {
    label: "Lead",
    icon: TrendingUp,
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/lead/dashboard" },
      { label: "Lead Form", href: "/admin/events/[id]/lead/lead-form" },
    ],
  },
  {
    label: "Accommodation",
    icon: Hotel,
    subItems: [
      {
        label: "Dashboard",
        href: "/admin/events/[id]/accommodation/dashboard",
      },
      { label: "Hotel", href: "/admin/events/[id]/accommodation/hotels" },
      {
        label: "Room Type",
        href: "/admin/events/[id]/accommodation/room-types",
      },
      { label: "Booking", href: "/admin/events/[id]/accommodation/bookings" },
    ],
  },
  {
    label: "Travel",
    icon: Plane,
    href: "/admin/events/[id]/travel/dashboard",
  },
  {
    label: "Event App",
    icon: Smartphone,
    href: "/admin/events/[id]/app/dashboard",
  },
  {
    label: "Onsite Check-in",
    icon: ClipboardCheck,
    href: "/admin/events/[id]/check-in/dashboard",
  },
  {
    label: "Communication",
    icon: Mail,
    subItems: [
      {
        label: "Automated Emails",
        subItems: [
          {
            label: "User",
            href: "/admin/events/[id]/communication/automated/user",
          },
          {
            label: "Registration",
            href: "/admin/events/[id]/communication/automated/registration",
          },
          {
            label: "Abstract",
            href: "/admin/events/[id]/communication/automated/abstract",
          },
          {
            label: "Speaker",
            href: "/admin/events/[id]/communication/automated/speaker",
          },
          {
            label: "Agenda",
            href: "/admin/events/[id]/communication/automated/agenda",
          },
          {
            label: "Presentation",
            href: "/admin/events/[id]/communication/automated/presentation",
          },
          {
            label: "Certificate",
            href: "/admin/events/[id]/communication/automated/certificate",
          },
          {
            label: "Exhibitor",
            href: "/admin/events/[id]/communication/automated/exhibitor",
          },
          {
            label: "eManual",
            href: "/admin/events/[id]/communication/automated/emanual",
          },
          {
            label: "Networking",
            href: "/admin/events/[id]/communication/automated/networking",
          },
          {
            label: "Lead",
            href: "/admin/events/[id]/communication/automated/lead",
          },
          {
            label: "Accommodation",
            href: "/admin/events/[id]/communication/automated/accommodation",
          },
          {
            label: "Travel",
            href: "/admin/events/[id]/communication/automated/travel",
          },
          {
            label: "Event App",
            href: "/admin/events/[id]/communication/automated/eventapp",
          },
          {
            label: "Onsite Check-in",
            href: "/admin/events/[id]/communication/automated/onsite",
          },
          {
            label: "Accounting",
            href: "/admin/events/[id]/communication/automated/accounting",
          },
        ],
      },
      {
        label: "On-Demand Emails",
        subItems: [
          {
            label: "Create Email",
            href: "/admin/events/[id]/communication/ondemand/create",
          },
          {
            label: "Email History",
            href: "/admin/events/[id]/communication/ondemand/history",
          },
        ],
      },
      {
        label: "Email Settings",
        subItems: [
          {
            label: "Header & Footer",
            href: "/admin/events/[id]/communication/settings/header-footer",
          },
          {
            label: "Sender Emails",
            href: "/admin/events/[id]/communication/settings/senders",
          },
        ],
      },
    ],
  },
  {
    label: "Accounting",
    icon: Calculator,
    href: "/admin/events/[id]/accounting/dashboard",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/events/[id]/analytics/dashboard",
  },
];

interface EventSidebarProps {
  eventId: string;
}

export function EventSidebar({ eventId }: EventSidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (href: string) => {
    const resolvedHref = href.replace("[id]", eventId);
    return (
      pathname === resolvedHref || pathname?.startsWith(resolvedHref + "/")
    );
  };

  const isActiveParent = (item: MenuItem): boolean => {
    if (item.href && isActive(item.href)) return true;
    if (item.subItems) {
      return item.subItems.some((sub) => isActiveParent(sub));
    }
    return false;
  };

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus[item.label] ?? false;
    const isActiveItem = isActiveParent(item);
    const resolvedHref = item.href ? item.href.replace("[id]", eventId) : "#";

    if (hasSubItems) {
      return (
        <div key={item.label} className="w-full">
          <button
            onClick={() => toggleMenu(item.label)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
              ${
                isActiveItem
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-primary/8 hover:text-primary"
              }
              ${depth === 1 ? "pl-10" : ""}
${depth >= 2 ? "pl-14" : ""}
            `}
          >
            {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
            <span className="flex-1 text-left">{item.label}</span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0 transition-transform" />
            )}
          </button>
          {isOpen && (
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-primary/15 pl-4">
              {item.subItems?.map((subItem) =>
                renderMenuItem(subItem, depth + 1),
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.label}
        href={resolvedHref}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200
          ${
            isActiveItem
              ? "bg-primary/10 text-primary font-semibold"
              : "text-muted-foreground hover:bg-primary/8 hover:text-primary"
          }
          ${depth > 0 ? "pl-8" : ""}
        `}
      >
        {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 px-3 py-2 mb-4">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <LayoutDashboard className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">Event Menu</span>
        </div>

        <nav className="space-y-1">
          {menuData.map((item) => renderMenuItem(item))}
        </nav>
      </div>
    </aside>
  );
}
