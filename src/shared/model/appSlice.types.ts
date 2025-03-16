import { AlertType } from '@/widgets/Alert'

export type ErrorAlert = { type: AlertType; message: string } | null
export type EmailSentModal = null | { message: string; title: string }
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
