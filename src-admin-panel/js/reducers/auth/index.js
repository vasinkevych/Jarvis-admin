import { LOGIN_ERROR, LOGIN_SUCCESS } from './actions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        err: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        err: action.payload
      };
    default:
      return state;
  }
}
