export const Endpoints = {
  posts: 'content/posts',
  profile: 'profile',
} as const

export type Endpoints = (typeof Endpoints)[keyof typeof Endpoints]
