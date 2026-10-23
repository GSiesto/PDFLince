import type { ReactNode } from "react";

/**
 * Operations layout — passthrough only.
 * NavMenu, Footer, FotoLinceBanner, and LocaleProvider are
 * already rendered in the parent (en)/layout.tsx.
 */
export default function OperationsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
