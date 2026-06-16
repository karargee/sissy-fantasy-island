import "./globals.css";

export const metadata = {
  title: "Trans & Sex Party 🏳️⚧️ — San Francisco, June 20",
  description: "The ultimate party for men who love trans women. Subs. Doms. No limits. One unforgettable night. Tickets available now.",
  keywords: ["trans party", "sex party", "san francisco", "kink", "dungeon", "fetish", "lgbtq"],
  openGraph: {
    title: "Trans & Sex Party 🏳️⚧️",
    description: "The ultimate party for men who love trans women. One unforgettable night of pleasure.",
    url: "https://transparty.com",
    siteName: "Trans & Sex Party",
    type: "website",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Trans & Sex Party",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trans & Sex Party 🏳️⚧️",
    description: "The ultimate party for men who love trans women. Tickets available now.",
    images: ["/hero.jpg"],
  },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
