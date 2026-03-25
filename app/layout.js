import "./globals.css";

export const metadata = {
  title: "Trans Party 🏳️‍⚧️",
  description: "Get your tickets to the biggest trans party of the year!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
