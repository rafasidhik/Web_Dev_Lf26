import type { FolderSelectHandler } from "../types/photo";

interface FolderPickerProps {
  readonly onFolderSelect: FolderSelectHandler;
  readonly isLoading: boolean;
}

/**
 * Accessible button and file input supporting local directory picking via webkitdirectory.
 */
export function FolderPicker({ onFolderSelect, isLoading }: FolderPickerProps) {
  const handleClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    // Reset value on click so choosing the exact same folder again still triggers onChange
    event.currentTarget.value = "";
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      // Immediately snapshot files to a plain JS array so browser DOM resets cannot clear them
      const files = Array.from(fileList);
      onFolderSelect(files);
    } else {
      onFolderSelect(null);
    }
  };

  return (
    <div className="folder-picker">
      <input
        type="file"
        // @ts-expect-error: webkitdirectory is a non-standard browser directory picker attribute
        webkitdirectory=""
        directory=""
        multiple
        onClick={handleClick}
        onChange={handleChange}
        id="folder-input"
        className="folder-input visually-hidden"
        disabled={isLoading}
        aria-label="Select photo folder from local device"
      />

      <label
        htmlFor="folder-input"
        className={`folder-button ${isLoading ? "folder-button-loading" : ""}`}
        aria-disabled={isLoading}
      >
        {isLoading ? (
          <span className="folder-button-content">
            <span className="button-spinner" aria-hidden="true" />
            Loading photos...
          </span>
        ) : (
          "Select Photo Folder"
        )}
      </label>
    </div>
  );
}

export default FolderPicker;
