//app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import MountedProvider from "@/providers/mounted.provider";
import DirectionProvider from "@/providers/direction-provider";
import AuthProvider from "@/providers/auth.provider";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: {
    default: "EventsCraft",
    template: "%s | EventsCraft",
  },
  description: "Crafting seamless event experiences",
  keywords: [
    "EventsCraft",
    "Event Management",
    "Conference Management",
    "Medical Conferences",
    "Event Registration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${nunito.variable}
          ${nunito.className}
          dashcode-app
          bg-background
          text-foreground
          antialiased
          min-h-screen
        `}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <MountedProvider>
              <DirectionProvider direction="ltr">{children}</DirectionProvider>
            </MountedProvider>

            <Toaster />
            <SonnerToaster richColors />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
