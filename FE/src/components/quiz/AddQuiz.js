import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { createQuiz } from '../../services/api';

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

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = { title, description };
    try {
      await createQuiz(quizData);
      // Optionally close the modal after submission
      setIsOpen(false);
      // Clear form
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add quiz', error);
    }
  };

  // Function to open and close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to open the modal */}
      <StyledButton onClick={toggleModal}>Create New Quiz</StyledButton>

      {/* Modal Component */}
      <StyledModal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Quiz Modal"
        ariaHideApp={false}
      >
        <h2>Create New Quiz</h2>
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
          <StyledButton type="submit">Add Quiz</StyledButton>
          <StyledButton type="button" onClick={toggleModal} style={{ marginLeft: '10px' }}>
            Cancel
          </StyledButton>
        </form>
      </StyledModal>
    </>
  );
};

export default AddQuiz;
