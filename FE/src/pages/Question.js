import React, { useState } from 'react';
import QuestionList from '../components/question/QuestionList';

const Question = ({ quizId }) => {

  return (
    <div>
      <h2>Manage Questions for Quiz {quizId}</h2>

      <QuestionList></QuestionList>
    </div>
  );
};

export default Question;
