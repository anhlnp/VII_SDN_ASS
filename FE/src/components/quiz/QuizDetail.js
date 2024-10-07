import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuiz, deleteQuestion } from "../../services/api";
import AddQuestionToQuiz from "../question/AddQuestionToQuiz";
import EditQuestion from "../question/EditQuestion";
import styled from "styled-components";
import Modal from "react-modal";
import Button from "../../styles/Button";
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
  list-style-type: space-counter;
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage modal visibility
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

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestion(questionId);
      fetchQuiz(); // Refresh quiz details after deleting a question
    } catch (error) {
      console.error("Failed to delete question", error);
    }
  };

  const openEditModal = (question) => {
    setCurrentQuestion(question);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingQuestionId(null);
  };

  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <Container>
      <Title>{quiz.title}</Title>
      <Description>{quiz.description}</Description>

      <h3>Questions</h3>
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
                  onClick={() => handleDeleteQuestion(question._id)}
                  variant="delete"
                >
                  Delete
                </Button>
              </ButtonGroup>
            </QuestionItem>
          ))}
        </QuestionList>
      )}

      <AddQuestionToQuiz quizId={quiz._id} onQuestionAdded={fetchQuiz} />

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
    </Container>
  );
};

export default QuizDetail;
