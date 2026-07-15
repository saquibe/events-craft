//app/components/partials/header/admin-header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  HelpCircle,
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

export default function AdminHeader() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  // Determine which logo to show based on theme
  const getLogo = () => {
    if (!mounted) return "/images/logo/logo-w-2.png"; // Default fallback

    if (theme === "dark") {
      return "/images/logo/logo-w-2.png"; // White logo for dark theme
    }
    return "/images/logo/logo-w-1.png"; // Dark/colored logo for light theme
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Logo */}
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="flex items-center">
            <div className="relative h-12 w-36">
              <Image
                src={getLogo()}
                alt="EventsCraft Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <Bell className="h-5 w-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="font-semibold">Notifications</h4>
                <Button variant="ghost" size="sm" className="text-xs">
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-muted transition-colors cursor-pointer ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                  >
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
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
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 cursor-pointer">
                  <AvatarImage src="/images/avatar/default-avatar.png" />
                  {/* <AvatarFallback className="bg-primary text-white">
                    AD
                  </AvatarFallback> */}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="end">
              <DropdownMenuLabel className="p-0">
                <div className="flex items-center gap-3 p-3 border-b">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/images/avatar/default-avatar.png" />
                    {/* <AvatarFallback className="bg-primary text-white">
                          AD
                        </AvatarFallback> */}
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">Admin User</span>
                    <span className="text-xs text-muted-foreground">
                      admin@eventscraft.com
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/admin/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/admin/support" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Raise a Ticket</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
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
