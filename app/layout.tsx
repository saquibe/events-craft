//app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import MountedProvider from "@/providers/mounted.provider";
import DirectionProvider from "@/providers/direction-provider";
import AuthProvider from "@/providers/auth.provider";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
          ${inter.variable}
          ${inter.className}
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
