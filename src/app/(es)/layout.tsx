import "../../styles/globals.css";
import { Suspense, type ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { localeLabels, DEFAULT_LOCALE, isLocale } from "../../i18n/config";
import { GoogleAnalyticsScripts } from "../../components/analytics/GoogleAnalyticsScripts";
import { GaPageViewTracker } from "../../components/analytics/GaPageViewTracker";
import { WebVitalsReporter } from "../../components/analytics/WebVitalsReporter";
import CookieBanner from "../../components/CookieBanner";
import NavMenu from "../../components/NavMenu";
import Footer from "../../components/Footer";
import FotoLinceBanner from "../../components/FotoLinceBanner";
import { LocaleProvider } from "../../i18n/LocaleProvider";
import { SchemaOrg } from "../../components/SchemaOrg";
import { BreadcrumbSchema } from "../../components/seo/BreadcrumbSchema";

import { METADATA_BASE, SHARED_ICONS, SHARED_OPEN_GRAPH } from "../../lib/metadata-shared";

export const metadata = {
  metadataBase: METADATA_BASE,
  title: "PDFLince | Comprimir, unir, dividir y convertir PDF online sin subir archivos",
  description:
    "Procesa tus PDFs gratis: comprimir PDF, unir PDF, dividir PDF, extraer páginas y convertir PDF a imágenes o imágenes a PDF directamente en tu navegador. Todo es local y 100% privado.",
  keywords:
    "comprimir pdf, unir pdf, dividir pdf, extraer paginas pdf, convertir pdf, pdf a imagen, imagen a pdf, reorganizar pdf, herramienta pdf gratis, pdf sin subir archivos",
  icons: SHARED_ICONS,
  alternates: {
    canonical: "https://pdflince.com",
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
    title: "PDFLince | Herramientas PDF privadas y gratuitas en tu navegador",
    description:
      "Une, comprime, divide, extrae y convierte PDFs sin subir archivos. Resultados al instante con procesamiento 100% local y privado.",
    url: "https://pdflince.com",
    locale: "es_ES",
    type: "website",
  },
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
        {/* Reserved for future head customizations */}
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
