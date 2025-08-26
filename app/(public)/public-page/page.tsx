import { Metadata } from 'next'

import { PublicPage } from '@/views'

export const metadata: Metadata = {
  title: 'Public page',
}

function Page() {
  return <PublicPage />
}

export default Page
