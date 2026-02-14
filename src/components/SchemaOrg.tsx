import Script from "next/script";

export function SchemaOrg() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "PDFLince",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
        },
        "description": "Free and private PDF tools: Merge, Compress, Split, Extract, Reorder, PDF to Image, and Image to PDF. 100% local processing.",
        "featureList": [
            "Merge PDF",
            "Compress PDF",
            "Split PDF",
            "Extract Pages",
            "Reorder Pages",
            "PDF to Image",
            "Image to PDF"
        ],
        "softwareRequirements": "Modern Web Browser",
        "author": {
            "@type": "Organization",
            "name": "PDFLince"
        }
    };

    return (
        <Script
            id="schema-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
