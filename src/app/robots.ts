import { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://pdflince.com";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/api/",
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
