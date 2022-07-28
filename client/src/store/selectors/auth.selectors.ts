import { RootState } from "../index";

export const tokenSelector = (state: RootState) => state.auth.token;
export const authLoadingSelector = (state: RootState) => state.auth.loading;
