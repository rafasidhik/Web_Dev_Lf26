import type { FolderSelectHandler } from "../types/photo";
import FolderPicker from "./FolderPicker";

interface HeaderProps {
  readonly isLoading: boolean;
  readonly onFolderSelect: FolderSelectHandler;
}

/**
 * Top application header containing the branding title and folder picker control.
 */
export function Header({ isLoading, onFolderSelect }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <h1>PixelVault</h1>
        <p>Your private photo collection</p>
      </div>

      <FolderPicker onFolderSelect={onFolderSelect} isLoading={isLoading} />
    </header>
  );
}

export default Header;
