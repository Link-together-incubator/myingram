'use client'

import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { AppSidebar } from '@/widgets/Sidebar/ui/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/widgets/Sidebar/ui/Sidebar'

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data } = useAuthMeQuery()

  return (
    <>
      {data ? (
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger variant="date" />
          {children}
        </SidebarProvider>
      ) : (
        children
      )}
    </>
  )
}

export default Layout
