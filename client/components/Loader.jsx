import React from 'react';

import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <Row className="mt-5">
      <Spinner
        animation="border"
        role="status"
        variant="secondary"
        className="mx-auto"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Row>
  );
}

export default Loader;
