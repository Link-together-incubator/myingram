'use client'

import { withMainRedirect } from '@/shared/lib/hocs/withMainRedirect'

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`flex justify-center items-center min-h-screen pt-24 pb-16`}
    >
      {children}
    </div>
  )
}

export default withMainRedirect(Layout)
