import { all, fork } from '@redux-saga/core/effects';
import authWatcher from "./auth.saga";

export default function* rootSaga() {
    yield all([fork(authWatcher)]);
}
