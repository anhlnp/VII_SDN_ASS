import axios from "axios";

// const API_URL = 'https://vii-sdn-ass.onrender.com';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'; // Replace with your server URL

// Quizzes API
export const getQuizzes = () => axios.get(`${API_URL}/quizzes`);
export const getQuiz = (quizId) => axios.get(`${API_URL}/quizzes/${quizId}`);
export const createQuiz = (quizData) =>
  axios.post(`${API_URL}/quizzes`, quizData);
export const updateQuiz = (quizId, quizData) => 
    axios.put(`${API_URL}/quizzes/${quizId}`, quizData);  
export const deleteQuiz = (quizId) =>
  axios.delete(`${API_URL}/quizzes/${quizId}`);

// Questions API
export const getQuestions = () => axios.get(`${API_URL}/questions`);
export const createQuestion = (quizId, questionData) =>
  axios.post(`${API_URL}/quizzes/${quizId}/question`, questionData);
export const deleteQuestion = (questionId) =>
  axios.delete(`${API_URL}/questions/${questionId}`);
export const updateQuestion = (questionId, questionData) =>
  axios.put(`${API_URL}/questions/${questionId}`, questionData);
