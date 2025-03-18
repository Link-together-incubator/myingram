'use client'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`flex justify-center pt-32 gap-8 flex-col items-center min-h-screen`}
    >
      {children}
    </div>
  )
}
