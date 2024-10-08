import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { getQuestions, deleteQuestion } from '../../services/api';
import EditQuestion from './EditQuestion';
import ConfirmDelete from '../ConfirmDelete';
import Button from '../../styles/Button';

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
  gap: 10px;
`;

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleDeleteClick = (question) => {
    setCurrentQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteQuestion(currentQuestion._id);
      setQuestions(questions.filter(question => question._id !== currentQuestion._id));
    } catch (error) {
      console.error('Failed to delete question', error);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (question) => {
    setCurrentQuestion(question);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleQuestionUpdated = () => {
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
      <ul>
        {questions.map(question => (
          <QuestionItem key={question._id}>
            <QuestionText>{question.text}</QuestionText>
            <ButtonGroup>
              <Button onClick={() => openEditModal(question)}>Edit</Button>
              <Button onClick={() => handleDeleteClick(question)} variant='delete'>Delete</Button>
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
            isOpen={isEditModalOpen}
            toggleModal={closeEditModal}
          />
        )}
      </Modal>
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
