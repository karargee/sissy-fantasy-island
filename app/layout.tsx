import './globals.css'
import ShoppingCart from '@/components/ShoppingCart'

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
      </body>
    </html>
  )
}