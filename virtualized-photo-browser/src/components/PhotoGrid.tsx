import { useEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Photo } from "../types/photo";
import PhotoCard from "./PhotoCard";

interface PhotoGridProps {
  photos: Photo[];
  onSelectIndex: (index: number) => void;
}

function PhotoGrid({ photos, onSelectIndex }: PhotoGridProps) {
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null);

  const [columns, setColumns] = useState(() => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 600) return 2;
    if (window.innerWidth <= 900) return 3;
    return 4;
  });

  const [rowHeight, setRowHeight] = useState(() => {
    if (typeof window === "undefined") return 230;
    if (window.innerWidth <= 600) return 180;
    return 230;
  });

  // Reset scroll container position when the dataset changes
  useEffect(() => {
    if (scrollElement) {
      scrollElement.scrollTop = 0;
    }
  }, [photos, scrollElement]);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setColumns(2);
        setRowHeight(180);
      } else if (width <= 900) {
        setColumns(3);
        setRowHeight(230);
      } else {
        setColumns(4);
        setRowHeight(230);
      }
    };

    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const rowCount = Math.ceil(photos.length / columns);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollElement,
    estimateSize: () => rowHeight,
    overscan: 2,
    initialRect: { width: 1200, height: 800 },
  });

  let virtualRows = rowVirtualizer.getVirtualItems();

  // If the virtualizer has not yet measured container dimensions (e.g. before initial layout or test environment),
  // fallback to initial rows so images render immediately without a blank flash
  if (virtualRows.length === 0 && rowCount > 0) {
    const fallbackCount = Math.min(rowCount, 4);
    virtualRows = Array.from({ length: fallbackCount }, (_, index) => ({
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
      <div className="render-counter" aria-live="polite">
        Showing <strong>{photos.length.toLocaleString()}</strong>{" "}
        {photos.length === 1 ? "photo" : "photos"}
        <span className="dom-counter">
          {" "}• {mountedPhotoCount} mounted in DOM
        </span>
      </div>

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
