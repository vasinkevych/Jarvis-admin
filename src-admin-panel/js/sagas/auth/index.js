import { takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN, loginError, loginSuccess } from '../../reducers/auth/actions';
import { login } from './auth.api';

// export function* parseHash() {
//   const user = yield call(handleAuthentication);
//   yield put({ type: USER_PROFILE_LOADED, user });
// }

export function* doLogin({ payload }) {
  try {
    const user = yield call(login, payload);
    yield put(loginSuccess(user));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* watchAuthentication() {
  yield takeLatest(LOGIN, doLogin);
}
