import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, deleteQuestion } from "../../services/api";
import styled from "styled-components";
import Button from "../../styles/Button";
import ConfirmDelete from "../ConfirmDelete";
import ModalAddEditQuestion from "../question/ModalAddEditQuestion";

// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const QuestionItem = styled.li`
  margin: 15px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const QuestionText = styled.h4`
  margin: 0 0 10px;
`;

const OptionList = styled.ul`
  padding-left: 20px;
  margin: 10px 0;
`;

const OptionItem = styled.li`
  margin: 5px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoadingText = styled.p`
  font-size: 1.5em;
  text-align: center;
  margin: 20px 0;
`;

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchQuiz = async () => {
    try {
      const response = await getQuiz(id);
      setQuiz(response.data);
    } catch (error) {
      console.error("Failed to fetch quiz details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const handleAddQuestion = () => {
    setIsEditMode(false);
    setCurrentQuestion(null); // Clear any existing question data
    setIsModalOpen(true);
  };

  const handleEditQuestion = (question) => {
    setIsEditMode(true);
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (question) => {
    setCurrentQuestion(question); // Set the question to be deleted
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteQuestion(currentQuestion._id); // Use the correct question ID
      fetchQuiz(); // Refresh quiz details after deleting a question
    } catch (error) {
      console.error("Failed to delete question", error);
    }
    setIsDeleteModalOpen(false); // Close the confirmation modal
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <Container>
      <Title>{quiz.title}</Title>
      <Description>{quiz.description}</Description>

      <h3>Questions</h3>
      <Button onClick={handleAddQuestion}>Add Question</Button>

      {quiz.questions.length === 0 ? (
        <p>No questions available for this quiz.</p>
      ) : (
        <QuestionList>
          {quiz.questions.map((question, index) => (
            <QuestionItem key={question._id}>
              <QuestionText>
                Question {index + 1}: {question.text}
              </QuestionText>
              <OptionList>
                {question.options.map((option, optIndex) => (
                  <OptionItem key={optIndex}>{option}</OptionItem>
                ))}
              </OptionList>
              <p>
                Correct Answer: {question.options[question.correctAnswerIndex]}
              </p>

              <ButtonGroup>
                <Button onClick={() => handleEditQuestion(question)}>
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteClick(question)}
                  variant="delete"
                >
                  Delete
                </Button>
              </ButtonGroup>
            </QuestionItem>
          ))}
        </QuestionList>
      )}

      <ModalAddEditQuestion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditMode={isEditMode}
        quizId={id}
        question={currentQuestion}
        onQuestionUpdated={fetchQuiz}
      />
      {/* Confirm Delete Modal */}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete <strong>${currentQuestion?.text}</strong>?`}
      />
    </Container>
  );
};

export default QuizDetail;
