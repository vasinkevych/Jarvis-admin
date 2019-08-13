import React, { useState, useEffect } from 'react';

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
      variant="dark"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Loading…' : title}
    </Button>
  );
}

export default ReloadButton;
