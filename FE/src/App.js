import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Question from './pages/Question';
import QuizDetail from './components/quiz/QuizDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes/" element={<Quiz />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/quizzes/:id" element={<QuizDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
