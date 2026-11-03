import { useCallback, useEffect, useState } from "react";
import FolderPicker from "./components/FolderPicker";
import PhotoGrid from "./components/PhotoGrid";
import PhotoViewer from "./components/PhotoViewer";
import { usePhotos } from "./hooks/usePhotos";
import "./App.css";

function App() {
  const { photos, isLoading, status, selectFolder } = usePhotos();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleFolderSelect = useCallback((files: File[] | FileList | null) => {
    setSelectedIndex(null);
    selectFolder(files);
  }, [selectFolder]);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null || photos.length === 0) return null;
      return (current - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null || photos.length === 0) return null;
      return (current + 1) % photos.length;
    });
  }, [photos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "Escape") {
        event.preventDefault();
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handlePrevious, handleNext]);

  const selectedPhoto =
    selectedIndex !== null && selectedIndex >= 0 && selectedIndex < photos.length
      ? photos[selectedIndex]
      : null;

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <h1>PixelVault</h1>
          <p>Your private photo collection</p>
        </div>

        <FolderPicker
          onFolderSelect={handleFolderSelect}
          isLoading={isLoading}
        />
      </header>

      <section className="gallery-section" aria-label="Photo gallery">
        <div className="gallery-heading">
          <div>
            <h2>Your Photos</h2>
            <p>
              {photos.length > 0
                ? status.skippedCount > 0
                  ? `${photos.length.toLocaleString()} photos found (${status.skippedCount.toLocaleString()} non-image files skipped)`
                  : `${photos.length.toLocaleString()} photos found`
                : isLoading
                ? "Reading and indexing images from folder..."
                : status.hasLoaded
                ? "No displayable photos in selected folder"
                : "Select a folder to explore your photos"}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="empty-state loading-state" role="status" aria-live="polite">
            <div className="spinner-large" aria-hidden="true" />
            <h3>Processing folder...</h3>
            <p>Indexing images locally without uploading to any server.</p>
          </div>
        ) : photos.length > 0 ? (
          <PhotoGrid
            photos={photos}
            onSelectIndex={(index: number) => setSelectedIndex(index)}
          />
        ) : status.hasLoaded && status.totalFiles === 0 ? (
          <div className="empty-state" role="status">
            <div className="empty-icon" aria-hidden="true">📂</div>
            <h3>Folder is empty</h3>
            <p>The selected folder does not contain any files. Please select a folder with images.</p>
          </div>
        ) : status.hasLoaded && photos.length === 0 ? (
          <div className="empty-state" role="status">
            <div className="empty-icon" aria-hidden="true">🖼</div>
            <h3>No supported photos found</h3>
            <p>
              Found {status.totalFiles} files, but none match supported image formats (JPG, PNG, WebP, GIF, SVG, AVIF, BMP).
            </p>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">▧</div>
            <h3>No photos yet</h3>
            <p>Select a folder from your device to get started.</p>
          </div>
        )}
      </section>

      {selectedPhoto && selectedIndex !== null && (
        <PhotoViewer
          key={selectedPhoto.id}
          photo={selectedPhoto}
          currentIndex={selectedIndex}
          totalCount={photos.length}
          onClose={() => setSelectedIndex(null)}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </main>
  );
}

export default App;
