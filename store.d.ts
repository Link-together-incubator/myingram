import {
  RootState as AppState,
  AppDispatch as AppStateDispatch,
} from "@/_app/store";

declare global {
  type RootState = AppState;
  type AppDispatch = AppStateDispatch;
}
