/**
 * Represents an indexed image file with metadata for gallery display and virtualization.
 */
export interface Photo {
  readonly id: string;
  readonly file: File;
  readonly name: string;
  readonly size: number;
  readonly type: string;
  readonly lastModified: number;
}

/**
 * Summary status of the currently selected folder.
 */
export interface FolderStatus {
  readonly totalFiles: number;
  readonly imageCount: number;
  readonly skippedCount: number;
  readonly hasLoaded: boolean;
}

/**
 * Image pixel dimensions.
 */
export interface ImageDimensions {
  readonly width: number;
  readonly height: number;
}

/**
 * Callback signature for folder selection events.
 */
export type FolderSelectHandler = (files: File[] | FileList | null) => void;
