import React from 'react';
import { useParams } from 'react-router-dom';
import QuizList from '../components/quiz/QuizList';

const Quiz = () => {

  return (
    <div>
      <QuizList></QuizList>
    </div>
  );
};

export default Quiz;
