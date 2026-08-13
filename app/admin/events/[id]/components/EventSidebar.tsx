// app/admin/events/[id]/components/EventSidebar.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
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
  X,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/abstract/dashboard" },
      { label: "Abstracts", href: "/admin/events/[id]/abstract/my-abstracts" },
      { label: "Categories", href: "/admin/events/[id]/abstract/categories" },
      {
        label: "Abstract Reviewer",
        href: "/admin/events/[id]/abstract/reviewers",
      },
      {
        label: "Abstract Approver",
        href: "/admin/events/[id]/abstract/approvers",
      },
      {
        label: "Presentation Judge",
        href: "/admin/events/[id]/abstract/judges",
      },
      {
        label: "Forms",
        subItems: [
          {
            label: "Abstract Submission Form",
            href: "/admin/events/[id]/abstract/forms/submission",
          },
          {
            label: "Talk Judging Form",
            href: "/admin/events/[id]/abstract/forms/talk-judging",
          },
          {
            label: "Paper Judging Form",
            href: "/admin/events/[id]/abstract/forms/paper-judging",
          },
          {
            label: "Poster Judging Form",
            href: "/admin/events/[id]/abstract/forms/poster-judging",
          },
        ],
      },
      { label: "Settings", href: "/admin/events/[id]/abstract/settings" },
    ],
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
        label: "Invited Talk",
        href: "/admin/events/[id]/presentation/invited-talk",
      },
      { label: "Paper", href: "/admin/events/[id]/presentation/paper" },
      { label: "ePoster", href: "/admin/events/[id]/presentation/eposter" },
      {
        label: "Submission Guidelines",
        subItems: [
          {
            label: "Talk Guidelines",
            href: "/admin/events/[id]/presentation/guidelines/talk",
          },
          {
            label: "Paper Guidelines",
            href: "/admin/events/[id]/presentation/guidelines/paper",
          },
          {
            label: "ePoster Guidelines",
            href: "/admin/events/[id]/presentation/guidelines/eposter",
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
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/emanual/dashboard" },
      {
        label: "eManual Builder",
        subItems: [
          { label: "Menu", href: "/admin/events/[id]/emanual/menus" },
          {
            label: "Information",
            href: "/admin/events/[id]/emanual/information",
          },
          { label: "Forms", href: "/admin/events/[id]/emanual/forms" },
        ],
      },
      {
        label: "Official Contractor",
        href: "/admin/events/[id]/emanual/contractors",
      },
      { label: "Additional Items", href: "/admin/events/[id]/emanual/items" },
      { label: "Item Category", href: "/admin/events/[id]/emanual/categories" },
      { label: "Orders", href: "/admin/events/[id]/emanual/orders" },
      { label: "Setting", href: "/admin/events/[id]/emanual/settings" },
    ],
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
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/check-in/dashboard" },
      {
        label: "Badge Design",
        href: "/admin/events/[id]/check-in/badge-design",
      },
      {
        label: "Attendee Profile",
        href: "/admin/events/[id]/check-in/attendee-profile",
      },
      { label: "Data Import", href: "/admin/events/[id]/check-in/data-import" },
      {
        label: "Spot Registration",
        href: "/admin/events/[id]/check-in/spot-registration",
      },
      { label: "Send QR Code", href: "/admin/events/[id]/check-in/send-qr" },
      { label: "Scan Point", href: "/admin/events/[id]/check-in/scan-point" },
      { label: "Privileges", href: "/admin/events/[id]/check-in/privileges" },
      { label: "Onsite Key", href: "/admin/events/[id]/check-in/onsite-key" },
    ],
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
    subItems: [
      { label: "Dashboard", href: "/admin/events/[id]/accounting/dashboard" },
      {
        label: "Expenses",
        subItems: [
          { label: "Expenses", href: "/admin/events/[id]/accounting/expenses" },
          {
            label: "Expense Category",
            href: "/admin/events/[id]/accounting/expense-category",
          },
          {
            label: "Expense Head",
            href: "/admin/events/[id]/accounting/expense-head",
          },
        ],
      },
      {
        label: "Sponsor Income",
        subItems: [
          { label: "Invoices", href: "/admin/events/[id]/accounting/invoices" },
          {
            label: "Invoice Items",
            href: "/admin/events/[id]/accounting/invoice-items",
          },
          {
            label: "Record Income",
            href: "/admin/events/[id]/accounting/record-income",
          },
          {
            label: "Invoice Notes",
            href: "/admin/events/[id]/accounting/invoice-notes",
          },
        ],
      },
      {
        label: "Registration Income",
        href: "/admin/events/[id]/accounting/registration-income",
      },
    ],
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/events/[id]/analytics/dashboard",
  },
];

interface EventSidebarProps {
  eventId: string;
  onClose?: () => void;
  isMobile?: boolean;
}

export function EventSidebar({
  eventId,
  onClose,
  isMobile = false,
}: EventSidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile && onClose) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Filter menu items based on search query
  const filterMenuItems = (items: MenuItem[], query: string): MenuItem[] => {
    if (!query.trim()) return items;

    const lowerQuery = query.toLowerCase().trim();
    const filtered: MenuItem[] = [];

    items.forEach((item) => {
      const labelMatch = item.label.toLowerCase().includes(lowerQuery);
      let filteredSubItems: MenuItem[] | undefined;

      if (item.subItems) {
        filteredSubItems = filterMenuItems(item.subItems, query);
      }

      // Include item if label matches or has matching subitems
      if (labelMatch || (filteredSubItems && filteredSubItems.length > 0)) {
        filtered.push({
          ...item,
          subItems: labelMatch ? item.subItems : filteredSubItems,
        });
      }
    });

    return filtered;
  };

  const filteredMenuData = useMemo(() => {
    return filterMenuItems(menuData, searchQuery);
  }, [searchQuery]);

  // Auto-expand menus when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      const expandedMenus: Record<string, boolean> = {};
      const expandItems = (items: MenuItem[]) => {
        items.forEach((item) => {
          if (item.subItems && item.subItems.length > 0) {
            // Check if any subitem matches the search
            const hasMatchingSubItem = item.subItems.some((sub) =>
              sub.label
                .toLowerCase()
                .includes(searchQuery.toLowerCase().trim()),
            );
            if (hasMatchingSubItem) {
              expandedMenus[item.label] = true;
            }
            expandItems(item.subItems);
          }
        });
      };
      expandItems(menuData);
      setOpenMenus(expandedMenus);
    } else {
      // Don't close all menus, just keep the ones that were manually opened
      // We'll keep the existing state
    }
  }, [searchQuery]);

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
              w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-200
              ${
                isActiveItem
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-primary/8 hover:text-primary"
              }
              ${depth === 1 ? "pl-6 sm:pl-8" : ""}
              ${depth >= 2 ? "pl-8 sm:pl-12" : ""}
            `}
          >
            {item.icon && (
              <item.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            )}
            <span className="flex-1 text-left truncate">{item.label}</span>
            {isOpen ? (
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 transition-transform" />
            ) : (
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 transition-transform" />
            )}
          </button>
          {isOpen && (
            <div className="ml-2 sm:ml-4 mt-1 sm:mt-2 space-y-1 border-l-2 border-primary/15 pl-2 sm:pl-4">
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
          flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-200
          ${
            isActiveItem
              ? "bg-primary/10 text-primary font-semibold"
              : "text-muted-foreground hover:bg-primary/8 hover:text-primary"
          }
          ${depth > 0 ? "pl-6 sm:pl-8" : ""}
        `}
      >
        {item.icon && (
          <item.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
        )}
        <span className="truncate">{item.label}</span>
      </Link>
    );
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <aside className="h-full w-full bg-background border-r flex flex-col">
      {/* Mobile header with close button */}
      {isMobile && (
        <div className="flex items-center justify-between p-3 sm:p-4 border-b lg:hidden">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <LayoutDashboard className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium">Event Menu</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Desktop header */}
      {!isMobile && (
        <div className="p-3 sm:p-4 border-b hidden lg:block">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <LayoutDashboard className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium">Event Menu</span>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="px-2 sm:px-3 pt-2 sm:pt-3 pb-1 sm:pb-2 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "pl-8 sm:pl-9 pr-8 h-8 sm:h-9 text-xs sm:text-sm",
              "bg-muted/50 border-muted focus:bg-background",
            )}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0.5 top-0.5 h-7 w-7 sm:h-8 sm:w-8"
              onClick={clearSearch}
            >
              <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Button>
          )}
        </div>
        {searchQuery && filteredMenuData.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-2">
            No menu items found
          </p>
        )}
        {searchQuery && filteredMenuData.length > 0 && (
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center py-1">
            Found {filteredMenuData.length} result(s)
          </p>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 sm:p-3 space-y-1">
          {filteredMenuData.length > 0 ? (
            filteredMenuData.map((item) => renderMenuItem(item))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No results found</p>
              <p className="text-xs">Try adjusting your search</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
