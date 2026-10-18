"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useMemo } from "react";
import { useDictionary } from "../../i18n/LocaleProvider";
import { SUPPORTED_LOCALES } from "../../i18n/config";
import { buildGlobalSlugToOperationMap, buildFaqSegmentSet } from "../../i18n/routing";

// Dynamically built from i18n-route-map.json — never goes stale when slugs change or languages are added.
const SLUG_TO_OPERATION = buildGlobalSlugToOperationMap();
const FAQ_SEGMENTS = buildFaqSegmentSet();

export function BreadcrumbSchema() {
    const pathname = usePathname();
    const dictionary = useDictionary();

    const breadcrumbJson = useMemo(() => {
        if (!pathname) return null;

        const domain = "https://pdflince.com";
        const fullUrl = `${domain}${pathname}`;

        const segments = pathname.split('/').filter(Boolean);

        // Skip if just home "/" or "/es"
        const isHome = segments.length === 0 || (segments.length === 1 && (SUPPORTED_LOCALES as readonly string[]).includes(segments[0]));

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
        const operationKey = SLUG_TO_OPERATION[lastSegment];
        const operations = dictionary.operations;

        if (operationKey && operations && operations[operationKey]) {
            // It's an operation - use the short footer navigation label, NOT the full SEO meta title
            label = dictionary.components.footer.operations[operationKey];
        } else if (FAQ_SEGMENTS.has(lastSegment)) {
            label = dictionary.pages.faq.title;
        } else if (lastSegment === "mcp") {
            label = dictionary.components.nav.mcp ?? "MCP Server";
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
