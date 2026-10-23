'use client';

import { useState, useEffect } from 'react';
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || (process.env.NODE_ENV !== 'production' ? 'G-MEASUREMENT-ID' : undefined);

export function GoogleAnalyticsScripts() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      setHasConsent(localStorage.getItem('cookie_consent') === 'true');
    };

    checkConsent();

    const handleConsentChange = () => {
      checkConsent();
    };

    window.addEventListener('cookie_consent_changed', handleConsentChange);
    window.addEventListener('storage', handleConsentChange);

    return () => {
      window.removeEventListener('cookie_consent_changed', handleConsentChange);
      window.removeEventListener('storage', handleConsentChange);
    };
  }, []);

  if (!GA_MEASUREMENT_ID || !hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        id="ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          
          // Default consent is set to 'granted' here because this component is only rendered
          // after explicit user opt-in (cookie_consent === 'true'). GA scripts do not load by default.
          gtag('consent', 'default', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
          });

          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: false
          });
        `}
      </Script>
    </>
  );
}

