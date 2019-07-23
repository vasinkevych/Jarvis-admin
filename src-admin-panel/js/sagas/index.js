import {
  watchFetchMigrations,
  watchMigrationsUp,
  watchMigrationsDown,
  watchMigrationsDownOne
} from './migrations.saga';
import { fork } from 'redux-saga/effects';
import { watchExecuteSql } from './mysql.saga';
import { watchFetchUsers } from './users';
import { watchAuthentication } from './auth';

export default function* rootSaga() {
  yield fork(watchFetchMigrations);
  yield fork(watchMigrationsUp);
  yield fork(watchMigrationsDown);
  yield fork(watchMigrationsDownOne);
  yield fork(watchExecuteSql);
  yield fork(watchFetchUsers);
  yield fork(watchAuthentication);
}
