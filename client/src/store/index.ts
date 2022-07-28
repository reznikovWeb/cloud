import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./authSlice";
import rootSaga from "./sagas/root.saga";
import { fileReducer } from "./fileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  file: fileReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
