import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  createQuiz,
  getQuizzes,
  deleteQuiz,
  updateQuiz,
} from "../../services/api";
import Button from "../../styles/Button";
import ConfirmDelete from "../ConfirmDelete";
import ModalCreateEditQuiz from "./ModalCreateEditQuiz"; // Import the CombinedModal

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
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

  // Handle Add Quiz
  const handleAddQuizClick = () => {
    setSelectedQuiz(null);
    setModalTitle("Create New Quiz");
    setModalAction("create");
    setIsModalOpen(true);
  };

  // Handle Edit Quiz
  const handleEditQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setModalTitle("Edit Quiz");
    setModalAction("edit");
    setIsModalOpen(true);
  };

  // Handle Delete Quiz
  const handleDeleteQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setIsDeleteModalOpen(true);
  };

  // Submit handler for Add/Edit
  const handleSubmit = async (data) => {
    try {
      if (modalAction === "create") {
        await createQuiz(data);
      } else if (modalAction === "edit") {
        await updateQuiz(selectedQuiz._id, data);
      }
      fetchQuizzes();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save quiz", error);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    try {
      await deleteQuiz(selectedQuiz._id);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== selectedQuiz._id));
    } catch (error) {
      console.error("Failed to delete quiz", error);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <Container>
      <Title>Quiz List</Title>
      <Button onClick={handleAddQuizClick} variant="submit">
        Add Quiz
      </Button>
      <ul>
        {quizzes.map((quiz) => (
          <QuizItem key={quiz._id}>
            <QuizTitle>{quiz.title}</QuizTitle>
            <QuizDescription>{quiz.description}</QuizDescription>
            <ButtonGroup>
              <Button onClick={() => handleEditQuizClick(quiz)}>Edit</Button>
              <Button
                onClick={() => handleDeleteQuizClick(quiz)}
                variant="delete"
              >
                Delete
              </Button>
              <Button
                onClick={() => navigate(`/quizzes/${quiz._id}`)}
                variant="confirm"
              >
                View Details
              </Button>
            </ButtonGroup>
          </QuizItem>
        ))}
      </ul>

      {/* Combined Modal for Add/Edit Quiz */}
      <ModalCreateEditQuiz
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        title={modalTitle}
        fields={[
          { name: "title", type: "text", placeholder: "Quiz Title" },
          { name: "description", type: "textarea", placeholder: "Quiz Description" },
        ]}
        values={selectedQuiz}
        submitButtonText={modalAction === "create" ? "Create Quiz" : "Update Quiz"}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete <strong>${selectedQuiz?.title}</strong>?`}
      />
    </Container>
  );
};

export default QuizList;
