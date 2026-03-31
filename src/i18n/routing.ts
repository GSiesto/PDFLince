import routeMapJson from "../../content/i18n-route-map.json" assert { type: "json" };
import { DEFAULT_LOCALE, Locale } from "./config";
import { OperationKey } from "../types/operations";

export type StaticRouteKey = "home" | "faq" | "support";

export type RouteIdentifier =
  | { type: "static"; key: StaticRouteKey }
  | { type: "operation"; key: OperationKey };

type RouteMap = {
  home: Record<Locale, string>;
  faq: Record<Locale, string>;
  support: Record<Locale, string>;
  operations: Record<OperationKey, Record<Locale, string>>;
};

const routeMap = routeMapJson as RouteMap;

const localeOperationSlugMap: Record<Locale, Record<OperationKey, string>> = {
  es: {
    compress: "",
    merge: "",
    split: "",
    extract: "",
    crop: "",
    rotate: "",
    reorder: "",
    pdfToImages: "",
    imagesToPdf: "",
  },
  en: {
    compress: "",
    merge: "",
    split: "",
    extract: "",
    crop: "",
    rotate: "",
    reorder: "",
    pdfToImages: "",
    imagesToPdf: "",
  },
  pt: {
    compress: "",
    merge: "",
    split: "",
    extract: "",
    crop: "",
    rotate: "",
    reorder: "",
    pdfToImages: "",
    imagesToPdf: "",
  },
  de: {
    compress: "",
    merge: "",
    split: "",
    extract: "",
    crop: "",
    rotate: "",
    reorder: "",
    pdfToImages: "",
    imagesToPdf: "",
  },
  it: {
    compress: "",
    merge: "",
    split: "",
    extract: "",
    crop: "",
    rotate: "",
    reorder: "",
    pdfToImages: "",
    imagesToPdf: "",
  },
};

const localeOperationSlugLookup: Record<Locale, Record<string, OperationKey>> = {
  es: {},
  en: {},
  pt: {},
  de: {},
  it: {},
};

const trimLeadingSlash = (path: string) => (path.startsWith("/") ? path.slice(1) : path);

const normalizePath = (path: string) => {
  if (path === "/") return "/";
  return path.replace(/\/$/, "");
};

(Object.keys(routeMap.operations) as OperationKey[]).forEach((operationKey) => {
  const perLocale = routeMap.operations[operationKey];
  (Object.keys(perLocale) as Locale[]).forEach((locale) => {
    const fullPath = perLocale[locale];
    const slug = locale === DEFAULT_LOCALE
      ? trimLeadingSlash(fullPath)
      : trimLeadingSlash(fullPath.replace(new RegExp(`^/${locale}/`), ""));

    localeOperationSlugMap[locale][operationKey] = slug;
    localeOperationSlugLookup[locale][slug] = operationKey;
  });
});

export function getRoutePath(locale: Locale, key: StaticRouteKey): string {
  return routeMap[key][locale];
}

export function getOperationPath(locale: Locale, key: OperationKey): string {
  return routeMap.operations[key][locale];
}

export function getOperationSlug(locale: Locale, key: OperationKey): string {
  return localeOperationSlugMap[locale][key];
}

export function matchOperationKeyBySlug(locale: Locale, slug: string): OperationKey | undefined {
  return localeOperationSlugLookup[locale][slug];
}

export function getRouteIdentifierForPath(locale: Locale, pathname: string): RouteIdentifier | null {
  const normalised = normalizePath(pathname);

  if (normalizePath(getRoutePath(locale, "home")) === normalised) {
    return { type: "static", key: "home" };
  }

  if (normalizePath(getRoutePath(locale, "faq")) === normalised) {
    return { type: "static", key: "faq" };
  }

  if (normalizePath(getRoutePath(locale, "support")) === normalised) {
    return { type: "static", key: "support" };
  }

  const operationEntry = Object.entries(routeMap.operations).find(([, perLocale]) => {
    return normalizePath(perLocale[locale]) === normalised;
  }) as [OperationKey, Record<Locale, string>] | undefined;

  if (operationEntry) {
    return { type: "operation", key: operationEntry[0] };
  }

  return null;
}

export function getLocalizedAlternateMap(identifier: RouteIdentifier): Record<Locale, string> {
  if (identifier.type === "static") {
    const entry = routeMap[identifier.key];
    return { ...entry };
  }

  const entry = routeMap.operations[identifier.key];
  return { ...entry };
}

export function getRouteMap() {
  return routeMap;
}
