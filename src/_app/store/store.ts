import { configureStore } from '@reduxjs/toolkit'

import { userReducer, userSlice } from '@/entities/user/model/userSlice'
import { baseApi } from '@/shared/api/baseApi'

import { appReducer, appSlice } from '../../shared/model/appSlice'

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [userSlice.name]: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
