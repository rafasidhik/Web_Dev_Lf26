import { useCallback } from "react";
import type { FolderSelectHandler } from "./types/photo";
import Header from "./components/Header";
import EmptyState from "./components/EmptyState";
import PhotoGrid from "./features/gallery/PhotoGrid";
import PhotoViewer from "./features/viewer/PhotoViewer";
import { usePhotos } from "./hooks/usePhotos";
import { useGalleryNavigation } from "./hooks/useGalleryNavigation";
import "./App.css";

function App() {
  const { photos, isLoading, status, selectFolder } = usePhotos();
  const { selectedIndex, selectedPhoto, selectIndex, handlePrevious, handleNext, handleClose } =
    useGalleryNavigation(photos);

  const handleFolderSelect: FolderSelectHandler = useCallback(
    (files) => {
      selectIndex(null);
      selectFolder(files);
    },
    [selectIndex, selectFolder]
  );

  const gallerySubtitle =
    photos.length > 0
      ? status.skippedCount > 0
        ? `${photos.length.toLocaleString()} photos found (${status.skippedCount.toLocaleString()} non-image files skipped)`
        : `${photos.length.toLocaleString()} photos found`
      : isLoading
        ? "Reading and indexing images from folder..."
        : status.hasLoaded
          ? "No displayable photos in selected folder"
          : "Select a folder to explore your photos";

  return (
    <main className="app">
      <Header isLoading={isLoading} onFolderSelect={handleFolderSelect} />

      <section className="gallery-section" aria-label="Photo gallery">
        <div className="gallery-heading">
          <div>
            <h2>Your Photos</h2>
            <p>{gallerySubtitle}</p>
          </div>
        </div>

        {isLoading ? (
          <EmptyState
            isLoading
            title="Processing folder..."
            description="Indexing images locally without uploading to any server."
          />
        ) : photos.length > 0 ? (
          <PhotoGrid photos={photos} onSelectIndex={selectIndex} />
        ) : status.hasLoaded && status.totalFiles === 0 ? (
          <EmptyState
            icon="📂"
            title="Folder is empty"
            description="The selected folder does not contain any files. Please select a folder with images."
          />
        ) : status.hasLoaded && photos.length === 0 ? (
          <EmptyState
            icon="🖼"
            title="No supported photos found"
            description={`Found ${status.totalFiles} files, but none match supported image formats (JPG, PNG, WebP, GIF, SVG, AVIF, BMP).`}
          />
        ) : (
          <EmptyState
            icon="▧"
            title="No photos yet"
            description="Select a folder from your device to get started."
          />
        )}
      </section>

      {selectedPhoto && selectedIndex !== null && (
        <PhotoViewer
          key={selectedPhoto.id}
          photo={selectedPhoto}
          currentIndex={selectedIndex}
          totalCount={photos.length}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </main>
  );
}

export default App;
