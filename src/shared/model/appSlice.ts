import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'

import {
  Alert,
  EmailSentModal,
  PromptState,
  RequestStatus,
  UserChoice,
} from './appSlice.types'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    modals: {
      alert: null as Alert,
      appStatus: 'idle' as RequestStatus,
      emailSentMessage: null as EmailSentModal,
      createPostModal: false,
      promptModal: {
        state: null as PromptState,
        userChoice: null as UserChoice,
      },
    },
  },
  reducers: (create) => ({
    setAppError: create.reducer<Alert>((state, action) => {
      state.modals.alert = action.payload
    }),

    setPrompt: create.reducer<{ state: PromptState; userChoice: UserChoice }>(
      (state, action) => {
        state.modals.promptModal.state = action.payload.state
        state.modals.promptModal.userChoice = action.payload.userChoice
      },
    ),

    setIsShowEmailSentModal: create.reducer<EmailSentModal>((state, action) => {
      state.modals.emailSentMessage = action.payload
    }),

    setStatus: create.reducer<RequestStatus>((state, action) => {
      state.modals.appStatus = action.payload
    }),

    setCreatePostModal: create.reducer<boolean>((state, action) => {
      state.modals.createPostModal = action.payload
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.modals.appStatus = 'loading'
      })
      .addMatcher(isFulfilled, (state) => {
        state.modals.appStatus = 'succeeded'
      })
      .addMatcher(isRejected, (state) => {
        state.modals.appStatus = 'failed'
      })
  },
  selectors: {
    selectShowEmailSentModal: (state) => state.modals.emailSentMessage,
    selectStatusRequest: (state) => state.modals.appStatus,
    selectAlert: (state) => state.modals.alert,
    selectModals: (state) => state.modals,
    selectUserChoice: (state) => state.modals.promptModal.userChoice,
  },
})

export const {
  setAppError,
  setIsShowEmailSentModal,
  setStatus,
  setCreatePostModal,
  setPrompt,
} = appSlice.actions
export const {
  selectShowEmailSentModal,
  selectStatusRequest,
  selectAlert,
  selectModals,
  selectUserChoice,
} = appSlice.selectors
export const appReducer = appSlice.reducer
