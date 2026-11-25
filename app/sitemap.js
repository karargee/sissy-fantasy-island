const BASE = "https://sissyfantasyisland.com";

export default function sitemap() {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/past-parties`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/code-of-conduct`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
