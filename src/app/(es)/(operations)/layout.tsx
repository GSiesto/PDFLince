import type { ReactNode } from "react";

/**
 * Operations layout — passthrough only.
 * NavMenu, Footer, FotoLinceBanner, and LocaleProvider are
 * already rendered in the parent (es)/layout.tsx.
 */
export default function OperationsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        [class*="compress-preview"],
        [class*="compression-preview"],
        [data-compress-preview] {
          min-height: 3.5rem;
          transition: opacity 120ms ease-out, transform 120ms ease-out;
          will-change: opacity, transform;
        }

        [class*="compress-preview"] *,
        [class*="compression-preview"] *,
        [data-compress-preview] * {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
      {children}
    </>
  );
}
