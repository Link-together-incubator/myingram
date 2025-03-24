import { AlertType } from '@/widgets/Alert'
import { PromptProps } from '@/widgets/Prompt/ui/Prompt'

export type Alert = { type: AlertType; message: string } | null
export type EmailSentModal = null | { message: string; title: string }
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type PromptState = PromptProps | null
export type UserChoice = null | { promptId: string; isConfirmed: boolean }
