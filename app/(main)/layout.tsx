'use client'

import { AppSidebar } from '@/widgets/Sidebar/ui/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/widgets/Sidebar/ui/Sidebar'

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger variant="date" />
        {children}
      </SidebarProvider>
    </>
  )
}

export default Layout
