import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'

export const metadata: Metadata = {
  title: {
    template: '%s | VDM Biochemicals',
    default: 'VDM Biochemicals — Life Science Research Chemicals',
  },
  description: 'Leading supplier of innovative biochemicals, analytical reagents, and specialty products for life science research. 700+ products for cancer research, antivirals, enzyme inhibitors, and more.',
  keywords: ['biochemicals', 'life science', 'cancer research', 'antivirals', 'enzyme inhibitors', 'CAS number', 'research chemicals'],
  openGraph: {
    siteName: 'VDM Biochemicals',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
