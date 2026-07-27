// components/partials/header/admin-header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  HelpCircle,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

// Dummy notifications
const notifications = [
  {
    id: 1,
    title: "New event created",
    description: "Tech Conference 2026 has been created",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Event published",
    description: "Medical Conference is now live",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "New registration",
    description: "John Doe registered for AI Summit",
    time: "3 hours ago",
    read: true,
  },
];

// Mock function to get event data - replace with actual data fetching
const getEventData = (eventId: string) => {
  return {
    id: eventId,
    name: "Medical Conference 2026",
    status: "Published",
  };
};

interface AdminHeaderProps {
  showEventContext?: boolean;
  onMenuToggle?: () => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
}

export default function AdminHeader({
  showEventContext = false,
  onMenuToggle,
  isMobile = false,
  sidebarOpen = false,
}: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [eventData, setEventData] = useState<{
    id: string;
    name: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);

    // Extract event ID from pathname
    const match = pathname?.match(/\/admin\/events\/([^/]+)/);
    if (match && showEventContext) {
      const eventId = match[1];
      const data = getEventData(eventId);
      setEventData(data);
    } else {
      setEventData(null);
    }
  }, [pathname, showEventContext]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  // Determine which logo to show based on theme
  const getLogo = () => {
    if (!mounted) return "/images/logo/logo-w-2.png";
    if (theme === "dark") {
      return "/images/logo/logo-w-2.png";
    }
    return "/images/logo/logo-w-1.png";
  };

  // Check if we're on an event page
  const isEventPage =
    pathname?.includes("/admin/events/") &&
    !pathname?.includes("/admin/events/[id]") &&
    !pathname?.includes("/admin/events/create");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6">
        {/* Left side - Menu Button, Back Button, Logo, and Event Context */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
              onClick={onMenuToggle}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          )}

          {/* Back Button - Show on event pages */}
          {isEventPage && eventData && !isMobile && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 sm:gap-2 text-muted-foreground hover:text-foreground flex-shrink-0 px-2 sm:px-3"
                onClick={() => router.push("/admin/dashboard")}
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="h-6 w-px bg-border hidden sm:block" />
            </>
          )}

          {/* Logo */}
          <Link
            href="/admin/dashboard"
            className="flex items-center flex-shrink-0"
          >
            <div className="relative h-8 w-24 sm:h-12 sm:w-36">
              <Image
                src={getLogo()}
                alt="EventsCraft Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Event Context - Show when on event pages */}
          {isEventPage && eventData && (
            <>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                  {eventData.name}
                </span>
                <Badge
                  color={
                    eventData.status === "Published"
                      ? "success"
                      : eventData.status === "Draft"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-[10px] sm:text-xs flex-shrink-0"
                >
                  {eventData.status}
                </Badge>
              </div>
            </>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          {/* Theme Switcher */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
          >
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full h-8 w-8 sm:h-10 sm:w-10"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center bg-red-500 text-white text-[10px] sm:text-xs">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 sm:w-80 p-0" align="end">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b">
                <h4 className="font-semibold text-sm sm:text-base">
                  Notifications
                </h4>
                <Button variant="ghost" size="sm" className="text-xs">
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-80 sm:max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 sm:p-4 border-b hover:bg-muted transition-colors cursor-pointer ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                  >
                    <p className="font-medium text-xs sm:text-sm">
                      {notification.title}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full p-0"
              >
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer">
                  <AvatarImage src="/images/avatar/default-avatar.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 sm:w-72" align="end">
              <DropdownMenuLabel className="p-0">
                <div className="flex items-center gap-3 p-3 border-b">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                    <AvatarImage src="/images/avatar/default-avatar.png" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm sm:text-base">
                      Admin User
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-[140px] sm:max-w-[180px]">
                      admin@eventscraft.com
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link
                  href="/admin/profile"
                  className="flex items-center gap-2 text-sm"
                >
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link
                  href="/admin/support"
                  className="flex items-center gap-2 text-sm"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Raise a Ticket</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 text-sm"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600 text-sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
