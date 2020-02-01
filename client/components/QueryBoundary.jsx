import React from 'react';
import PropTypes from 'prop-types';
import NotificationContext from '../context/alert/notificationContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  static contextType = NotificationContext;

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
    this.context.notifyError(error.message);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element
};

export default ErrorBoundary;
