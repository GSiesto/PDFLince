import "../../styles/globals.css";
import { Suspense, type ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import FotoLinceBanner from "../../components/FotoLinceBanner";
import { LocaleProvider } from "../../i18n/LocaleProvider";
import { GoogleAnalyticsScripts } from "../../components/analytics/GoogleAnalyticsScripts";
import { GaPageViewTracker } from "../../components/analytics/GaPageViewTracker";
import { WebVitalsReporter } from "../../components/analytics/WebVitalsReporter";
import CookieBanner from "../../components/CookieBanner";
import { SchemaOrg } from "../../components/SchemaOrg";

import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH } from "../../lib/metadata-shared";

const LOCALE = "de" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "PDFLince - PDFs zusammenführen, komprimieren, teilen und konvertieren",
  description: "Kostenlose Online-PDF-Tools zum Zusammenführen, Komprimieren, Teilen, Extrahieren und Konvertieren von PDFs. 100% privat, lokale Verarbeitung in Ihrem Browser.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://pdflince.com/de",
    languages: {
      'es-ES': 'https://pdflince.com',
      'es-MX': 'https://pdflince.com',
      'es-CO': 'https://pdflince.com',
      'es-AR': 'https://pdflince.com',
      'es': 'https://pdflince.com',
      'en': 'https://pdflince.com/en',
      'en-US': 'https://pdflince.com/en',
      'pt': 'https://pdflince.com/pt',
      'pt-BR': 'https://pdflince.com/pt',
      'de': 'https://pdflince.com/de',
      'de-DE': 'https://pdflince.com/de',
      'x-default': 'https://pdflince.com',
    },
  },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: "PDFLince - Kostenlose und private PDF-Tools in Ihrem Browser",
    description: "PDFs zusammenführen, komprimieren, teilen und konvertieren, ohne Dateien hochzuladen. Sichere und 100% private Verarbeitung.",
    url: "https://pdflince.com/de",
    locale: "de_DE",
    type: "website",
  },
};

export default function DeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE}>
      <head>
        <GoogleAnalyticsScripts />
        <SchemaOrg />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LocaleProvider locale={LOCALE}>
          <WebVitalsReporter />
          <Suspense fallback={null}>
            <GaPageViewTracker />
          </Suspense>
          <NavMenu />
          <main>{children}</main>
          <FotoLinceBanner />
          <Footer />
          <CookieBanner />
        </LocaleProvider>
      </body>
    </html>
  );
}
