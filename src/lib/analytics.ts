const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true';

type TrackEventOptions = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, unknown>;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const isAnalyticsEnabled = () => Boolean(GA_MEASUREMENT_ID);

export function trackEvent({ action, category, label, value, params }: TrackEventOptions) {
  if (!GA_MEASUREMENT_ID) {
    if (DEBUG) {
      console.debug('[analytics] trackEvent skipped (GA id missing)', { action, category, label, value, params });
    }
    return;
  }

  if (typeof window === 'undefined') {
    if (DEBUG) {
      console.debug('[analytics] trackEvent skipped on server', { action, category, label, value, params });
    }
    return;
  }

  const payload = {
    event_category: category,
    event_label: label,
    value,
    ...params,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', action, payload);

    if (DEBUG) {
      console.debug('[analytics] event', action, payload);
    }
  } else if (DEBUG) {
    console.debug('[analytics] gtag unavailable, buffered event', action, payload);
  }
}
