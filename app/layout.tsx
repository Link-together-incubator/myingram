import '@/_app/styles/globals.css'

import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'

import { InitProvider, ModalProvider, StoreProvider } from '@/_app/providers'
import { ProgressBar } from '@/shared/ui'
import { Header } from '@/widgets/Header'

const montserrat = Montserrat({
  variable: '--font-montserrat', // CSS-переменная для использования в SCSS/Tailwind
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Inctagram',
    default: 'Inctagram',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased min-h-screen dark`}>
        <StoreProvider>
          <ModalProvider>
            <InitProvider>
              <Header />
              <ProgressBar />
              <main>{children}</main>
            </InitProvider>
          </ModalProvider>
        </StoreProvider>
        <Script
          src="https://www.google.com/recaptcha/api.js?hl=en"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
