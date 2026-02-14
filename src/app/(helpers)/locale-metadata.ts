import type { Metadata } from "next";
import { Locale, DEFAULT_LOCALE, localeLabels } from "../../i18n/config";
import { getDictionary } from "../../i18n/get-dictionary";
import { getLocalizedAlternateMap } from "../../i18n/routing";

type StaticRouteKey = "home" | "faq" | "support";

function buildLanguagesMap(identifier: { type: "static"; key: StaticRouteKey }, baseUrl: string) {
  const alternatesMap = getLocalizedAlternateMap(identifier);
  const entries = (Object.entries(alternatesMap) as [Locale, string][]).map(([localeKey, path]) => {
    const hrefLang = localeLabels[localeKey].hrefLang;
    const absoluteUrl = new URL(path, baseUrl).toString();
    return [hrefLang, absoluteUrl] as const;
  });

  const languages = Object.fromEntries(entries) as Record<string, string>;
  const defaultHref = localeLabels[DEFAULT_LOCALE].hrefLang;
  const xDefaultUrl = languages[defaultHref];
  return xDefaultUrl ? { ...languages, "x-default": xDefaultUrl } : languages;
}

export function createHomeMetadata(locale: Locale) {
  return (): Metadata => {
    const dictionary = getDictionary(locale);
    const siteMeta = dictionary.metadata.site;
    const baseUrl = siteMeta.openGraph.url;
    const languages = buildLanguagesMap({ type: "static", key: "home" }, baseUrl);

    return {
      title: siteMeta.title,
      description: siteMeta.description,
      keywords: siteMeta.keywords,
      alternates: {
        canonical: siteMeta.canonical,
        languages,
      },
      openGraph: {
        title: siteMeta.openGraph.title,
        description: siteMeta.openGraph.description,
        url: siteMeta.openGraph.url,
        locale: siteMeta.openGraph.locale,
        images: [
          {
            url: siteMeta.openGraph.imageUrl,
            width: 1200,
            height: 630,
            alt: siteMeta.openGraph.imageAlt,
          },
        ],
      },
    };
  };
}

export function createFaqMetadata(locale: Locale) {
  return (): Metadata => {
    const dictionary = getDictionary(locale);
    const faqMeta = dictionary.metadata.faq;
    const baseUrl = dictionary.metadata.site.openGraph.url;
    const languages = buildLanguagesMap({ type: "static", key: "faq" }, baseUrl);

    return {
      title: faqMeta.title,
      description: faqMeta.description,
      keywords: faqMeta.keywords,
      alternates: {
        canonical: faqMeta.canonical,
        languages,
      },
    };
  };
}

export function createSupportMetadata(locale: Locale) {
  return (): Metadata => {
    const dictionary = getDictionary(locale);
    const supportMeta = dictionary.metadata.support;
    const baseUrl = dictionary.metadata.site.openGraph.url;
    const languages = buildLanguagesMap({ type: "static", key: "support" }, baseUrl);

    return {
      title: supportMeta.title,
      description: supportMeta.description,
      keywords: supportMeta.keywords,
      alternates: {
        canonical: supportMeta.canonical,
        languages,
      },
    };
  };
}
