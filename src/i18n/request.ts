import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { type Locale, defaultLocale } from "./config";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = (store.get("locale")?.value as Locale) || defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
