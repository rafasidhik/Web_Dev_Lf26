/**
 * Format bytes into human-readable units (B, KB, MB, GB, TB).
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 0 || !Number.isFinite(bytes)) return "0 B";
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB", "TB"];
  let unitIndex = -1;
  let size = bytes;

  do {
    size /= 1024;
    unitIndex++;
  } while (size >= 1024 && unitIndex < units.length - 1);

  return `${size.toFixed(unitIndex === 0 ? 1 : 2)} ${units[unitIndex]}`;
}
