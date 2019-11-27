import React, { useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/Notification.css';

export const Notification = ({ type, text, id, hideNotification }) => {
  useEffect(() => {
    setTimeout(() => hideNotification({ id }), 6000);
  }, []);

  return (
    <Toast
      show={true}
      onClose={hideNotification.bind(null, { id })}
      className={'notification__item'}
    >
      <Toast.Header>
        <strong className={`mr-auto`}>{type.toUpperCase()}</strong>
      </Toast.Header>
      <Toast.Body className={`notification__item_${type}`}>{text}</Toast.Body>
    </Toast>
  );
};

Notification.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  hideNotification: PropTypes.func,
  id: PropTypes.number
};
