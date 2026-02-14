import "server-only";

import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function createToken(): string {
  const payload = `authenticated:${Date.now()}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;

  const payload = token.substring(0, lastDot);
  const signature = token.substring(lastDot + 1);

  if (!payload.startsWith("authenticated:")) return false;

  const expected = sign(payload);

  try {
    return timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Verify the session cookie. Call this in any server component,
 * API route, or data-access function to ensure the user is authenticated.
 * Returns true if authenticated, false otherwise.
 */
export async function verifyAuth(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

/**
 * Create a session by setting an HTTP-only signed cookie.
 */
export async function createSession(): Promise<void> {
  const store = await cookies();
  const token = createToken();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
}

/**
 * Destroy the session by clearing the cookie.
 */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
}
