interface RenderCounterProps {
  readonly totalPhotos: number;
  readonly mountedCount: number;
}

/**
 * Displays the total number of indexed photos and real-time count of photo cards mounted in the DOM.
 */
export function RenderCounter({ totalPhotos, mountedCount }: RenderCounterProps) {
  return (
    <div className="render-counter" aria-live="polite">
      Showing <strong>{totalPhotos.toLocaleString()}</strong>{" "}
      {totalPhotos === 1 ? "photo" : "photos"}
      <span className="dom-counter"> • {mountedCount} mounted in DOM</span>
    </div>
  );
}

export default RenderCounter;
