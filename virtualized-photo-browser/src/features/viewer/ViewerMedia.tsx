interface ViewerMediaProps {
  readonly url: string | null;
  readonly photoName: string;
  readonly hasError: boolean;
  readonly onImageError: () => void;
}

/**
 * Handles main preview image presentation, asynchronous loading spinner, and error state.
 */
export function ViewerMedia({ url, photoName, hasError, onImageError }: ViewerMediaProps) {
  return (
    <div className="viewer-media-container">
      {hasError ? (
        <div className="viewer-error" role="alert">
          <span className="viewer-error-icon" aria-hidden="true">
            ⚠
          </span>
          <p className="viewer-error-title">Unable to display image</p>
          <p className="viewer-error-desc">
            The image file may be corrupted or in an unsupported format.
          </p>
        </div>
      ) : url ? (
        <img src={url} alt={photoName} className="viewer-image" onError={onImageError} />
      ) : (
        <div className="viewer-loading-spinner" aria-label="Loading image..." />
      )}
    </div>
  );
}

export default ViewerMedia;
