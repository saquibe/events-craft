// app/admin/events/[id]/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminHeader from "@/components/partials/header/admin-header";
import { EventSidebar } from "./components/EventSidebar";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      // Close sidebar when switching to desktop
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [router]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar function
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Single header with event context */}
      <AdminHeader
        showEventContext={true}
        onMenuToggle={toggleSidebar}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
      />

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          ${isMobile ? "fixed inset-y-0 left-0 z-50 w-[280px] sm:w-72 transform transition-transform duration-300 ease-in-out" : "relative"}
          ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
          lg:translate-x-0 lg:relative lg:w-72 lg:flex-shrink-0
        `}
        >
          <EventSidebar
            eventId={(params?.id as string) || ""}
            onClose={closeSidebar}
            isMobile={isMobile}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          {children}
        </div>
      </div>
    </div>
  );
}
