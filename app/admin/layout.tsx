"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminHeader from "@/components/partials/header/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth && !pathname?.includes("/admin/login")) {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
    }
  }, [router, pathname]);

  // Don't show header on login page
  if (pathname?.includes("/admin/login")) {
    return <>{children}</>;
  }

  if (!isAuth) {
    return null;
  }

  // If we're on an event page, don't render the header here
  // The event layout will render it
  if (
    pathname?.includes("/admin/events/") &&
    !pathname?.includes("/admin/events/[id]")
  ) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
