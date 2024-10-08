import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { getQuestions, deleteQuestion } from "../../services/api";
import ModalAddEditQuestion from "./ModalAddEditQuestion";
import ConfirmDelete from "../ConfirmDelete";
import Button from "../../styles/Button";

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
  justify-content: flex-end;
`;


const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    try {
      const response = await getQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };
 

  const handleEditQuestion = (question) => {
    setIsEditMode(true);
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (question) => {
    setCurrentQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteQuestion(currentQuestion._id);
      setQuestions(
        questions.filter((question) => question._id !== currentQuestion._id)
      );
    } catch (error) {
      console.error("Failed to delete question", error);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Container>
      <Title>Questions</Title>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question._id}>
            <QuestionText>{question.text}</QuestionText>
            <ButtonGroup>
              <Button onClick={() => handleEditQuestion(question)}>Edit</Button>
              <Button
                onClick={() => handleDeleteClick(question)}
                variant="delete"
              >
                Delete
              </Button>
            </ButtonGroup>
          </QuestionItem>
        ))}
      </ul>
      <ModalAddEditQuestion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditMode={isEditMode}
        question={currentQuestion}
        onQuestionUpdated={fetchQuestions}
      />
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete <strong>${currentQuestion?.text}</strong>?`}
      />
    </Container>
  );
};

export default QuestionList;
