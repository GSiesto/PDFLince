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
import { BreadcrumbSchema } from "../../components/seo/BreadcrumbSchema";
import { localeLabels, DEFAULT_LOCALE, isLocale } from "../../i18n/config";

import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH, SHARED_TWITTER } from "../../lib/metadata-shared";

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "PDFLince - Merge, Compress, Split, and Convert PDFs Online",
  description: "Free online PDF tools to merge, compress, split, extract, and convert PDFs. 100% private, local processing in your browser.",
  keywords: "merge pdf, compress pdf, split pdf, extract pdf pages, rotate pdf pages, reorder pdf, pdf to images, images to pdf, convert pdf, edit pdf offline",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://pdflince.com/",
    languages: {
      'es-ES': 'https://pdflince.com/es/',
      'es-MX': 'https://pdflince.com/es/',
      'es-CO': 'https://pdflince.com/es/',
      'es-AR': 'https://pdflince.com/es/',
      'es': 'https://pdflince.com/es/',
      'en': 'https://pdflince.com/',
      'en-US': 'https://pdflince.com/',
      'fr': 'https://pdflince.com/fr/',
      'fr-FR': 'https://pdflince.com/fr/',
      'pt': 'https://pdflince.com/pt/',
      'pt-BR': 'https://pdflince.com/pt/',
      'pt-PT': 'https://pdflince.com/pt/',
      'de': 'https://pdflince.com/de/',
      'de-DE': 'https://pdflince.com/de/',
      'it': 'https://pdflince.com/it/',
      'it-IT': 'https://pdflince.com/it/',
      'ro': 'https://pdflince.com/ro/',
      'ro-RO': 'https://pdflince.com/ro/',
      'ru': 'https://pdflince.com/ru/',
      'ru-RU': 'https://pdflince.com/ru/',
      'hu': 'https://pdflince.com/hu/',
      'hu-HU': 'https://pdflince.com/hu/',
      'x-default': 'https://pdflince.com/',
    },
  },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    images: [{ url: "https://pdflince.com/og-images/og-image-en.png", width: 1409, height: 736, alt: "PDFLince - Private and free PDF processing" }],
    title: "PDFLince - Free and Private PDF Tools in Your Browser",
    description: "Merge, compress, split, and convert PDFs without uploading files. Secure and 100% private processing.",
    url: "https://pdflince.com",
    locale: "en_US",
    type: "website",
  },
  twitter: SHARED_TWITTER,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const requestedLocale = resolvedParams?.locale;
  const locale = requestedLocale && isLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE;
  const htmlLang = localeLabels[locale].htmlLang;

  return (
    <html lang={htmlLang}>
      <head>
        <title>{metadata.title}</title>
        <GoogleAnalyticsScripts />
        <SchemaOrg />
        <BreadcrumbSchema />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LocaleProvider locale={locale}>
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
