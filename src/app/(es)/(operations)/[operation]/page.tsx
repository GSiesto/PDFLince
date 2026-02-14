import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DEFAULT_LOCALE, localeLabels, type Locale } from "../../../../i18n/config"
import { getDictionary } from "../../../../i18n/get-dictionary"
import { getLocalizedAlternateMap, getOperationSlug, matchOperationKeyBySlug } from "../../../../i18n/routing"
import type { OperationKey } from "../../../../types/operations"
import { OperationPageContent } from "../../../../components/OperationPageContent"

interface OperationPageParams {
  operation: string;
}

export function generateStaticParams(): OperationPageParams[] {
  const dictionary = getDictionary(DEFAULT_LOCALE);
  return (Object.keys(dictionary.operations) as OperationKey[]).map((operationKey) => ({
    operation: getOperationSlug(DEFAULT_LOCALE, operationKey),
  }));
}

export async function generateMetadata({ params }: { params: Promise<OperationPageParams> }): Promise<Metadata> {
  const resolvedParams = await params;
  const operationKey = matchOperationKeyBySlug(DEFAULT_LOCALE, resolvedParams.operation) as OperationKey | undefined;
  if (!operationKey) {
    return {};
  }

  const dictionary = getDictionary(DEFAULT_LOCALE);
  const operation = dictionary.metadata.operations[operationKey];
  const baseUrl = dictionary.metadata.site.openGraph.url;
  const canonicalPath = dictionary.routes.operations[operationKey];
  const canonicalUrl = new URL(canonicalPath, baseUrl).toString();
  const alternatesMap = getLocalizedAlternateMap({ type: "operation", key: operationKey });
  const languagesEntries = Object.entries(alternatesMap).map(([localeKey, path]) => {
    const hrefLang = localeLabels[localeKey as Locale].hrefLang;
    const absoluteUrl = new URL(path, baseUrl).toString();
    return [hrefLang, absoluteUrl];
  });
  const languages = Object.fromEntries(languagesEntries) as Record<string, string>;
  const defaultHref = localeLabels[DEFAULT_LOCALE].hrefLang;
  const xDefaultUrl = languages[defaultHref];
  const alternatesLanguages = xDefaultUrl ? { ...languages, "x-default": xDefaultUrl } : languages;

  return {
    title: operation.meta.title,
    description: operation.meta.description,
    keywords: operation.meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesLanguages,
    },
    openGraph: {
      title: operation.meta.ogTitle ?? operation.meta.title,
      description: operation.meta.ogDescription ?? operation.meta.description,
      url: canonicalUrl,
      locale: dictionary.metadata.site.openGraph.locale,
      images: [
        {
          url: dictionary.metadata.site.openGraph.imageUrl,
          width: 1200,
          height: 630,
          alt: operation.meta.ogImageAlt ?? operation.hero.imageAlt,
        },
      ],
    },
  };
}

export default async function OperationPage({ params }: { params: Promise<OperationPageParams> }) {
  const resolvedParams = await params;
  const operationKey = matchOperationKeyBySlug(DEFAULT_LOCALE, resolvedParams.operation) as OperationKey | undefined;
  if (!operationKey) {
    notFound();
  }

  const dictionary = getDictionary(DEFAULT_LOCALE);
  const operation = dictionary.operations[operationKey];
  if (!operation) {
    notFound();
  }

  return <OperationPageContent operation={operation} />;
}
