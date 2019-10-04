import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const QueryModal = props => {
  const handleClose = () => props.handleModal(false);
  const handleAccept = () => {
    props.createTable();
    props.handleModal(false);
  };

  return (
    <Modal show={props.showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm your request</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{props.userQuery}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Decline
        </Button>
        <Button variant="primary" onClick={handleAccept}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

QueryModal.propTypes = {
  userQuery: PropTypes.string,
  showModal: PropTypes.bool,
  handleModal: PropTypes.func,
  createTable: PropTypes.func
};

export default QueryModal;
