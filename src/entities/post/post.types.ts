export type CreatePostPayload = {
  description: string
  files: File[]
}

export type PostResponse = {
  id: string
  userId: string
  description: string
  photoUrls: string[]
  createdAt: string
  updatedAt: string
  photoUploadStatus: string
}
export type PostPayload = {
  id: string
  userId: string
  photoUrls: string[]
  description: string
  createdAt: string
  updatedAt: string
}

export type GetPostsPayload = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  items: PostPayload[]
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

export type GetPostsQueryParamPayload = {
  pageNumber?: number
  pageSize?: number
  userId?: string
}

export type Users = User[]
