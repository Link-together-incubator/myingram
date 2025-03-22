import { AlertType } from '@/widgets/Alert'

export type ErrorAlert = { type: AlertType; message: string } | null
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type CreatePostModal = null | 'addPhoto' | 'croppingPhoto'
