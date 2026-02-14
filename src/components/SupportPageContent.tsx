"use client";

import Link from "next/link";
import { useDictionary } from "../i18n/LocaleProvider";

export function SupportPageContent() {
  const dictionary = useDictionary();
  const {
    pages: { support },
  } = dictionary;
  const { hero, reasons, tiers, transparency, faq, closing, legalNotice } = support;

  return (
    <div className="min-h-screen bg-gradient-soft relative">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero section - more personal and minimal */}
        <section className="text-center mb-16">
          <div className="mb-6 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--ui)]/70 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tx-3)]">
              {hero.eyebrow}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">{hero.title}</h1>
          <p className="text-lg text-[var(--tx-2)] max-w-2xl mx-auto text-balance leading-relaxed">
            {hero.subtitle}
          </p>
          <p className="mt-8 text-sm text-[var(--tx-3)] italic max-w-xl mx-auto">
            {hero.highlight}
          </p>
        </section>

        {/* Simple 3-column reasons */}
        <section className="my-20">
          <h2 className="text-2xl font-semibold text-center mb-10">{reasons.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.cards.map((card) => (
              <div key={card.title} className="text-center">
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                <p className="text-[var(--tx-2)] text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Donation tiers - simpler cards */}
        <section className="my-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-3">{tiers.title}</h2>
            <p className="text-[var(--tx-2)] text-sm max-w-xl mx-auto">{tiers.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {tiers.cards.map((card) => (
              <div key={card.id} className="surface-card p-6 flex flex-col text-center relative">
                {card.badge ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm">
                    {card.badge}
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-2xl font-bold text-[var(--accent)] mb-3">{card.amount}</p>
                <p className="text-sm text-[var(--tx-2)] flex-1 mb-6 leading-relaxed">{card.description}</p>
                <button
                  onClick={() => {
                    // Stripe checkout will be wired here
                    console.log('Stripe checkout:', card.id);
                  }}
                  className="inline-flex justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {card.ctaLabel}
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-[var(--tx-3)]">{tiers.note}</p>
        </section>

        {/* Transparency - simple list */}
  <section id="support-transparency" className="my-20 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-center">{transparency.title}</h2>
          <ul className="space-y-3">
            {transparency.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[var(--accent)] mt-1">•</span>
                <p className="text-sm text-[var(--tx-2)] leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ - minimal */}
        <section className="my-20 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-center">{faq.title}</h2>
          <div className="space-y-4">
            {faq.entries.map(({ question, answer }) => (
              <details key={question} className="surface-card p-5 rounded-lg">
                <summary className="cursor-pointer text-sm font-semibold text-[var(--tx)]">
                  {question}
                </summary>
                <p className="mt-3 text-sm text-[var(--tx-2)] leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing - warm and simple */}
        <section className="my-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">{closing.title}</h2>
          <p className="text-[var(--tx-2)] max-w-xl mx-auto leading-relaxed mb-6">
            {closing.description}
          </p>
          {closing.ctaLabel && closing.ctaHref ? (
            closing.ctaHref.startsWith("/") ? (
              <Link
                href={closing.ctaHref}
                className="inline-flex items-center justify-center rounded-md border border-[var(--ui)] px-5 py-2 text-sm font-medium transition hover:bg-[var(--ui)]/30"
              >
                {closing.ctaLabel}
              </Link>
            ) : (
              <a
                href={closing.ctaHref}
                className="inline-flex items-center justify-center rounded-md border border-[var(--ui)] px-5 py-2 text-sm font-medium transition hover:bg-[var(--ui)]/30"
              >
                {closing.ctaLabel}
              </a>
            )
          ) : null}
        </section>

        {legalNotice ? (
          <section className="mt-16 max-w-2xl mx-auto text-left text-xs text-[var(--tx-3)] leading-relaxed border-t border-[var(--ui)]/60 pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] mb-3 text-[var(--tx-3)]">
              {legalNotice.title}
            </h3>
            <ul className="space-y-2">
              {legalNotice.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}