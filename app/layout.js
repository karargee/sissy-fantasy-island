import "./globals.css";

export const metadata = {
  title: "Sissy Fantasy Island — Official Membership & Community",
  description: "The official sissy & trans community platform. Get your Sissy Card starting at $50, join the private community, and access exclusive events worldwide.",
  keywords: "sissy, trans, community, membership card, events, sissy card, fantasy island",
  openGraph: {
    title: "Sissy Fantasy Island — Official Membership & Community",
    description: "Get your Sissy Card starting at $50. Join the private community. Access exclusive events worldwide. 100% discreet.",
    url: "https://sissyfantasyisland.com",
    siteName: "Sissy Fantasy Island",
    type: "website",
    images: [{ url: "https://sissyfantasyisland.com/hero.jpg", width: 1200, height: 630, alt: "Sissy Fantasy Island" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sissy Fantasy Island — Official Membership & Community",
    description: "Get your Sissy Card starting at $50. Join the private community. Access exclusive events worldwide.",
    images: ["https://sissyfantasyisland.com/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
