import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import notificationReducer from './notificationReducer';
import NotificationContext from './notificationContext';
import { ADD_ALERT, REMOVE_ALERT } from '../types';

export const NotificationState = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    alerts: []
  });

  const addNotification = (type, text) => {
    dispatch({
      type: ADD_ALERT,
      payload: {
        type,
        text,
        id: Date.now()
      }
    });
  };

  const removeNotification = ({ id }) => {
    dispatch({
      type: REMOVE_ALERT,
      payload: {
        id
      }
    });
  };

  const notifySuccess = text => {
    dispatch({
      type: ADD_ALERT,
      payload: {
        type: 'success',
        text,
        id: Date.now()
      }
    });
  };

  const notifyError = text => {
    dispatch({
      type: ADD_ALERT,
      payload: {
        type: 'error',
        text,
        id: Date.now()
      }
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        removeNotification,
        notifySuccess,
        notifyError,
        alerts: state.alerts
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationState.propTypes = {
  children: PropTypes.element
};
