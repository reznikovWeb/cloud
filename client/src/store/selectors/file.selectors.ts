import { RootState } from "../index";

export const currentDirSelector = (state: RootState) => state.file.currentDir;
