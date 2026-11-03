import { useEffect, useState } from "react";
import type { ImageDimensions } from "../types/photo";

export type { ImageDimensions };

export interface UseImageDimensionsResult {
  readonly dimensions: ImageDimensions | null;
  readonly isLoading: boolean;
  readonly hasError: boolean;
}

interface ImageDimensionState {
  readonly url: string | null;
  readonly dimensions: ImageDimensions | null;
  readonly isLoading: boolean;
  readonly hasError: boolean;
}

const INITIAL_STATE: ImageDimensionState = {
  url: null,
  dimensions: null,
  isLoading: false,
  hasError: false,
};

/**
 * Loads and extracts the natural pixel dimensions of an image URL asynchronously.
 * Uses derived state during URL transitions to avoid synchronous setState inside effects.
 */
export function useImageDimensions(url: string | null): UseImageDimensionsResult {
  const [state, setState] = useState<ImageDimensionState>(INITIAL_STATE);

  useEffect(() => {
    if (!url) return;

    let isCancelled = false;
    const image = new Image();

    image.onload = () => {
      if (!isCancelled) {
        setState({
          url,
          dimensions: {
            width: image.naturalWidth,
            height: image.naturalHeight,
          },
          isLoading: false,
          hasError: false,
        });
      }
    };

    image.onerror = () => {
      if (!isCancelled) {
        setState({
          url,
          dimensions: null,
          isLoading: false,
          hasError: true,
        });
      }
    };

    image.src = url;

    return () => {
      isCancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [url]);

  if (!url) {
    return { dimensions: null, isLoading: false, hasError: false };
  }

  if (state.url !== url) {
    return { dimensions: null, isLoading: true, hasError: false };
  }

  return {
    dimensions: state.dimensions,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
}
