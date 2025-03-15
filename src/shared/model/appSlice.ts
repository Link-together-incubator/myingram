import { createSlice } from '@reduxjs/toolkit'

export type Error = string | null
type EmailSentModal = null | { message: string; title: string }

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    error: null as Error,
    isLoggedIn: false,
    isShowEmailSentModal: null as EmailSentModal,
  },
  reducers: (create) => ({
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setIsShowEmailSentModal: create.reducer<EmailSentModal>((state, action) => {
      if (action.payload === null) {
        state.isShowEmailSentModal = null
      } else {
        state.isShowEmailSentModal = {
          message: action.payload.message,
          title: action.payload.title,
        }
      }
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectShowEmailSentModal: (state) => state.isShowEmailSentModal,
  },
})

export const { setAppError, setIsLoggedIn, setIsShowEmailSentModal } =
  appSlice.actions
export const { selectIsLoggedIn, selectShowEmailSentModal } = appSlice.selectors
export const appReducer = appSlice.reducer
