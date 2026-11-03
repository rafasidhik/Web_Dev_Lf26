import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "../../types/photo";
import { useObjectUrl } from "../../hooks/useObjectUrl";
import { useImageDimensions } from "../../hooks/useImageDimensions";
import ViewerMedia from "./ViewerMedia";
import ViewerInfo from "./ViewerInfo";

interface PhotoViewerProps {
  readonly photo: Photo;
  readonly currentIndex: number;
  readonly totalCount: number;
  readonly onClose: () => void;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
}

/**
 * Modal dialog for inspecting photos at high resolution with keyboard focus trapping.
 */
export function PhotoViewer({
  photo,
  currentIndex,
  totalCount,
  onClose,
  onPrevious,
  onNext,
}: PhotoViewerProps) {
  const url = useObjectUrl(photo.file);
  const {
    dimensions,
    isLoading: isDimensionLoading,
    hasError: dimensionError,
  } = useImageDimensions(url);
  const [imageLoadError, setImageLoadError] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const hasError = dimensionError || imageLoadError;

  const handleImageError = useCallback(() => {
    setImageLoadError(true);
  }, []);

  // Prevent background scrolling while modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Focus the close button upon opening
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Modal focus trap for keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Tab" && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  };

  return (
    <div
      className="viewer-backdrop"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${photo.name}`}
    >
      <div className="photo-viewer" ref={dialogRef} onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeButtonRef}
          type="button"
          className="viewer-close"
          onClick={onClose}
          aria-label="Close photo viewer"
          title="Close (Escape)"
        >
          ×
        </button>

        <button
          type="button"
          className="viewer-nav previous"
          onClick={onPrevious}
          aria-label="Previous photo (Left arrow)"
          title="Previous photo (←)"
        >
          ‹
        </button>

        <ViewerMedia
          url={url}
          photoName={photo.name}
          hasError={hasError}
          onImageError={handleImageError}
        />

        <button
          type="button"
          className="viewer-nav next"
          onClick={onNext}
          aria-label="Next photo (Right arrow)"
          title="Next photo (→)"
        >
          ›
        </button>

        <ViewerInfo
          photoName={photo.name}
          fileSize={photo.size}
          currentIndex={currentIndex}
          totalCount={totalCount}
          dimensions={dimensions}
          isDimensionLoading={isDimensionLoading}
          hasError={hasError}
        />
      </div>
    </div>
  );
}

export default PhotoViewer;
