import { RootState as AppState } from "./src/_app/providers/StoreProvider";

declare global {
  type RootState = AppState;
}
