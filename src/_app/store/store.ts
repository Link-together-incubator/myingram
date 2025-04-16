import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@/shared/api/baseApi'

import { appReducer, appSlice } from '../../shared/model/appSlice'

const rootReducer = combineReducers({
  [appSlice.name]: appReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const storeReducer = (
  state: RootState | undefined,
  action: AnyAction,
): RootState => {
  if (action.type === 'RESET_STATE') {
    state = {} as RootState // ресетаем состояние
  }
  return rootReducer(state, action)
}

export const makeStore = () => {
  return configureStore({
    reducer: storeReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
