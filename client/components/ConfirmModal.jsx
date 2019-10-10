import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ConfirmModal = ({ bodyText, showModal, handleModal, confirmModal }) => {
  const handleClose = () => handleModal(false);
  const handleAccept = () => {
    confirmModal();
    handleModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm your request</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{bodyText}</p>
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

ConfirmModal.propTypes = {
  bodyText: PropTypes.string,
  showModal: PropTypes.bool,
  handleModal: PropTypes.func,
  confirmModal: PropTypes.func
};

export default ConfirmModal;
