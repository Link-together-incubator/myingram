import { ServerSideProvider } from '@/_app/providers'
import ExampleMain from '@/views/ExampleMain/ExampleMain'

function Home() {
  return <ExampleMain />
}
export default ServerSideProvider(Home)
