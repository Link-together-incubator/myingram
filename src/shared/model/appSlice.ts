import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'

import { EmailSentModal, ErrorAlert, RequestStatus } from './appSlice.types'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    error: null as ErrorAlert,
    status: 'idle' as RequestStatus,
    isShowEmailSentModal: null as EmailSentModal,
  },
  reducers: (create) => ({
    setAppError: create.reducer<ErrorAlert>((state, action) => {
      state.error = action.payload
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
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, (state) => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectShowEmailSentModal: (state) => state.isShowEmailSentModal,
    selectStatusRequest: (state) => state.status,
    selectError: (state) => state.error,
  },
})

export const { setAppError, setIsShowEmailSentModal } = appSlice.actions
export const { selectShowEmailSentModal, selectStatusRequest, selectError } =
  appSlice.selectors
export const appReducer = appSlice.reducer
