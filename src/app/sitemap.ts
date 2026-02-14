import { MetadataRoute } from "next";

import { getRouteMap } from "../i18n/routing";

export const dynamic = "force-static";
export const revalidate = false;

const siteUrl = "https://pdflince.com";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const weekly: ChangeFrequency = "weekly";
const monthly: ChangeFrequency = "monthly";

export default function sitemap(): MetadataRoute.Sitemap {
  const { home, faq, operations } = getRouteMap();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  const addEntry = (path: string, changeFrequency: ChangeFrequency, priority: number) => {
    const url = `${siteUrl}${path}`;
    if (seen.has(url)) return;

    seen.add(url);
    entries.push({ url, lastModified, changeFrequency, priority });
  };

  Object.values(home).forEach((path) => addEntry(path, weekly, 1));
  Object.values(faq).forEach((path) => addEntry(path, monthly, 0.7));

  Object.values(operations).forEach((perLocale) => {
    Object.values(perLocale).forEach((path) => addEntry(path, weekly, 0.8));
  });

  return entries;
}
