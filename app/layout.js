import "./globals.css";

export const metadata = {
  title: "Trans & Sex Party 🏳️‍⚧️",
  description: "The ultimate sex party for men who love trans women. Get your tickets now.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
