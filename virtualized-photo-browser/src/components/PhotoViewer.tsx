import { useEffect, useRef, useState } from "react";
import type { Photo } from "../types/photo";
import { useObjectUrl } from "../hooks/useObjectUrl";
import { formatFileSize } from "../utils/formatSize";

interface PhotoViewerProps {
  photo: Photo;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

function PhotoViewer({
  photo,
  currentIndex,
  totalCount,
  onClose,
  onPrevious,
  onNext,
}: PhotoViewerProps) {
  const url = useObjectUrl(photo.file);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isDimensionLoading, setIsDimensionLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

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

  // Extract actual image dimensions whenever URL updates
  useEffect(() => {
    if (!url) return;

    let isCancelled = false;
    const image = new Image();

    image.onload = () => {
      if (!isCancelled) {
        setDimensions({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
        setIsDimensionLoading(false);
      }
    };

    image.onerror = () => {
      if (!isCancelled) {
        setHasError(true);
        setIsDimensionLoading(false);
      }
    };

    image.src = url;

    return () => {
      isCancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [url]);

  // Modal focus trap for keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
      <div
        className="photo-viewer"
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
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

        <div className="viewer-media-container">
          {hasError ? (
            <div className="viewer-error" role="alert">
              <span className="viewer-error-icon" aria-hidden="true">⚠</span>
              <p className="viewer-error-title">Unable to display image</p>
              <p className="viewer-error-desc">
                The image file may be corrupted or in an unsupported format.
              </p>
            </div>
          ) : url ? (
            <img
              src={url}
              alt={photo.name}
              className="viewer-image"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="viewer-loading-spinner" aria-label="Loading image..." />
          )}
        </div>

        <button
          type="button"
          className="viewer-nav next"
          onClick={onNext}
          aria-label="Next photo (Right arrow)"
          title="Next photo (→)"
        >
          ›
        </button>

        <div className="viewer-info">
          <h3>{photo.name}</h3>
          <p>
            Photo {currentIndex + 1} of {totalCount} • File size: {formatFileSize(photo.size)}
          </p>
          <p>
            Dimensions:{" "}
            {hasError
              ? "Unavailable"
              : isDimensionLoading
              ? "Calculating..."
              : dimensions
              ? `${dimensions.width} × ${dimensions.height} px`
              : "Detecting..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PhotoViewer;
