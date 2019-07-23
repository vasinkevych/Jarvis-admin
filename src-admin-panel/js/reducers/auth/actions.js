export const USER_PROFILE_LOADED = 'USER_PROFILE_LOADED';
export const HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK';

// constants
export const LOGIN = 'LOGIN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const login = credentials => ({
  type: LOGIN,
  payload: credentials
});

export const loginError = err => ({
  type: LOGIN_ERROR,
  payload: err
});

export const loginSuccess = ({ data }) => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export function handleAuthenticationCallback() {
  return {
    type: HANDLE_AUTHENTICATION_CALLBACK
  };
}
