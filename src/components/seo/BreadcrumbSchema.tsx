"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useMemo } from "react";
import { useDictionary } from "../../i18n/LocaleProvider";
import { OperationKey } from "../../types/operations";

// Map of route segments to OperationKeys or other keys
const SEGMENT_LABEL_MAP: Record<string, OperationKey> = {
    // Spanish
    "comprimir-pdf": "compress",
    "unir-pdf": "merge",
    "dividir-pdf": "split",
    "extraer-paginas": "extract",
    "ordenar-pdf": "reorder",
    "pdf-a-jpg": "pdfToImages",
    "jpg-a-pdf": "imagesToPdf",
    // English
    "compress-pdf": "compress",
    "merge-pdf": "merge",
    "split-pdf": "split",
    "extract-pages": "extract",
    "organize-pdf": "reorder",
    "pdf-to-jpg": "pdfToImages",
    "jpg-to-pdf": "imagesToPdf",
    // German
    "pdf-komprimieren": "compress",
    "pdf-zusammenfugen": "merge",
    "pdf-teilen": "split",
    "seiten-extrahieren": "extract",
    "pdf-ordnen": "reorder",
    "pdf-in-jpg": "pdfToImages",
    "pdf-in-jpeg": "pdfToImages", // Alternate
    "jpg-in-pdf": "imagesToPdf",
    // Portuguese
    "juntar-pdf": "merge",
    "extrair-paginas": "extract",
    "pdf-para-jpg": "pdfToImages",
    "jpg-para-pdf": "imagesToPdf",
    // Duplicates handled by JS object behavior (last one wins), but we should explicitely list unique ones in source code to avoid linter errors
};

export function BreadcrumbSchema() {
    const pathname = usePathname();
    const dictionary = useDictionary();

    const breadcrumbJson = useMemo(() => {
        if (!pathname) return null;

        const domain = "https://pdflince.com";
        const fullUrl = `${domain}${pathname}`;

        const segments = pathname.split('/').filter(Boolean);

        // Skip if just home "/" or "/es"
        const isHome = segments.length === 0 || (segments.length === 1 && ["es", "en", "de", "pt"].includes(segments[0]));

        if (isHome) {
            return null;
        }

        // Build items
        const itemListElement = [];

        // 1. Home
        itemListElement.push({
            "@type": "ListItem",
            "position": 1,
            "name": "PDFLince",
            "item": domain
        });

        // 2. The Tool Page
        const lastSegment = segments[segments.length - 1];
        let label = lastSegment;

        // Attempt to lookup friendly name
        const lookupKey = SEGMENT_LABEL_MAP[lastSegment];
        const operations = dictionary.operations;

        if (lookupKey && operations && operations[lookupKey]) {
            // It's an operation
            label = operations[lookupKey].meta.title;
        } else if (lastSegment === 'faq' || lastSegment === 'preguntas-frecuentes') {
            label = dictionary.pages.faq.title; // Or components.nav.faq
        } else {
            // Fallback formatting
            label = lastSegment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }

        itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": label,
            "item": fullUrl
        });

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
        };
    }, [pathname, dictionary]);

    if (!breadcrumbJson) return null;

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
        />
    );
}
