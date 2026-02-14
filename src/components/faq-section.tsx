"use client";

import { useState, useEffect, useMemo } from "react";
import { useDictionary, useLocale } from "../i18n/LocaleProvider";
import type { FAQItem } from "../i18n/dictionaries/dictionary-types";
import { FaqSchema } from "./seo/FaqSchema";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const locale = useLocale();
  const dictionary = useDictionary();

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language;
      setRegion(browserLang);
    }
  }, []);

  const { faqs, labels } = useMemo(() => {
    const collection = dictionary.faqs;

    const combined: FAQItem[] = [...collection.common];

    if (locale === "es") {
      if (region?.toLowerCase().includes("es")) {
        if (collection.spain) {
          combined.push(...collection.spain);
        }
      } else if (collection.latam) {
        combined.push(...collection.latam);
      }
    } else if (collection.regional) {
      combined.push(...collection.regional);
    }

    combined.push(...collection.tech);

    return {
      faqs: combined,
      labels: {
        title: dictionary.pages.faq.title,
      },
    };
  }, [dictionary, locale, region]);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">{labels.title}</h2>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={`${faq.question}-${index}`} className="mb-4 border border-[var(--ui-2)] rounded-lg overflow-hidden">
            <button
              className="w-full text-left p-4 flex justify-between items-center font-medium hover:bg-[var(--ui)]/10 transition-colors"
              onClick={() => toggleQuestion(index)}
            >
              <span>{faq.question}</span>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>

            {openIndex === index && (
              <div className="p-4 pt-4 bg-[var(--bg-2)] text-[var(--tx-2)]">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <FaqSchema data={faqs} />
    </section>
  );
}
