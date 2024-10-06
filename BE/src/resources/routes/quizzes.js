const express = require('express');
const Quiz = require('../modles/Quiz');
const Question = require('../modles/Question');
const router = express.Router();

// GET /quizzes
router.get('/', async (req, res) => {
    const quizzes = await Quiz.find().populate('questions');
    console.log("Fetched quizzes:", quizzes);
    res.json(quizzes);
});

// POST /quizzes
router.post('/', async (req, res) => {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
});

// GET /quizzes/:quizId
router.get('/:quizId', async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');
    res.json(quiz);
});

// DELETE /quizzes/:quizId
router.delete('/:quizId', async (req, res) => {
    await Quiz.findByIdAndDelete(req.params.quizId);
    res.status(204).send();
});

// POST /quizzes/:quizId/question
router.post('/:quizId/question', async (req, res) => {
    const question = new Question(req.body);
    await question.save();
    await Quiz.findByIdAndUpdate(req.params.quizId, { $push: { questions: question._id } });
    res.status(201).json(question);
});

// PUT /quizzes/:quizId - Update a quiz by ID
router.put('/:quizId', async (req, res) => {
    const { title, description } = req.body;

    // Validate the incoming data
    if (!title || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.quizId, 
            { title, description }, 
            { new: true }
        );
        
        if (!updatedQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update quiz' });
    }
});


module.exports = router;
