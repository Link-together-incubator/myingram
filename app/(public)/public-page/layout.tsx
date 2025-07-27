import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return <div className="mt-18">{children}</div>
}

export default Layout
