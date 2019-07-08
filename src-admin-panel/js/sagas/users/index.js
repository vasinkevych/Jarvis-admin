import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { getBaseUrl, API } from '../../constants';
import * as actions from '../../reducers/users/actions';

function* doFetchUsers() {
  try {
    const data = yield call(axios.get, `${getBaseUrl()}${API.USERS}`);
    yield put(actions.fetchUsersSuccess(data));
  } catch (error) {
    yield put(actions.fetchUsersError(error));
  }
}

export function* watchFetchUsers() {
  yield takeLatest(actions.FETCH_USERS, doFetchUsers);
}
