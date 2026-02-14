'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true';

const trackPageview = (url: string) => {
  if (!GA_MEASUREMENT_ID) {
    return;
  }

  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    if (DEBUG && typeof window !== 'undefined') {
      console.debug('[analytics] window.gtag unavailable for pageview', url);
    }
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });

  if (DEBUG) {
    console.debug('[analytics] pageview', url);
  }
};

export function GaPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString();

  useEffect(() => {
    if (!pathname) {
      return;
    }
    const url = search ? `${pathname}?${search}` : pathname;
    trackPageview(url);
  }, [pathname, search]);

  return null;
}
