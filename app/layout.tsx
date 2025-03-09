import "@/_app/styles/globals.css";
import { Montserrat } from "next/font/google";

import { AppSidebar } from "@/shared/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
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
        <SidebarProvider>
          <div>a</div>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
        {children}
      </body>
    </html>
  );
}
