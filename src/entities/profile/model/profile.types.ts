export type UserProfile = {
  id: string
  userId: string
  userName: string
  photoUrl: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  city: string
  aboutMe: string
  followed: boolean
  subscribers: number
  subscriptions: number
  createdAt: string
  paymentAccount: boolean
}
export type UserProfileListResponse = {
  items: UserProfile[]
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
}
export type EditUserProfile = {
  file: File
  userName: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  city: string
  aboutMe: string
}

export type UserProfileListResponse = {
  items: UserProfile[]
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
}

export type EditUserProfileWithoutFile = Partial<Omit<EditUserProfile, 'file'>>
