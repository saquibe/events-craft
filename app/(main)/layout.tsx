//app/(main)/layout.tsx
import Header from "@/components/partials/header";
import Footer from "@/components/partials/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
