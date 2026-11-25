import "./globals.css";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import { EVENT, ALL_TIERS } from "@/lib/event";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE_URL = "https://sissyfantasyisland.com";
const TITLE = "LA Trans Party — Sunday, December 13, 2026 · Los Angeles";
const DESC = "A private, after-dark trans party in Los Angeles. Live performance, themed rooms and a dance floor until 4AM. Sunday, December 13, 2026. Strictly 18+.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  keywords: "trans party los angeles, LA trans party, trans event LA, December 2026, LGBTQ party LA",
  authors: [{ name: "LA Trans Party" }],
  creator: "LA Trans Party",
  openGraph: { title: TITLE, description: DESC, url: SITE_URL, siteName: "LA Trans Party", type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESC },
  robots: { index: true, follow: true },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "LA Trans Party — Winter 2026",
  description: DESC,
  startDate: EVENT.startISO,
  endDate: EVENT.endISO,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Private venue (disclosed to ticket holders)",
    address: { "@type": "PostalAddress", addressLocality: "Los Angeles", addressRegion: "CA", addressCountry: "US" },
  },
  organizer: { "@type": "Organization", name: "LA Trans Party", url: SITE_URL },
  offers: ALL_TIERS.map((t) => ({
    "@type": "Offer", name: t.name, price: String(t.price), priceCurrency: "USD",
    availability: "https://schema.org/InStock", url: `${SITE_URL}/#tickets`,
  })),
  audience: { "@type": "PeopleAudience", suggestedMinAge: 18 },
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
        text: "The venue is private and disclosed only to ticket holders 48 hours before the event via email. It is in Los Angeles, CA.",
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
        text: "General Admission is $150, VIP is $250 and Ultra VIP is $500, each for the night of December 13, 2026. Virtual Access (live stream) is $75. Pay by card via Stripe or with Bitcoin.",
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
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
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
