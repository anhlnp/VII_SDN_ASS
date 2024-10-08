const express = require('express');
const Quiz = require('../modles/Quiz');
const Question = require('../modles/Question');
const router = express.Router();

// GET /quizzes - Fetch all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        console.log("Fetched quizzes:", quizzes);
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

// POST /quizzes - Create a new quiz (with duplicate title check)
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Check if a quiz with the same title already exists
        const existingQuiz = await Quiz.findOne({ title });
        if (existingQuiz) {
            return res.status(400).json({ error: 'Quiz with this title already exists' });
        }

        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Failed to create quiz' });
    }
});

// GET /quizzes/:quizId - Fetch a specific quiz by ID
router.get('/:quizId', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId).populate('questions');
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
});

// DELETE /quizzes/:quizId - Delete a quiz by ID
router.delete('/:quizId', async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.quizId);
        if (!deletedQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ error: 'Failed to delete quiz' });
    }
});

// POST /quizzes/:quizId/question - Add a question to a specific quiz
router.post('/:quizId/question', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const question = new Question(req.body);
        await question.save();

        quiz.questions.push(question._id);
        await quiz.save();

        res.status(201).json(question);
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: 'Failed to add question' });
    }
});

// PUT /quizzes/:quizId - Update a quiz by ID
router.put('/:quizId', async (req, res) => {
    const { title, description } = req.body;

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
        console.error('Error updating quiz:', error);
        res.status(500).json({ error: 'Failed to update quiz' });
    }
});

module.exports = router;
