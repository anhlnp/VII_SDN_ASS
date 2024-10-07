import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import { createQuiz, getQuizzes, deleteQuiz, updateQuiz } from '../../services/api';
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

Modal.setAppElement('#root');

const QuizList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await getQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Failed to fetch quizzes', error);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const quizData = { title, description };
    try {
      await createQuiz(quizData);
      setIsModalOpen(false);
      fetchQuizzes();
    } catch (error) {
      console.error('Failed to add quiz', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const quizData = { title, description };
    try {
      await updateQuiz(currentQuizId, quizData);
      setIsEditModalOpen(false);
      fetchQuizzes();
    } catch (error) {
      console.error('Failed to update quiz', error);
    }
  };

  const handleDelete = async (quizId) => {
    try {
      await deleteQuiz(quizId);
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
    } catch (error) {
      console.error('Failed to delete quiz', error);
    }
  };

  const handleEditClick = (quiz) => {
    setCurrentQuizId(quiz._id);
    setTitle(quiz.title);
    setDescription(quiz.description);
    setIsEditModalOpen(true);
  };

  return (
    <Container>
      <Title>Quiz List</Title>
      <Button onClick={() => setIsModalOpen(true)} variant="submit" >Add Quiz</Button>
      <ul>
        {quizzes.map(quiz => (
          <QuizItem key={quiz._id}>
            <QuizTitle>{quiz.title}</QuizTitle>
            <QuizDescription>{quiz.description}</QuizDescription>
            <Button onClick={() => handleEditClick(quiz)}>Edit</Button>
            <Button onClick={() => handleDelete(quiz._id)} variant="delete"  >Delete</Button>
            <Button onClick={() => navigate(`/quizzes/${quiz._id}`)} variant="confirm">View Details</Button>
          </QuizItem>
        ))}
      </ul>

      {/* Create Quiz Modal */}
      <StyledModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Quiz Modal"
      >
        <h2>Add New Quiz</h2>
        <Form onSubmit={handleCreateSubmit}>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Quiz Title"
          />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Quiz Description"
          />
          <Button type="submit">Add Quiz</Button>
        </Form>
        
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </StyledModal>

      {/* Edit Quiz Modal */}
      <StyledModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Quiz Modal"
      >
        <h2>Edit Quiz</h2>
        <Form onSubmit={handleEditSubmit}>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Quiz Title"
          />
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Quiz Description"
          />
          <Button type="submit">Update Quiz</Button>
        </Form>
        <Button onClick={() => setIsEditModalOpen(false)}>Close</Button>
      </StyledModal>
    </Container>
  );
};

export default QuizList;
