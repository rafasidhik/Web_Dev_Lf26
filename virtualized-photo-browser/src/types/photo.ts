export interface Photo {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface FolderStatus {
  totalFiles: number;
  imageCount: number;
  skippedCount: number;
  hasLoaded: boolean;
}
