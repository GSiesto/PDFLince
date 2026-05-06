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
import ThemeScript from "../../components/ThemeScript";
import {
  METADATA_BASE,
  SHARED_ICONS,
  SHARED_OPEN_GRAPH,
} from "../../lib/metadata-shared";

const LOCALE = "pt" as const;

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "PDFLince - Juntar, Comprimir, Dividir e Converter PDFs Online",
  description:
    "Ferramentas de PDF online gratuitas para juntar, comprimir, dividir, extrair e converter PDFs. 100% privado, processamento local no seu navegador.",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://pdflince.com/pt",
    languages: {
      "es-ES": "https://pdflince.com",
      "es-MX": "https://pdflince.com",
      "es-CO": "https://pdflince.com",
      "es-AR": "https://pdflince.com",
      es: "https://pdflince.com",
      en: "https://pdflince.com/en",
      "en-US": "https://pdflince.com/en",
      pt: "https://pdflince.com/pt",
      "pt-BR": "https://pdflince.com/pt",
      de: "https://pdflince.com/de",
      "de-DE": "https://pdflince.com/de",
      it: "https://pdflince.com/it",
      "it-IT": "https://pdflince.com/it",
      "x-default": "https://pdflince.com",
    },
  },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: "PDFLince - Ferramentas de PDF gratuitas e privadas no seu navegador",
    description:
      "Combine, comprima, divida e converta PDFs sem carregar arquivos. Processamento seguro e 100% privado.",
    url: "https://pdflince.com/pt",
    locale: "pt_BR",
    type: "website",
  },
};

export default function PtLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={LOCALE} suppressHydrationWarning>
      <head>
        <GoogleAnalyticsScripts />
        <SchemaOrg />
        <ThemeScript />
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