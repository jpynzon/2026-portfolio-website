export default defineEventHandler((event) => {
  const { public: publicConfig } = useRuntimeConfig();
  const baseUrl = String(publicConfig.siteUrl).replace(/\/$/, "");
  const today = new Date().toISOString().split("T")[0];

  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: "daily",
      priority: "1.0",
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (url) =>
        `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`,
    )
    .join("\n")}\n</urlset>`;

  event.node.res.setHeader("content-type", "application/xml");
  return xml;
});