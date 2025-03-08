import { useDispatch } from "react-redux";

import { AppDispatch } from "@/_app";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
