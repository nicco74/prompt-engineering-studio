"use server";

import { cookies } from "next/headers";
import { type Locale, locales } from "./config";

export async function setLocale(locale: string) {
  if (!locales.includes(locale as Locale)) {
    return;
  }
  const store = await cookies();
  store.set("locale", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "strict",
  });
}
