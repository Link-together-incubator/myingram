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
