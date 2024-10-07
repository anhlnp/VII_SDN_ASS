import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

// Styled container for the modal content
const ModalContent = styled.div`
  width: 500px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
`;

const CustomModal = ({ isOpen, onRequestClose, children, contentLabel }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    ariaHideApp={false}
    style={{
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
      },
    }}
    contentLabel={contentLabel}
  >
    <ModalContent>
      {children}
    </ModalContent>
  </Modal>
);

export default CustomModal;
