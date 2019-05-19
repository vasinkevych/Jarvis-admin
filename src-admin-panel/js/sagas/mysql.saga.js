import { put, takeEvery, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { getBaseUrl } from '../constants';

function* executeSql(action) {
  try {
    const baseUrl = getBaseUrl();
    const data = yield call(
      axios.get,
      `${baseUrl}/admin/api/execute-sql?query=${action.payload}`
    );
    yield put({ type: 'EXECUTE_SQL_SUCCESS', payload: data.data });
  } catch (error) {
    yield put({ type: 'EXECUTE_SQL_FULFILLED', payload: error });
  }
}

export function* watchExecuteSql() {
  yield takeEvery('EXECUTE_SQL', executeSql);
}
