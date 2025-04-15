import '@/_app/styles/globals.css'

import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import { PropsWithChildren, Suspense } from 'react'

import {
  ModalProvider,
  PostToolkitProvider,
  StoreProvider,
} from '@/_app/providers'
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

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased min-h-screen dark`}>
        <StoreProvider>
          <Suspense>
            <PostToolkitProvider>
              <ModalProvider>
                <Header />
                <ProgressBar />
                <main>{children}</main>
              </ModalProvider>
            </PostToolkitProvider>
          </Suspense>
        </StoreProvider>
        <Script
          src="https://www.google.com/recaptcha/api.js?hl=en"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
