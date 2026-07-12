export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: "https://sissyfantasyisland.com/sitemap.xml",
  };
}
