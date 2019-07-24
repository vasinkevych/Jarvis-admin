import { createSelector } from 'reselect';

export const getAuth = state => state.auth;

export const getAuthError = createSelector(
  getAuth,
  auth => auth && auth.err
);

export const getAuthErrorDescription = createSelector(
  getAuthError,
  error => error && error.description
);
