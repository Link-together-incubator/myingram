"use client";

import { AppSidebar } from "@/shared/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </>
  );
}
