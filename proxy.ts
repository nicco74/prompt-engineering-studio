import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "session";

/**
 * Inline token verification for the proxy layer.
 * We duplicate the verify logic here because proxy.ts cannot import
 * app-level modules (like src/lib/auth.ts which uses next/headers).
 * The DAL (src/lib/auth.ts) provides the authoritative check at the
 * data-access layer per CVE-2025-29927 guidance.
 */
function verifyToken(token: string): boolean {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return false;

  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;

  const payload = token.substring(0, lastDot);
  const signature = token.substring(lastDot + 1);

  if (!payload.startsWith("authenticated:")) return false;

  const expected = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  try {
    return timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

// Routes that do not require authentication
const PUBLIC_PATHS = ["/login", "/api/auth/login"];

// File extensions and prefixes to skip
function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  );
}

export function proxy(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // Allow static assets through
  if (isStaticAsset(pathname)) {
    return undefined;
  }

  // Allow public paths through
  if (PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"))) {
    return undefined;
  }

  // Check session cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (token && verifyToken(token)) {
    return undefined;
  }

  // API routes return 401 instead of redirecting
  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Redirect unauthenticated browser requests to login
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  return NextResponse.redirect(loginUrl);
}
