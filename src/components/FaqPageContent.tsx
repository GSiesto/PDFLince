import Link from "next/link";
import type { Dictionary } from "../i18n/dictionaries/dictionary-types";
import FaqSection from "./faq-section";

export function FaqPageContent({ dictionary }: { dictionary: Dictionary }) {
  const faqPage = dictionary.pages.faq;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: "var(--max-width-wide-page)" }}>
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{faqPage.title}</h1>
          <p className="text-xl text-[var(--tx-2)] max-w-3xl mx-auto">{faqPage.intro}</p>
        </div>

        <FaqSection />

        {faqPage.contact && (
          <div className="my-12 p-8 surface-card">
            <h2 className="text-2xl font-bold mb-4 text-center">{faqPage.contact.title}</h2>
            <p className="text-center text-[var(--tx-2)] mb-6">{faqPage.contact.description}</p>

            <div className="flex justify-center">
              <a href={faqPage.contact.ctaHref} className="btn-primary rounded-lg px-6 py-3 text-white inline-block">
                {faqPage.contact.ctaLabel}
              </a>
            </div>
          </div>
        )}

        <div className="my-12 p-8 surface-card bg-[var(--bg-2)]/80 text-center">
          <h2 className="text-2xl font-bold mb-4">{faqPage.cta.title}</h2>
          <p className="mb-6 text-[var(--tx-2)]">{faqPage.cta.description}</p>
          <Link href={dictionary.routes.home} className="btn-primary rounded-lg px-6 py-3 text-white inline-block">
            {faqPage.cta.ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
