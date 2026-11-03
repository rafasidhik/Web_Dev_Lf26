import { useCallback, useEffect, useState } from "react";
import type { Photo } from "../types/photo";

export interface UseGalleryNavigationResult {
  readonly selectedIndex: number | null;
  readonly selectedPhoto: Photo | null;
  readonly selectIndex: (index: number | null) => void;
  readonly handlePrevious: () => void;
  readonly handleNext: () => void;
  readonly handleClose: () => void;
}

/**
 * Manages photo selection state, cyclic previous/next navigation, and global keyboard shortcuts.
 */
export function useGalleryNavigation(photos: readonly Photo[]): UseGalleryNavigationResult {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectIndex = useCallback((index: number | null): void => {
    setSelectedIndex(index);
  }, []);

  const handlePrevious = useCallback((): void => {
    setSelectedIndex((current) => {
      if (current === null || photos.length === 0) return null;
      return (current - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const handleNext = useCallback((): void => {
    setSelectedIndex((current) => {
      if (current === null || photos.length === 0) return null;
      return (current + 1) % photos.length;
    });
  }, [photos.length]);

  const handleClose = useCallback((): void => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handlePrevious, handleNext, handleClose]);

  const selectedPhoto =
    selectedIndex !== null && selectedIndex >= 0 && selectedIndex < photos.length
      ? photos[selectedIndex]
      : null;

  return {
    selectedIndex,
    selectedPhoto,
    selectIndex,
    handlePrevious,
    handleNext,
    handleClose,
  };
}
