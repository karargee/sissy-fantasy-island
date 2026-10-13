import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://sissyfantasyisland.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "LA Trans Party 2026 — Los Angeles · Oct 23–24",
  description: "The most exclusive trans & subs party in Los Angeles. October 23–24, 2026. Limited tickets. Private venue. Unforgettable.",
  keywords: "trans party los angeles, LA trans party 2026, trans event LA, subs party, LGBTQ party LA",
  authors: [{ name: "LA Trans Party" }],
  creator: "LA Trans Party",
  openGraph: {
    title: "LA Trans Party 2026 — Los Angeles · Oct 23–24",
    description: "The most exclusive trans & subs party in Los Angeles. October 23–24, 2026. Limited tickets.",
    url: SITE_URL,
    siteName: "LA Trans Party",
    type: "website",
    images: [{ url: "/hero.jpg", width: 1200, height: 630, alt: "LA Trans Party 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LA Trans Party 2026 — Los Angeles · Oct 23–24",
    description: "The most exclusive trans & subs party in Los Angeles. October 23–24, 2026. Limited tickets.",
    images: ["/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "LA Trans Party 2026",
  description:
    "Two nights of the most exclusive trans & subs party in Los Angeles. Music, freedom, and unapologetic self-expression. Private venue disclosed 48 hours before the event.",
  startDate: "2026-10-23T21:00:00-07:00",
  endDate: "2026-10-25T04:00:00-07:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Private Venue (disclosed to ticket holders)",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
  },
  image: [`${SITE_URL}/hero.jpg`],
  organizer: {
    "@type": "Organization",
    name: "LA Trans Party",
    url: SITE_URL,
  },
  offers: [
    { "@type": "Offer", name: "General Admission", price: "150", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability", url: `${SITE_URL}/#tickets` },
    { "@type": "Offer", name: "VIP Access", price: "250", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability", url: `${SITE_URL}/#tickets` },
    { "@type": "Offer", name: "Ultra VIP", price: "500", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability", url: `${SITE_URL}/#tickets` },
    { "@type": "Offer", name: "Virtual Access", price: "75", priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${SITE_URL}/#tickets` },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Adults 18+",
    suggestedMinAge: 18,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where is the venue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The venue is private and disclosed only to ticket holders 48 hours before the event via email. It is located in Los Angeles, CA.",
      },
    },
    {
      "@type": "Question",
      name: "What is the dress code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Glamorous, fetish-friendly, or formal. Trans-affirming attire celebrated. Lingerie, latex, leather, gowns, suits — all welcome. Come as your most authentic self.",
      },
    },
    {
      "@type": "Question",
      name: "Is this event safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We have strict consent policies, trained staff, and a zero-tolerance policy for harassment. Safe words are enforced. Everyone is here to have a good time respectfully.",
      },
    },
    {
      "@type": "Question",
      name: "What are the ticket prices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "General Admission is $150 per person (both nights). VIP is $250 and includes lounge access, priority entry, drinks, and a gift bag. Ultra VIP is $500 and includes a private suite, open bar, limo pickup, and a personal host. Virtual Access (remote) is $75.",
      },
    },
    {
      "@type": "Question",
      name: "Is this 18+ only?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This is a strictly 18+ adult event. Valid ID required at the door.",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
