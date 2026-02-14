import { Metadata } from "next";

export const METADATA_BASE = new URL("https://pdflince.com");

export const SHARED_ICONS = [
    { rel: "icon", url: "/favicon.ico?v=2" },
    { rel: "apple-touch-icon", url: "/favicon.ico?v=2" },
];

export const SHARED_OPEN_GRAPH: Metadata["openGraph"] = {
    images: [
        {
            url: "https://pdflince.com/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "PDFLince - Procesamiento de PDFs privado y gratuito"
        }
    ],
};
