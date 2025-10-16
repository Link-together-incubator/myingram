import { Metadata } from 'next'

import { ServerSideProvider } from '@/_app/providers'
import { MainPage } from '@/views'

export const metadata: Metadata = {
  title: 'Home',
}

function Home() {
  return (
    <div className="mt-18">
      <MainPage />
    </div>
  )
}
export default ServerSideProvider(Home)
