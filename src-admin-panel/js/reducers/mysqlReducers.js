import { createSelector } from 'reselect';

export default function reducer(
  state = {
    sqlResult: '',
  },
  action
) {
  switch (action.type) {
    case 'EXECUTE_SQL': {
      return { ...state };
    }
    case 'EXECUTE_SQL_SUCCESS': {
      return { ...state, ...{ sqlResult: action.payload } };
    }
    case 'EXECUTE_SQL_FULFILLED': {
      return { ...state, ...{ sqlResult: action.payload } };
    }
  }
  return state;
}

export function executeSql(queryStr) {
  return {
    type: 'EXECUTE_SQL',
    payload: queryStr,
  };
}
