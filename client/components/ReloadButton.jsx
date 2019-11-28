import React, { Fragment, useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import ConfirmModal from './ConfirmModal';
import PropTypes from 'prop-types';

function ReloadButton({ title, onAsyncReload }) {
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (isLoading) {
      onAsyncReload().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Fragment>
      <Button variant="light" disabled={isLoading} onClick={showModal}>
        {isLoading ? 'Loading…' : title}
      </Button>
      <ConfirmModal
        bodyText={'Do you want to reload users? Its limited function!'}
        showModal={show}
        handleModal={!isLoading ? showModal : null}
        confirmModal={handleClick}
      />
    </Fragment>
  );
}

ReloadButton.propTypes = {
  title: PropTypes.string,
  onAsyncReload: PropTypes.func
};

export default ReloadButton;
