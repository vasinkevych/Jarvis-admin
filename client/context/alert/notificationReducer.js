import { ADD_ALERT, REMOVE_ALERT } from '../types';

const handlers = {
  [ADD_ALERT]: (state, payload) => ({
    ...state,
    alerts: [...state.alerts, payload]
  }),
  [REMOVE_ALERT]: (state, payload) => ({
    ...state,
    alerts: state.alerts.filter(alert => alert.id !== payload.id)
  }),
  DEFAULT: state => state
};

const notificationReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action.payload);
};

export default notificationReducer;
