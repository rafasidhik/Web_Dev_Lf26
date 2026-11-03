import { useEffect, useState } from "react";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import type { Photo } from "../../types/photo";
import { useGridLayout } from "../../hooks/useGridLayout";
import PhotoCard from "./PhotoCard";
import RenderCounter from "./RenderCounter";

interface PhotoGridProps {
  readonly photos: readonly Photo[];
  readonly onSelectIndex: (index: number) => void;
}

/**
 * Virtualized grid component managing row layout and smooth scrolling across thousands of photos.
 */
export function PhotoGrid({ photos, onSelectIndex }: PhotoGridProps) {
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null);
  const { columns, rowHeight } = useGridLayout();

  // Reset scroll container position when the dataset changes
  useEffect(() => {
    if (scrollElement) {
      scrollElement.scrollTop = 0;
    }
  }, [photos, scrollElement]);

  const rowCount = Math.ceil(photos.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollElement,
    estimateSize: () => rowHeight,
    overscan: 2,
    initialRect: { width: 1200, height: 800 },
  });

  let virtualRows: readonly VirtualItem[] = rowVirtualizer.getVirtualItems();

  // Fallback for initial render and test environments before container measurement
  if (virtualRows.length === 0 && rowCount > 0) {
    const fallbackCount = Math.min(rowCount, 4);
    virtualRows = Array.from({ length: fallbackCount }, (_, index): VirtualItem => ({
      key: index,
      index,
      start: index * rowHeight,
      size: rowHeight,
      end: (index + 1) * rowHeight,
      lane: 0,
    }));
  }

  const mountedPhotoCount = virtualRows.reduce((total, row) => {
    const startIndex = row.index * columns;
    return total + Math.min(columns, photos.length - startIndex);
  }, 0);

  return (
    <>
      <RenderCounter totalPhotos={photos.length} mountedCount={mountedPhotoCount} />

      <div
        className="photo-grid-container"
        ref={setScrollElement}
        tabIndex={0}
        aria-label="Photo gallery grid"
      >
        <div
          className="photo-grid"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualRows.map((virtualRow) => {
            const startIndex = virtualRow.index * columns;
            const rowPhotos = photos.slice(startIndex, startIndex + columns);

            return (
              <div
                key={virtualRow.key}
                className="photo-row"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
              >
                {rowPhotos.map((photo, colIndex) => {
                  const photoIndex = startIndex + colIndex;
                  return (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      index={photoIndex}
                      onSelect={onSelectIndex}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PhotoGrid;
