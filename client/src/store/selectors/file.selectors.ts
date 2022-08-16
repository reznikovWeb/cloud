import { RootState } from "../index";

export const currentDirSelector = (state: RootState) => state.file.currentDir;
export const filesSelector = (state: RootState) => state.file.files;
export const dirStackSelector = (state: RootState) => state.file.dirStack;
