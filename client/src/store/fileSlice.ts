import { createSlice } from "@reduxjs/toolkit";
import { createRoutine } from "redux-saga-routines";

interface IFileSlice {
  files: string[];
  currentDir: string | null;
  error: null | string;
  loading: boolean;
}

const initialState: IFileSlice = {
  error: null,
  loading: false,

  files: [],
  currentDir: null,
};

export const getFilesRoutine = createRoutine("file/getFiles");

const fileSlice = createSlice({
  name: "file",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getFilesRoutine.REQUEST]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getFilesRoutine.SUCCESS]: (state, action) => {
      state.files = action.payload.files;
    },
    [getFilesRoutine.FAILURE]: (state, action) => {
      state.error = action.payload;
    },
    [getFilesRoutine.FULFILL]: (state) => {
      state.loading = false;
    },
  },
});

export const fileReducer = fileSlice.reducer;
