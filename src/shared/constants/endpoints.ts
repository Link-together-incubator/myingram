export const Endpoints = {
  posts: 'posts',
  profile: 'profile',
} as const

export type Endpoints = (typeof Endpoints)[keyof typeof Endpoints]
