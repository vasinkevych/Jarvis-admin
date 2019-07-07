// constants
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

export const fetchUsers = () => ({
  type: 'FETCH_USERS'
});

export const fetchUsersError = err => ({
  type: FETCH_USERS_ERROR,
  payload: err
});

export const fetchUsersSuccess = ({ data }) => ({
  type: FETCH_USERS_SUCCESS,
  payload: data
});
