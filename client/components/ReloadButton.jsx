import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function ReloadButton({ title, onAsyncReload }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      onAsyncReload().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="light"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Loading…' : title}
    </Button>
  );
}

ReloadButton.propTypes = {
  title: PropTypes.string,
  onAsyncReload: PropTypes.func
};

export default ReloadButton;
