"use client";

import Image from "next/image";
import Link from "next/link";
import { useDictionary } from "../i18n/LocaleProvider";

export default function FotoLinceBanner() {
  const dictionary = useDictionary();
  const fotolinceBanner = dictionary.components?.fotolinceBanner;

  if (!fotolinceBanner) {
    return null;
  }

  return (
    <section className="border-b border-[var(--ui)]/60 bg-[var(--bg-2)]/50">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--ui-2)] bg-white">
            <Image
              src="/fotolince_logo_processed.webp"
              alt={fotolinceBanner.imageAlt}
              fill
              sizes="64px"
              className="object-contain"
              unoptimized
              priority={false}
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tx-3)]">
              {fotolinceBanner.eyebrow}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-[var(--tx)] md:text-xl">
              {fotolinceBanner.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--tx-2)] md:text-base">
              {fotolinceBanner.description}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center md:w-auto">
          <Link
            href={fotolinceBanner.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
          >
            {fotolinceBanner.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
