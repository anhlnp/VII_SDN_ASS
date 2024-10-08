import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../styles/Button';
// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3em;
  color: #333;
  margin-bottom: 30px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 15px 25px;
  margin: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Home Page</Title>
      
      {/* Button to navigate to the Quiz Page */}
      <Button onClick={() => navigate('/quizzes')}>
        Go to Quizzes
      </Button>

      {/* Button to navigate to the Question Page */}
      <Button onClick={() => navigate('/questions')}>
        Go to Questions
      </Button>
    </Container>
  );
};

export default Home;
