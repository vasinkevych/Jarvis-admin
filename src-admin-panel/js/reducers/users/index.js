import * as constants from './actions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case constants.FETCH_USERS_ERROR: {
      return { ...state, error: action.payload };
    }
    case constants.FETCH_USERS_SUCCESS: {
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
}
