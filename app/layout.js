import "./globals.css";

export const metadata = {
  title: "Sissy Fantasy Island — Official Membership & Community",
  description: "The official sissy & trans community platform. Get your Sissy Card, join the community, and access exclusive events.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
