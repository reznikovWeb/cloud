import { all, fork } from "@redux-saga/core/effects";
import authWatcher from "./auth.saga";
import filesWatcher from "./files.saga";

export default function* rootSaga() {
  yield all([fork(authWatcher), fork(filesWatcher)]);
}
