import React, { useContext } from 'react';
import NotificationContext from '../context/alert/notificationContext';
import { Notification } from './Notification';
import '../styles/Notification.css';

export const NotificationContainer = () => {
  const { alerts, removeNotification } = useContext(NotificationContext);
  return (
    <div className={'notification__container'}>
      {alerts.map(alert => (
        <Notification
          {...alert}
          hideNotification={removeNotification}
          key={alert.id}
        />
      ))}
    </div>
  );
};
