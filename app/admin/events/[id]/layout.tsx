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

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Single header with event context */}
      <AdminHeader showEventContext={true} />

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <EventSidebar eventId={(params?.id as string) || ""} />
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
