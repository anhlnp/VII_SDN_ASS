import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { updateQuestion } from '../../services/api';
import Button from '../../styles/Button';
// Styled components for modal and form
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

const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;


const EditQuestion = ({ question, onQuestionUpdated, isOpen, toggleModal }) => {
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState(question.options);
  const [keywords, setKeywords] = useState(question.keywords.join(', '));
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(question.correctAnswerIndex);

  // Function to handle option changes
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
      keywords: keywords.split(',').map(kw => kw.trim()), 
      correctAnswerIndex 
    };

    try {
      await updateQuestion(question._id, questionData);
      onQuestionUpdated(); // Refresh the question list
      toggleModal(); // Close modal
    } catch (error) {
      console.error('Failed to update question', error);
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="Edit Question Modal"
      ariaHideApp={false}
    >
      <h2>Edit Question</h2>
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

        <Button type="submit" variant='confirm'>Update Question</Button>
        <Button type="button" onClick={toggleModal} style={{ marginLeft: '10px' }} variant='cancel'>
          Cancel
        </Button>
      </form>
    </StyledModal>
  );
};

export default EditQuestion;
