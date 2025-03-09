"use client";

import "@/_app/styles/globals.css";

import { Montserrat } from "next/font/google";
import { Provider } from "react-redux";
import Script from "next/script";

import { ModalProvider } from "@/_app/providers";
import { store } from "@/_app/store";
import { Header } from "@/widgets/Header";

const montserrat = Montserrat({
  variable: "--font-montserrat", // CSS-переменная для использования в SCSS/Tailwind
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased min-h-screen dark`}>
        <Header />
        <ModalProvider>{children}</ModalProvider>
        <Script
          src="https://www.google.com/recaptcha/api.js?hl=en"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
