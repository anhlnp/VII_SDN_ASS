import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { createQuestion } from '../../services/api';
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
  padding: 30px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  max-height: 80vh;
  overflow-y: auto;

  h2 {
    margin-bottom: 20px;
    font-size: 1.8em;
    color: #333;
    text-align: center;
  }
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  font-size: 1em;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Select = styled.select`
  margin-bottom: 15px;
  padding: 12px;
  font-size: 1em;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 8px;
  color: #555;
  display: block;
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
      await createQuestion(quizId, questionData); // Pass quizId to the function
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
      <Button onClick={toggleModal} variant="submit">Add New Question</Button>

      {/* Modal Component */}
      <StyledModal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Question Modal"
        ariaHideApp={false}
      >
        <h2>Create New Question</h2>
        <form onSubmit={handleSubmit}>
          <Label>Question Text:</Label>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the question"
          />

          <h4>Options</h4>
          {options.map((option, index) => (
            <div key={index}>
              <Label>Option {index + 1}:</Label>
              <Input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            </div>
          ))}

          <Label>Correct Answer:</Label>
          <Select
            value={correctAnswerIndex}
            onChange={(e) => setCorrectAnswerIndex(parseInt(e.target.value))}
          >
            {options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </Select>

          <Label>Keywords (comma-separated):</Label>
          <Input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Enter keywords (e.g., keyword1, keyword2)"
          />

          <Button type="submit" variant="confirm">Add Question</Button>
          <Button type="button" onClick={toggleModal} variant='delete'>
            Cancel
          </Button>
        </form>
      </StyledModal>
    </>
  );
};

export default AddQuestionToQuiz;
