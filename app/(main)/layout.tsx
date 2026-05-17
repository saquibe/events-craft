//app/(main)/layout.tsx

import Header from "@/components/partials/header";
import Footer from "@/components/partials/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      {/* <Header /> */}

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
