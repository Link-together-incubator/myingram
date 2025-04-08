import { authApi } from '@/features/auth/api/authApi'

export const useAuthMeData = () => {
  const { data } = authApi.endpoints.authMe.useQueryState()

  return data
}
