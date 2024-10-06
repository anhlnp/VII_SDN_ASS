import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from "react-modal";
import { getQuestions, deleteQuestion } from '../../services/api';
import EditQuestion from './EditQuestion';

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const QuestionItem = styled.li`
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const QuestionText = styled.span`
  font-size: 1.2em;
  display: block;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage modal visibility
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch questions', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (questionId) => {
    try {
      await deleteQuestion(questionId);
      setQuestions(questions.filter(question => question._id !== questionId));
    } catch (error) {
      console.error('Failed to delete question', error);
    }
  };

  const openEditModal = (question) => {
    setCurrentQuestion(question);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleQuestionUpdated = () => {
    // Refresh the questions list after updating a question
    const fetchUpdatedQuestions = async () => {
      try {
        const response = await getQuestions();
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch updated questions', error);
      }
    };
    fetchUpdatedQuestions();
    closeEditModal();
  };

  return (
    <Container>
      <Title>Questions</Title>
      {/* <StyledButton onClick={() => >Add Question</StyledButton> */}
      <ul>
        {questions.map(question => (
          <QuestionItem key={question._id}>
            <QuestionText>{question.text}</QuestionText>
            <ButtonGroup>
              {/* <StyledButton onClick={() => openEditModal(question)}>Edit</StyledButton> */}
              <StyledButton onClick={() => handleDelete(question._id)}>Delete</StyledButton>
            </ButtonGroup>
          </QuestionItem>
        ))}
      </ul>
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Question"
        ariaHideApp={false}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "500px",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        {currentQuestion && (
          <EditQuestion
            question={currentQuestion}
            onQuestionUpdated={handleQuestionUpdated}
          />
        )}
      </Modal>
    </Container>
  );
};

export default QuestionList;
