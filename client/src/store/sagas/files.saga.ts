import {
  all,
  call,
  put,
  CallEffect,
  PutEffect,
  takeLatest,
} from "@redux-saga/core/effects";
import { createFolderRoutine, getFilesRoutine, IFile } from "../fileSlice";
import { createDir, getFiles } from "../../api/files";

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

export function* createFolderSaga(
  action: ReturnType<typeof createFolderRoutine.trigger>
): Generator<CallEffect | PutEffect> {
  try {
    yield put(createFolderRoutine.request());
    const data = yield call(createDir, action.payload);
    yield put(createFolderRoutine.success(data));
  } catch (e) {
    yield put(createFolderRoutine.failure(e));
  } finally {
    yield put(createFolderRoutine.fulfill());
  }
}

export default function* filesWatcher() {
  yield all([
    takeLatest(getFilesRoutine.TRIGGER, getFilesSaga),
    takeLatest(createFolderRoutine.TRIGGER, createFolderSaga),
  ]);
}
