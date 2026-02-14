'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState, type ChangeEvent } from 'react';
import { useDictionary, useLocale } from '../i18n/LocaleProvider';
import { SUPPORTED_LOCALES, localeLabels, type Locale } from '../i18n/config';
import { getLocalizedAlternateMap, getRouteIdentifierForPath, getRoutePath } from '../i18n/routing';

export default function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dictionary = useDictionary();
  const locale = useLocale();
  const { nav } = dictionary.components;
  const routes = dictionary.routes;

  const isActive = (path: string) => pathname === path;

  const routeIdentifier = useMemo(() => getRouteIdentifierForPath(locale, pathname), [locale, pathname]);

  const languageOptions = useMemo(
    () => {
      const alternates = routeIdentifier ? getLocalizedAlternateMap(routeIdentifier) : null;
      return SUPPORTED_LOCALES.map(candidateLocale => ({
        locale: candidateLocale,
        href: alternates?.[candidateLocale] ?? getRoutePath(candidateLocale, 'home'),
      }));
    },
    [routeIdentifier]
  );

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    const target = languageOptions.find(option => option.locale === nextLocale)?.href;
    setIsOpen(false);
    router.push(target ?? getRoutePath(nextLocale, 'home'));
  };

  return (
    <nav className="w-full border-b border-[var(--ui)] bg-[var(--bg)]/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        <Link href={routes.home} className="flex items-center">
          <Image src="/favicon.ico?v=2" alt="PDFLince logo" width={32} height={32} className="mr-2" unoptimized />
          <span className="text-xl font-bold">PDFLince</span>
        </Link>

        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={nav.menuLabel}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
            <li>
              <Link
                href={routes.home}
                className={`${isActive(routes.home) ? 'text-[var(--accent)] font-medium' : 'text-[var(--tx-2)]'} hover:text-[var(--accent)] transition-colors`}
              >
                {nav.home}
              </Link>
            </li>
            <li>
              <Link
                href={routes.faq}
                className={`${isActive(routes.faq) ? 'text-[var(--accent)] font-medium' : 'text-[var(--tx-2)]'} hover:text-[var(--accent)] transition-colors`}
              >
                {nav.faq}
              </Link>
            </li>

            <li className="md:ml-4">
              <label className="sr-only" htmlFor="nav-language-select">
                {nav.languageLabel}
              </label>
              <select
                id="nav-language-select"
                className="w-full rounded-md border border-[var(--ui)] bg-white px-3 py-2 text-sm text-[var(--tx)] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:w-auto"
                value={locale}
                onChange={handleLocaleChange}
              >
                {languageOptions.map(option => (
                  <option key={option.locale} value={option.locale}>
                    {localeLabels[option.locale].nativeName}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
