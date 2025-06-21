import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import { AuthProvider } from '@/hooks/use-auth'

export const metadata: Metadata = {
  title: 'AIDA Project Management',
  description: 'A dashboard to manage the AIDA project, partners, and work packages.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
