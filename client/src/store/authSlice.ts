import { createSlice } from "@reduxjs/toolkit";
import { createRoutine } from "redux-saga-routines";
import { IUser } from "../api/types";

// Чем может быть начальное состояние
interface AuthState {
  loading: boolean;
  error: null | string;

  token: null | string;
  user: null | IUser;
}

const initialState: AuthState = {
  loading: false,
  error: null,

  token: null,
  user: null,
};

export const getUserRoutine = createRoutine("auth/getUser");
export const getAuthRoutine = createRoutine("auth/getAuth");

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getUserRoutine.REQUEST]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [getUserRoutine.SUCCESS]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [getUserRoutine.FAILURE]: (state, action) => {
      state.error = action.payload;
    },
    [getUserRoutine.FULFILL]: (state) => {
      state.loading = false;
    },

    [getAuthRoutine.REQUEST]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [getAuthRoutine.SUCCESS]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [getAuthRoutine.FAILURE]: (state, action) => {
      state.error = action.payload;
    },
    [getAuthRoutine.FULFILL]: (state) => {
      state.loading = false;
    },
  },
});

export const authReducer = authSlice.reducer;
