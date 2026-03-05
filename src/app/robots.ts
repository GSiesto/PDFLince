import { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://pdflince.com";

    // Cast to bypass Next.js restricted Sitemap type since it doesn't officially support 'host' yet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const robotsObj: any = {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/api/",
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
        host: "https://api.indexnow.org/indexnow?url=https://pdflince.com&key=7a258aaa2a9b472bb6e97935fe5e82ca",
    };

    return robotsObj as MetadataRoute.Robots;
}
