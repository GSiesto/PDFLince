'use client';

import { useReportWebVitals } from 'next/web-vitals';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true';

export function WebVitalsReporter() {
  useReportWebVitals(metric => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });

      if (DEBUG) {
        console.debug('[analytics] web-vital', metric.name, metric.value);
      }
    } else if (DEBUG) {
      console.debug('[analytics] skipped web-vital (gtag unavailable)', metric.name, metric.value);
    }
  });

  return null;
}
