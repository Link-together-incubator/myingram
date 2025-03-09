import { createSlice } from "@reduxjs/toolkit";

export type Error = string | null;

export const appSlice = createSlice({
  name: "app",
  initialState: {
    error: null as Error,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
});

export const { setAppError, setIsLoggedIn } = appSlice.actions;
export const { selectIsLoggedIn } = appSlice.selectors;
export const appReducer = appSlice.reducer;
