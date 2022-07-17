import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { authReducer } from "./authSlice";
import rootSaga from "../sagas/root.saga";

const rootReducer = combineReducers({
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
