import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isAuth: false,
};

const fileSlice = createSlice({
  name: "file",
  initialState: initialState,
  reducers: {},
});