export type CreatePostPayload = {
  description: string
  files: File[]
}
export type PostPayload = {
  id: string
  userId: string
  photoUrls: string[]
  description: string
  createdAt: string
  updatedAt: string
}

export type UpdatePostPayload = {
  postId: string
  description: string
}

export type PostByIdPayload = {
  postId: string
}

export type UpdatePostResponse = {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  description: string
}

export type User = {
  id: string
  name: string
}

export type Users = User[]
