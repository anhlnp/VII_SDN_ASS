import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import {
  createQuiz,
  getQuizzes,
  deleteQuiz,
  updateQuiz,
} from "../../services/api";
import Button from "../../styles/Button";
import ConfirmDelete from "../ConfirmDelete";
import EditQuizModal from "./EditQuizModal";
import AddQuiz from "./AddQuiz";
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

const QuizItem = styled.li`
  list-style-type: none;
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const QuizTitle = styled.h3`
  margin: 0 0 10px;
`;

const QuizDescription = styled.p`
  margin: 10px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

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

Modal.setAppElement("#root");

const QuizList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await getQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error("Failed to fetch quizzes", error);
    }
  };

  const handleAddQuiz = async (quizData) => {
    try {
      await createQuiz(quizData);
      fetchQuizzes(); // Refresh the quiz list after adding
    } catch (error) {
      console.error("Failed to add quiz", error);
    }
  };

  const handleUpdateQuiz = async (quizId, updatedQuizData) => {
    try {
      await updateQuiz(quizId, updatedQuizData);
      fetchQuizzes(); // Refresh the quiz list after updating
    } catch (error) {
      console.error("Failed to update quiz", error);
    }
  };

  const handleEditClick = (quiz) => {
    setCurrentQuiz(quiz);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (quiz) => {
    setCurrentQuizId(quiz._id);
    setCurrentQuiz(quiz); // Store the current quiz for title reference
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteQuiz(currentQuizId);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== currentQuizId));
    } catch (error) {
      console.error("Failed to delete quiz", error);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };


  return (
    <Container>
      <Title>Quiz List</Title>
      <Button onClick={() => setIsModalOpen(true)} variant="submit">
        Add Quiz
      </Button>
      <ul>
        {quizzes.map((quiz) => (
          <QuizItem key={quiz._id}>
            <QuizTitle>{quiz.title}</QuizTitle>
            <QuizDescription>{quiz.description}</QuizDescription>
            <Button onClick={() => handleEditClick(quiz)}>Edit</Button>
            <Button onClick={() => handleDeleteClick(quiz)} variant="delete">
              Delete
            </Button>
            <Button
              onClick={() => navigate(`/quizzes/${quiz._id}`)}
              variant="confirm"
            >
              View Details
            </Button>
          </QuizItem>
        ))}
      </ul>

      {/* Add Quiz Modal */}
      <AddQuiz
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddQuiz={handleAddQuiz}
      />

       {/* Edit Quiz Modal */}
       {setCurrentQuiz && (
        <EditQuizModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          quizData={currentQuiz}
          onUpdateQuiz={handleUpdateQuiz}
        />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete <strong>${currentQuiz?.title}</strong>?`}
      />
    </Container>
  );
};

export default QuizList;
