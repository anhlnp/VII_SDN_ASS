import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Question from './pages/Question';
import QuizDetail from './components/quiz/QuizDetail';
import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <Router>
      <GlobalStyle /> {/* Apply global styles */}
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes" element={<Quiz />} />
          <Route path="/questions" element={<Question />} />
          <Route path="/quizzes/:id" element={<QuizDetail />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
