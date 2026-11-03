import { useEffect, useSyncExternalStore } from "react";

class ObjectUrlManager {
  private cache = new Map<File | Blob, string>();
  private refCounts = new Map<File | Blob, number>();
  private listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  getUrl(file: File | Blob | null | undefined): string | null {
    if (!file) return null;
    return this.cache.get(file) ?? null;
  }

  acquire(file: File | Blob | null | undefined): void {
    if (!file) return;

    const existingUrl = this.cache.get(file);
    if (!existingUrl) {
      const url = URL.createObjectURL(file);
      this.cache.set(file, url);
      this.refCounts.set(file, 1);
      this.notify();
    } else {
      const count = this.refCounts.get(file) || 0;
      this.refCounts.set(file, count + 1);
    }
  }

  release(file: File | Blob | null | undefined): void {
    if (!file) return;

    const count = this.refCounts.get(file) || 0;
    if (count <= 1) {
      const url = this.cache.get(file);
      if (url) {
        URL.revokeObjectURL(url);
      }
      this.cache.delete(file);
      this.refCounts.delete(file);
      this.notify();
    } else {
      this.refCounts.set(file, count - 1);
    }
  }
}

const manager = new ObjectUrlManager();

/**
 * Custom hook to lazily generate and automatically revoke an object URL for a File or Blob.
 *
 * - Does not create URLs during the render phase.
 * - Safely deduplicates and ref-counts URLs across components.
 * - Automatically revokes URLs when no mounted component holds a reference.
 * - Fully compliant with React 19 and StrictMode without cascading render warnings.
 */
export function useObjectUrl(file: File | Blob | null | undefined): string | null {
  useEffect(() => {
    if (!file) return;

    manager.acquire(file);

    return () => {
      manager.release(file);
    };
  }, [file]);

  return useSyncExternalStore(
    manager.subscribe,
    () => manager.getUrl(file),
    () => null
  );
}
