import "./globals.css";

export const metadata = {
  title: "Sissy Fantasy Island 💕",
  description: "Your official sissy membership site. Get your Sissy Card, shop outfits, and join the community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
