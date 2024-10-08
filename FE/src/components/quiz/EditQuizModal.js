import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Button from '../../styles/Button';

// Define styled components
const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
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

// Refactored EditQuiz component
const EditQuizModal = ({ isOpen, onClose, quizData, onUpdateQuiz }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (quizData) {
      setTitle(quizData.title);
      setDescription(quizData.description);
    }
  }, [quizData]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedQuizData = { title, description };
    try {
      await onUpdateQuiz(quizData._id, updatedQuizData); // Calls the passed prop to update the quiz
      onClose(); // Close modal after submission
    } catch (error) {
      console.error('Failed to update quiz', error);
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Quiz Modal"
      ariaHideApp={false}
    >
      <h2>Edit Quiz</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
        />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Quiz Description"
        />
        <ButtonGroup>
          <Button type="submit" variant="confirm">Update Quiz</Button>
          <Button onClick={onClose} variant="delete" style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </ButtonGroup>
      </form>
    </StyledModal>
  );
};

export default EditQuizModal;
