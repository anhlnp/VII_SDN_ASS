import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Button from '../styles/Button';

// Styled components
const ModalContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;

  strong {
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ConfirmDelete = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Delete"
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
    <ModalContainer
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Delete Modal"
      ariaHideApp={false}
    >
      <Message dangerouslySetInnerHTML={{ __html: message || 'Are you sure you want to delete this item?' }} ></Message>
      <ButtonGroup>
        <Button variant="confirm" onClick={onConfirm}>Confirm</Button>
        <Button variant="cancel" onClick={onClose}>Cancel</Button>
      </ButtonGroup>
    </ModalContainer>
    </Modal>
  );
};

export default ConfirmDelete;
