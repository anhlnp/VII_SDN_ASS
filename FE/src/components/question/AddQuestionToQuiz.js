import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { createQuestion } from '../../services/api';

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

const AddQuestionToQuiz = ({ quizId, onQuestionAdded }) => {
  const [text, setText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // Start with four empty options
  const [keywords, setKeywords] = useState(''); // Stores keywords as a comma-separated string
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle option change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionData = { 
      text, 
      options, 
      keywords: keywords.split(',').map(kw => kw.trim()), // Convert comma-separated string to array
      correctAnswerIndex 
    };

    try {
      const response = await createQuestion(quizId, questionData); // Pass quizId to the function
      onQuestionAdded(); // Refresh quiz details
      // Clear form fields after adding the question
      setText('');
      setOptions(['', '', '', '']);
      setKeywords('');
      setCorrectAnswerIndex(0);
      setIsOpen(false); // Close modal after submission
    } catch (error) {
      console.error('Failed to add question', error);
    }
  };

  // Function to open/close modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to open the modal */}
      <StyledButton onClick={toggleModal}>Add New Question</StyledButton>

      {/* Modal Component */}
      <StyledModal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Question Modal"
        ariaHideApp={false}
      >
        <h2>Create New Question</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Question Text:
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the question"
            />
          </label>

          <h4>Options</h4>
          {options.map((option, index) => (
            <label key={index}>
              Option {index + 1}:
              <Input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            </label>
          ))}

          <label>
            Correct Answer:
            <select
              value={correctAnswerIndex}
              onChange={(e) => setCorrectAnswerIndex(parseInt(e.target.value))}
            >
              {options.map((_, index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </label>

          <label>
            Keywords (comma-separated):
            <Input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords (e.g., keyword1, keyword2)"
            />
          </label>

          <StyledButton type="submit">Add Question</StyledButton>
          <StyledButton type="button" onClick={toggleModal} style={{ marginLeft: '10px' }}>
            Cancel
          </StyledButton>
        </form>
      </StyledModal>
    </>
  );
};

export default AddQuestionToQuiz;
