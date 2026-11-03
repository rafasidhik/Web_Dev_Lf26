import { memo, useState } from "react";
import type { Photo } from "../types/photo";
import { useObjectUrl } from "../hooks/useObjectUrl";

interface PhotoCardProps {
  photo: Photo;
  index: number;
  onSelect: (index: number) => void;
}

export const PhotoCard = memo(function PhotoCard({
  photo,
  index,
  onSelect,
}: PhotoCardProps) {
  const url = useObjectUrl(photo.file);
  const [hasError, setHasError] = useState(false);

  return (
    <button
      type="button"
      className="photo-card"
      onClick={() => onSelect(index)}
      title={photo.name}
      aria-label={`Open photo ${photo.name}`}
    >
      {hasError ? (
        <div className="photo-card-error" role="img" aria-label="Image preview unavailable">
          <span className="photo-card-error-icon" aria-hidden="true">⚠</span>
          <span className="photo-card-error-text">Preview unavailable</span>
        </div>
      ) : url ? (
        <img
          src={url}
          alt={photo.name}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="photo-card-skeleton" aria-hidden="true" />
      )}
      <span className="photo-name">{photo.name}</span>
    </button>
  );
});

export default PhotoCard;
