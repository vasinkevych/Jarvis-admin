import { put, takeEvery, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { getBaseUrl } from '../constants';

function * fetchMigrations() {
  try {
    const baseUrl = getBaseUrl();
    const data = yield call(axios.get, `${baseUrl}/admin/api/migrations`);
    yield put({ type: 'FETCH_MIGRATIONS_SUCCESS', payload: data.data });
  } catch (error) {
    yield put({ type: 'FETCH_MIGRATIONS_FULFILLED', payload: error });
  }
}

function * migrationsUp() {
  try {
    const baseUrl = getBaseUrl();
    const data = yield call(axios.get, `${baseUrl}/admin/api/up-migrations`);
    yield put({ type: 'MIGRATIONS_UP_SUCCESS', payload: data.data });
    yield put({ type: 'FETCH_MIGRATIONS' });
  } catch (error) {
    yield put({ type: 'MIGRATIONS_UP_FULFILLED', payload: error });
  }
}

function * migrationsDown() {
  try {
    const baseUrl = getBaseUrl();
    const data = yield call(axios.get, `${baseUrl}/admin/api/down-migrations`);
    yield put({ type: 'MIGRATIONS_DOWN_SUCCESS', payload: data.data });
    yield put({ type: 'FETCH_MIGRATIONS' });
  } catch (error) {
    yield put({ type: 'MIGRATIONS_DOWN_FULFILLED', payload: error });
  }
}

function * migrationsDownOne() {
  try {
    const baseUrl = getBaseUrl();
    const data = yield call(axios.get, `${baseUrl}/admin/api/down-migrations-one`);
    yield put({ type: 'MIGRATIONS_DOWN_SUCCESS', payload: data.data });
    yield put({ type: 'FETCH_MIGRATIONS' });
  } catch (error) {
    yield put({ type: 'MIGRATIONS_DOWN_FULFILLED', payload: error });
  }
}

export function * watchFetchMigrations() {
  yield takeEvery('FETCH_MIGRATIONS', fetchMigrations);
}

export function * watchMigrationsUp() {
  yield takeEvery('MIGRATIONS_UP', migrationsUp);
}

export function * watchMigrationsDown() {
  yield takeEvery('MIGRATIONS_DOWN', migrationsDown);
}

export function * watchMigrationsDownOne() {
  yield takeEvery('MIGRATIONS_DOWN_ONE', migrationsDownOne);
}
