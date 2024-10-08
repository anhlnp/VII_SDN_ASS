import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Button from '../../styles/Button';

// Define styled components
const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  width: 100%;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

// Combined Modal Component
const ModalCreateEditQuiz = ({ isOpen, onClose, onSubmit, fields, values, title, submitButtonText }) => {
  const [formValues, setFormValues] = useState(values || {});

  useEffect(() => {
    if (values) {
      setFormValues(values);
    }
  }, [values]);

  const handleChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formValues);
    onClose();
  };

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            {field.type === 'textarea' ? (
              <TextArea
                value={formValues[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
              />
            ) : (
              <Input
                type={field.type}
                value={formValues[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
        <ButtonGroup>
          <Button type="submit" variant="confirm">
            {submitButtonText || 'Submit'}
          </Button>
          <Button onClick={onClose} variant="delete" style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </StyledModal>
  );
};

export default ModalCreateEditQuiz;
