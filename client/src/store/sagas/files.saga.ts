import {
  all,
  call,
  put,
  CallEffect,
  PutEffect,
  takeLatest,
} from "@redux-saga/core/effects";
import { getFilesRoutine } from "../fileSlice";
import { getFiles } from "../../api/files";

export function* getFilesSaga(
  action: ReturnType<typeof getFilesRoutine.trigger>
): Generator<CallEffect | PutEffect> {
  try {
    yield put(getFilesRoutine.request());
    const data = yield call(getFiles, action.payload);
    yield put(getFilesRoutine.success(data));
  } catch (e) {
    yield put(getFilesRoutine.failure(e));
  } finally {
    yield put(getFilesRoutine.fulfill());
  }
}

export default function* filesWatcher() {
  yield all([takeLatest(getFilesRoutine.TRIGGER, getFilesSaga)]);
}
