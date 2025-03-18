import { userApi } from '@/entities/user/api/userApi'

export const useAuthMeData = () => {
  const { data } = userApi.endpoints.authMe.useQueryState()

  return data
}
