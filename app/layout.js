import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "LA Trans Party 2026 — Los Angeles · Oct 23–24",
  description: "The most exclusive trans & subs party in Los Angeles. October 23–24, 2026. Limited tickets. Private venue. Unforgettable.",
  keywords: "trans party los angeles, LA trans party 2026, trans event LA, subs party, LGBTQ party LA",
  openGraph: {
    title: "LA Trans Party 2026 — Los Angeles · Oct 23–24",
    description: "The most exclusive trans & subs party in Los Angeles. October 23–24, 2026. Limited tickets.",
    url: "https://sissyfantasyisland.com",
    siteName: "LA Trans Party",
    type: "website",
    images: [{ url: "https://sissyfantasyisland.com/hero.jpg", width: 1200, height: 630, alt: "LA Trans Party 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LA Trans Party 2026 — Los Angeles · Oct 23–24",
    description: "The most exclusive trans & subs party in Los Angeles. October 23–24, 2026. Limited tickets.",
    images: ["https://sissyfantasyisland.com/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
