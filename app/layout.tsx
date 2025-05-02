import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FirstPay Admin Dashboard',
  description: 'Admin dashboard for FirstPay mobile wallet application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* No static navigation scripts needed for server-side rendering */}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
} 