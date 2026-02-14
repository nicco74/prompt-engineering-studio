import "server-only";

/**
 * In-memory rate limiter keyed by IP address.
 *
 * Limits each IP to MAX_REQUESTS requests per WINDOW_MS milliseconds.
 * Sufficient for a small user base (2-5 concurrent users).
 *
 * Note: This state is per-process — it resets on server restart and does not
 * share across multiple instances. For production scale, replace with Redis.
 */

const MAX_REQUESTS = 30;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // clean up every 10 minutes

interface RateLimitEntry {
  count: number;
  resetAt: number; // Unix timestamp in milliseconds
}

const store = new Map<string, RateLimitEntry>();

// Periodic cleanup of expired entries to prevent memory leaks
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanupScheduled() {
  if (cleanupTimer !== null) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now >= entry.resetAt) {
        store.delete(key);
      }
    }
    // If the store is empty, stop the timer
    if (store.size === 0 && cleanupTimer !== null) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
  }, CLEANUP_INTERVAL_MS);
  // Allow the Node process to exit even if the timer is still running
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Number of requests remaining in the current window */
  remaining: number;
  /** Unix timestamp (seconds) when the rate limit window resets */
  resetAt: number;
}

/**
 * Check and consume one request from the rate limit budget for the given IP.
 *
 * Returns whether the request is allowed, how many requests remain, and
 * when the window resets (as a Unix timestamp in seconds for HTTP headers).
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  let entry = store.get(ip);

  // If there is no entry or the window has expired, start a fresh window
  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    store.set(ip, entry);
    ensureCleanupScheduled();
  }

  const resetAtSeconds = Math.ceil(entry.resetAt / 1000);

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: resetAtSeconds,
    };
  }

  entry.count += 1;

  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetAt: resetAtSeconds,
  };
}
