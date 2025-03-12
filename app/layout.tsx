'use client'

import '@/_app/styles/globals.css'

import { Montserrat } from 'next/font/google'
import Script from 'next/script'

import { ModalProvider, StoreProvider } from '@/_app/providers'
import { Header } from '@/widgets/Header'

const montserrat = Montserrat({
  variable: '--font-montserrat', // CSS-переменная для использования в SCSS/Tailwind
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

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
            <Header />
            <main>{children}</main>
          </ModalProvider>
        </StoreProvider>
        <Script
          src="https://www.google.com/recaptcha/api.js?hl=en"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
