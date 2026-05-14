import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "never", // This removes /en from URLs
  localeDetection: true, // Auto-detect from browser
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
