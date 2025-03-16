import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<boolean>((state, action) => {
      state.isLoggedIn = action.payload
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const { setIsLoggedIn } = userSlice.actions
export const { selectIsLoggedIn } = userSlice.selectors
export const userReducer = userSlice.reducer
