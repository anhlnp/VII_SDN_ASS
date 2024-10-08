import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, deleteQuestion } from "../../services/api";
import AddQuestionToQuiz from "../question/AddQuestionToQuiz";
import EditQuestion from "../question/EditQuestion";
import styled from "styled-components";
import Modal from "react-modal";
import Button from "../../styles/Button";
import ConfirmDelete from "../ConfirmDelete";

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
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

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

  const handleDeleteClick = (question) => {
    setCurrentQuestion(question);  // Set the question to be deleted
    setIsDeleteModalOpen(true);    // Open the delete confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteQuestion(currentQuestion._id);  // Use the correct question ID
      fetchQuiz(); // Refresh quiz details after deleting a question
    } catch (error) {
      console.error("Failed to delete question", error);
    }
    setIsDeleteModalOpen(false); // Close the confirmation modal
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (question) => {
    setCurrentQuestion(question);  // Set the current question for editing
    setIsEditModalOpen(true);      // Open the edit modal
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);     // Close the edit modal
    setEditingQuestionId(null);
  };

  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <Container>
      <Title>{quiz.title}</Title>
      <Description>{quiz.description}</Description>

      <h3>Questions</h3>
      <AddQuestionToQuiz quizId={quiz._id} onQuestionAdded={fetchQuiz} />
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
                <Button onClick={() => openEditModal(question)}>
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

      {/* Edit Question Modal */}
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
            onQuestionUpdated={() => {
              fetchQuiz(); // Refresh quiz details
              closeEditModal(); // Close modal after editing
            }}
            isOpen={isEditModalOpen}
            toggleModal={closeEditModal}
          />
        )}
      </Modal>

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
