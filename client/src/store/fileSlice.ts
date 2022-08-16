import { createSlice } from "@reduxjs/toolkit";
import { createRoutine } from "redux-saga-routines";

export interface IFile {
  child: string[];
  name: string;
  path: string;
  size: number;
  type: string;
  user: string;
  __v: number;
  _id: string;
  date: string;
}

interface IFileSlice {
  files: IFile[];
  currentDir: string | null;
  dirStack: (string|null)[];

  error: null | string;
  loading: boolean;
}

const initialState: IFileSlice = {
  files: [],
  currentDir: null,
  dirStack: [],

  error: null,
  loading: false,
};

export const getFilesRoutine = createRoutine("file/getFiles");
export const createFolderRoutine = createRoutine("file/createFolder");

const fileSlice = createSlice({
  name: "file",
  initialState: initialState,
  reducers: {
    updateCurrentDir(state, action) {
      state.currentDir = action.payload;
    },

    pushToStack(state, action) {
      state.dirStack.push(action.payload);
    },

    popToStack(state){
      state.dirStack.pop()
    }
  },
  extraReducers: {
    [getFilesRoutine.REQUEST]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getFilesRoutine.SUCCESS]: (state, action) => {
      state.files = action.payload;
    },
    [getFilesRoutine.FAILURE]: (state, action) => {
      state.error = action.payload;
    },
    [getFilesRoutine.FULFILL]: (state) => {
      state.loading = false;
    },

    [createFolderRoutine.REQUEST]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createFolderRoutine.SUCCESS]: (state, action) => {
      state.files.push(action.payload);
    },
    [createFolderRoutine.FAILURE]: (state, action) => {
      state.error = action.payload;
    },
    [createFolderRoutine.FULFILL]: (state) => {
      state.loading = false;
    },
  },
});

export const fileReducer = fileSlice.reducer;

export const { updateCurrentDir, pushToStack,popToStack } = fileSlice.actions;
