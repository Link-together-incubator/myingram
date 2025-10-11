export type CreatePostPayload = {
  description: string
  files: File[]
}

export type PhotoObject = {
  id: string
  createdAt: string
  updatedAt: string
  fileName: string
  fileUrl: string
  postId: string
}

export type PostPayload = {
  id: string
  userId: string
  urls: PhotoObject[]
  description: string
  createdAt: string
  updatedAt: string
}

// ToDo: наверное тут надо переименовать на GetPostsResponse, т.к. payload -это нагрузка от клиента на сервер, например в POST запросах body

export type GetPostsPayload = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  items: PostPayload[]
}

export const Statuses = [
  'PENDING',
  'IN_PROGRESS',
  'COMPLETED',
  'FAILED',
] as const

export type Status = (typeof Statuses)[number]

type Urls = {
  id: string
  createdAt: string
  updatedAt: string
  fileName: string
  fileUrl: string
  postId: string
}

export type Post = {
  id: string
  userId: string
  title: string
  urls: Urls[]
  createdAt: string
  updatedAt: string
  photoUploadStatus: Status
  published: boolean
  bunned: boolean
}

export type GetPostsResponse = {
  items: Post[]
  totalCount: number
  pageSize: number
  pageNumber: number
}

export type UpdatePostPayload = {
  postId: string
  description: string
}

// export type PostByIdPayload = {
//   postId: string
// }

export type PostByIdResponse = {
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
