import { DEFAULT_LOCALE, Locale } from "./config";
import { esDictionary } from "./dictionaries/es";
import { enDictionary } from "./dictionaries/en";
import { ptDictionary } from "./dictionaries/pt";
import { deDictionary } from "./dictionaries/de";
import type { Dictionary } from "./dictionaries/dictionary-types";

const dictionaries: Record<Locale, Dictionary> = {
  es: esDictionary,
  en: enDictionary,
  pt: ptDictionary,
  de: deDictionary,
};

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[locale];
}

export function getDefaultDictionary(): Dictionary {
  return dictionaries[DEFAULT_LOCALE];
}
