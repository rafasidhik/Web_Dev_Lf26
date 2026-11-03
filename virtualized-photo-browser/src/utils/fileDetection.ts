export const SUPPORTED_IMAGE_EXTENSIONS: ReadonlySet<string> = new Set([
  "jpg",
  "jpeg",
  "jfif",
  "png",
  "gif",
  "webp",
  "svg",
  "avif",
  "bmp",
  "ico",
]);

const UNSUPPORTED_IMAGE_EXTENSIONS: ReadonlySet<string> = new Set([
  "tiff",
  "tif",
  "psd",
  "raw",
  "cr2",
  "cr3",
  "nef",
  "arw",
  "dng",
  "raf",
  "orf",
]);

const SUPPORTED_MIME_TYPES: ReadonlySet<string> = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  "image/bmp",
  "image/x-icon",
]);

/**
 * Extracts and normalizes the lowercase extension of a filename or path.
 */
export function getFileExtension(filename: string): string {
  const baseName = filename.split(/[/\\]/).pop() || filename;
  const lastDotIndex = baseName.lastIndexOf(".");
  if (lastDotIndex <= 0 || lastDotIndex === baseName.length - 1) return "";
  return baseName.slice(lastDotIndex + 1).toLowerCase();
}

/**
 * Determines whether a file can be natively rendered by the browser's <img> element.
 * Handles missing MIME types via extension fallback and filters out known unrenderable types (RAW, PSD, TIFF).
 */
export function isSupportedImageFile(file: File): boolean {
  const ext = getFileExtension(file.name);

  // Explicitly reject known formats that standard browsers cannot decode in <img>
  if (UNSUPPORTED_IMAGE_EXTENSIONS.has(ext)) {
    return false;
  }

  // If the browser assigned a known supported image MIME type
  if (file.type) {
    const mime = file.type.toLowerCase();
    if (SUPPORTED_MIME_TYPES.has(mime)) {
      return true;
    }

    // If MIME starts with image/ but is unlisted (e.g. image/pjpeg, image/x-png), check extension
    if (mime.startsWith("image/")) {
      return SUPPORTED_IMAGE_EXTENSIONS.has(ext);
    }
  }

  // Fallback: If MIME type is empty ("") or generic, test extension
  return SUPPORTED_IMAGE_EXTENSIONS.has(ext);
}
