import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  // Get locale from cookie or accept-language header
  const cookieStore = await cookies();
  let locale = cookieStore.get("locale")?.value;

  if (!locale) {
    const acceptLanguage = (await headers()).get("accept-language");
    locale = acceptLanguage?.split(",")[0].split("-")[0] || "en";
  }

  // Validate locale
  const validLocales = ["en", "ar"];
  if (!validLocales.includes(locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
