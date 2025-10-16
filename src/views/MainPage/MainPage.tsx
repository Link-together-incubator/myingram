import { PublicPostList } from '@/features'
import { RegisteredUsers } from '@/features/RegisteredUsers'

export const MainPage = () => {
  return (
    <div className="flex pt-[24px] flex-col gap-9 items-center">
      <RegisteredUsers />
      <PublicPostList />
    </div>
  )
}
