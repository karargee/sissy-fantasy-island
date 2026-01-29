import './globals.css'
import ShoppingCart from '@/components/ShoppingCart'
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <ShoppingCart />
        <Analytics />
      </body>
    </html>
  )
}