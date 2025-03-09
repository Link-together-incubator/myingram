import {
  RootState as AppState,
  AppDispatch as AppStateDispatch,
} from "./src/_app/store/StoreProvider";

declare global {
  type RootState = AppState;
  type AppDispatch = AppStateDispatch;
}
