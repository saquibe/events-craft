"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/partials/header";
import Footer from "@/components/partials/footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // For login page, don't show header/footer
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For other admin pages, show header/footer
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
