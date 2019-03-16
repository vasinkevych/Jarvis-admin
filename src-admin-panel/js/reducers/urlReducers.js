import {createSelector} from 'reselect';

const initialState = {
  baseUrl: `http://${location.hostname}${(location.port ? ':3000' : '')}`
};

export default function reducer(state = initialState, action) {
  return state;
}

export const urlStateSelector = (state) => state.url;

export const urlSelector = createSelector(
  urlStateSelector,
  (urlState) => urlState.baseUrl
);
