import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit'

import { CreatePostModal, ErrorAlert, RequestStatus } from './postSlice.types'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    error: null as ErrorAlert,
    loadingStatus: 'idle' as RequestStatus,
    isShowCreatePostModal: null as CreatePostModal,
  },
  reducers: (create) => ({
    setPostError: create.reducer<ErrorAlert>((state, action) => {
      state.error = action.payload
    }),

    setIsShowCreatePostModal: create.reducer<CreatePostModal>(
      (state, action) => {
        state.isShowCreatePostModal = action.payload
      },
    ),

    setLoadingStatus: create.reducer<RequestStatus>((state, action) => {
      state.loadingStatus = action.payload
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.loadingStatus = 'loading'
      })
      .addMatcher(isFulfilled, (state) => {
        state.loadingStatus = 'succeeded'
      })
      .addMatcher(isRejected, (state) => {
        state.loadingStatus = 'failed'
      })
  },
  selectors: {
    selectShowCreatePostModal: (state) => state.isShowCreatePostModal,
    selectStatusRequest: (state) => state.loadingStatus,
    selectError: (state) => state.error,
  },
})

export const { setPostError, setIsShowCreatePostModal, setLoadingStatus } =
  postSlice.actions
export const { selectShowCreatePostModal, selectStatusRequest, selectError } =
  postSlice.selectors
export const postReducer = postSlice.reducer
