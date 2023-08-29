import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalConfirmation({ show, handleModalClose ,id,handleConfirm}) {

  const handleConfirme = async (userId) => {
    handleConfirm(userId)
    handleModalClose()
  };

  return (
    <Modal show={show} onHide={handleModalClose} className='p-1'>
      <Modal.Header closeButton className='p-1'>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-0'>
        <p>Êtes-vous sûr de vouloir effectuer cette action ?</p>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between p-0' >
        <Button variant="secondary" onClick={handleModalClose}>
          Annuler
        </Button>
        <Button variant="danger" onClick={()=>handleConfirme(id)}>
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmation;
