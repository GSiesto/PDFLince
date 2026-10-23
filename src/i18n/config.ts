export const SUPPORTED_LOCALES = ["es", "pt", "de", "en", "fr", "hu", "it", "ro", "ru"] as const;

export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = "en";

export const localeLabels: Record<Locale, { label: string; nativeName: string; htmlLang: string; hrefLang: string }>
  = {
  es: { label: "Español", nativeName: "Español", htmlLang: "es", hrefLang: "es" },
  en: { label: "English", nativeName: "English", htmlLang: "en", hrefLang: "en" },
  pt: { label: "Português", nativeName: "Português", htmlLang: "pt", hrefLang: "pt" },
  de: { label: "Deutsch", nativeName: "Deutsch", htmlLang: "de", hrefLang: "de" },
  it: { label: "Italiano", nativeName: "Italiano", htmlLang: "it", hrefLang: "it" },
  fr: { label: "Français", nativeName: "Français", htmlLang: "fr", hrefLang: "fr" },
  hu: { label: "Magyar", nativeName: "Magyar", htmlLang: "hu", hrefLang: "hu" },
  ro: { label: "Română", nativeName: "Română", htmlLang: "ro", hrefLang: "ro" },
  ru: { label: "Русский", nativeName: "Русский", htmlLang: "ru", hrefLang: "ru" },
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
