import { RootState } from "../index";

export const tokenSelector = (state: RootState) => state.auth.token;
