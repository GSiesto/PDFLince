"use client";

import Script from "next/script";
import { FAQItem } from "../../i18n/dictionaries/dictionary-types";

interface FaqSchemaProps {
    data: FAQItem[];
}

export function FaqSchema({ data }: FaqSchemaProps) {
    if (!data || data.length === 0) return null;

    const faqJson = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
        />
    );
}
