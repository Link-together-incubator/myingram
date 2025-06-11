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
