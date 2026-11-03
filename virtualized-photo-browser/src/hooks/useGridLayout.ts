import { useEffect, useState } from "react";

export interface GridLayout {
  readonly columns: number;
  readonly rowHeight: number;
}

/**
 * Calculates responsive grid columns and row height based on the viewport width.
 */
export function useGridLayout(): GridLayout {
  const [layout, setLayout] = useState<GridLayout>(() => {
    if (typeof window === "undefined") {
      return { columns: 4, rowHeight: 230 };
    }
    const width = window.innerWidth;
    if (width <= 600) return { columns: 2, rowHeight: 180 };
    if (width <= 900) return { columns: 3, rowHeight: 230 };
    return { columns: 4, rowHeight: 230 };
  });

  useEffect(() => {
    const updateLayout = (): void => {
      const width = window.innerWidth;
      if (width <= 600) {
        setLayout({ columns: 2, rowHeight: 180 });
      } else if (width <= 900) {
        setLayout({ columns: 3, rowHeight: 230 });
      } else {
        setLayout({ columns: 4, rowHeight: 230 });
      }
    };

    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  return layout;
}
