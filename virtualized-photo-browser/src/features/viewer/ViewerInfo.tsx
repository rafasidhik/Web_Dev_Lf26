import type { ImageDimensions } from "../../types/photo";
import { formatFileSize } from "../../utils/formatSize";

interface ViewerInfoProps {
  readonly photoName: string;
  readonly fileSize: number;
  readonly currentIndex: number;
  readonly totalCount: number;
  readonly dimensions: ImageDimensions | null;
  readonly isDimensionLoading: boolean;
  readonly hasError: boolean;
}

/**
 * Information footer displaying photo filename, counter, formatted file size, and pixel dimensions.
 */
export function ViewerInfo({
  photoName,
  fileSize,
  currentIndex,
  totalCount,
  dimensions,
  isDimensionLoading,
  hasError,
}: ViewerInfoProps) {
  const dimensionText = hasError
    ? "Unavailable"
    : isDimensionLoading
      ? "Calculating..."
      : dimensions
        ? `${dimensions.width} × ${dimensions.height} px`
        : "Detecting...";

  return (
    <div className="viewer-info">
      <h3>{photoName}</h3>
      <p>
        Photo {currentIndex + 1} of {totalCount} • File size: {formatFileSize(fileSize)}
      </p>
      <p>Dimensions: {dimensionText}</p>
    </div>
  );
}

export default ViewerInfo;
