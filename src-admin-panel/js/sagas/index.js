import {
  watchFetchMigrations,
  watchMigrationsUp,
  watchMigrationsDown,
  watchMigrationsDownOne
} from './migrations.saga';
import { fork } from 'redux-saga/effects';
import { watchExecuteSql } from './mysql.saga';

export default function * rootSaga() {
  yield fork(watchFetchMigrations);
  yield fork(watchMigrationsUp);
  yield fork(watchMigrationsDown);
  yield fork(watchMigrationsDownOne);
  yield fork(watchExecuteSql);
}
