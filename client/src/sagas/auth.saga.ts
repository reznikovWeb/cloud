import {
  all,
  call,
  put,
  CallEffect,
  PutEffect,
  takeLatest,
} from "@redux-saga/core/effects";
import { getUserRoutine } from "../store/authSlice";
import { login } from "../api/auth";
import { AnyAction } from "@reduxjs/toolkit";
import { IUser } from "../api/types";

type Data = {
  token: string;
  user: IUser;
};

export function* getUser(
  action: ReturnType<typeof getUserRoutine.trigger>
): Generator<CallEffect<Data> | PutEffect<AnyAction>> {
  try {
    yield put(getUserRoutine.request());
    const data = yield call(login, action.payload);
    yield put(getUserRoutine.success(data));
  } catch (e) {
    yield put(getUserRoutine.failure(e));
  } finally {
    yield put(getUserRoutine.fulfill());
  }
}

export default function* authWatcher() {
  yield all([takeLatest(getUserRoutine.TRIGGER, getUser)]);
}
