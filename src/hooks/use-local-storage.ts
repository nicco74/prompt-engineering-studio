"use client";

import { useCallback, useSyncExternalStore } from "react";

const NAMESPACE = "pes";

/**
 * Generic hook for reading/writing namespaced values in localStorage.
 *
 * - Keys are stored as "pes:<key>" to avoid collisions.
 * - Uses `useSyncExternalStore` so the component re-renders when the
 *   stored value changes (including cross-tab updates via the `storage` event).
 * - Returns `initialValue` on the server (hydration-safe).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const namespacedKey = `${NAMESPACE}:${key}`;

  // Subscribe to cross-tab storage events.
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      function handleStorage(e: StorageEvent) {
        if (e.key === namespacedKey) {
          onStoreChange();
        }
      }
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    },
    [namespacedKey]
  );

  // Read the current snapshot from localStorage.
  const getSnapshot = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(namespacedKey);
      if (item !== null) {
        return JSON.parse(item) as T;
      }
    } catch {
      // localStorage unavailable or corrupt — return default
    }
    return initialValue;
  }, [namespacedKey, initialValue]);

  // Server snapshot always returns the initial value.
  const getServerSnapshot = useCallback((): T => initialValue, [initialValue]);

  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      const currentValue = getSnapshot();
      const nextValue =
        value instanceof Function ? value(currentValue) : value;
      try {
        window.localStorage.setItem(
          namespacedKey,
          JSON.stringify(nextValue)
        );
      } catch {
        // quota exceeded or unavailable
      }
      // Dispatch a storage event so that useSyncExternalStore re-renders
      // in the current tab (the native storage event only fires in other tabs).
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: namespacedKey,
          newValue: JSON.stringify(nextValue),
        })
      );
    },
    [namespacedKey, getSnapshot]
  );

  return [storedValue, setValue];
}
