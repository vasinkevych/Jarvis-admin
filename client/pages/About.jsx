import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About() {
  return (
    <Row className="mt-12">
      <Col>
        <h1>About Jarvis</h1>

        <p>Find car's owner and unlock your car ASAP</p>
        <p>Find car's owner by scanning a car number</p>
        <p>Find car's owner by manual entering a car number</p>
      </Col>
    </Row>
  );
}

export default About;
