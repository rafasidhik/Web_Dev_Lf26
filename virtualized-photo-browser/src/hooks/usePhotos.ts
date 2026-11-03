import { useCallback, useRef, useState } from "react";
import type { FolderSelectHandler, FolderStatus, Photo } from "../types/photo";
import { isSupportedImageFile } from "../utils/fileDetection";

export interface UsePhotosResult {
  readonly photos: readonly Photo[];
  readonly isLoading: boolean;
  readonly status: FolderStatus;
  readonly selectFolder: FolderSelectHandler;
}

const INITIAL_STATUS: FolderStatus = {
  totalFiles: 0,
  imageCount: 0,
  skippedCount: 0,
  hasLoaded: false,
};

const EMPTY_FOLDER_STATUS: FolderStatus = {
  totalFiles: 0,
  imageCount: 0,
  skippedCount: 0,
  hasLoaded: true,
};

/**
 * Hook to asynchronously read, filter, and index local image files from a selected directory.
 */
export function usePhotos(): UsePhotosResult {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<FolderStatus>(INITIAL_STATUS);

  const activeProcessIdRef = useRef<number>(0);

  const selectFolder: FolderSelectHandler = useCallback((inputFiles) => {
    const processId = ++activeProcessIdRef.current;

    if (!inputFiles || inputFiles.length === 0) {
      setPhotos([]);
      setIsLoading(false);
      setStatus(EMPTY_FOLDER_STATUS);
      return;
    }

    // Immediately copy files synchronously to a static array before any asynchronous delay
    const fileArray = Array.from(inputFiles);
    const totalFiles = fileArray.length;

    setIsLoading(true);

    // Yield to the browser event loop so React can render the loading state
    setTimeout(() => {
      // Abort if another folder selection has superseded this one
      if (processId !== activeProcessIdRef.current) return;

      const loadedPhotos: Photo[] = [];
      let skippedCount = 0;

      for (let i = 0; i < totalFiles; i++) {
        const file = fileArray[i];
        if (isSupportedImageFile(file)) {
          loadedPhotos.push({
            id: `${file.webkitRelativePath || file.name}-${file.lastModified}-${i}`,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
          });
        } else {
          skippedCount++;
        }
      }

      if (processId !== activeProcessIdRef.current) return;

      setPhotos(loadedPhotos);
      setStatus({
        totalFiles,
        imageCount: loadedPhotos.length,
        skippedCount,
        hasLoaded: true,
      });
      setIsLoading(false);
    }, 40);
  }, []);

  return {
    photos,
    isLoading,
    status,
    selectFolder,
  };
}
