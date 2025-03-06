import "@/_app/styles/globals.css";
import { Montserrat } from "next/font/google";

import { Button } from "@/shared/ui";

export const montserrat = Montserrat({
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
        <Button>test</Button>
        {children}
      </body>
    </html>
  );
}
