const express = require('express');
const Question = require('../modles/Question'); // Ensure this is the correct path
const router = express.Router();

// GET /questions - Fetch all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

// POST /questions - Add a new question
router.post('/', async (req, res) => {
    const { text, options, keywords, correctAnswerIndex } = req.body;

    // Check for missing required fields
    if (!text || !options || typeof correctAnswerIndex !== 'number') {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Check if the question already exists
        const existingQuestion = await Question.findOne({ text });
        if (existingQuestion) {
            return res.status(400).json({ error: 'Question with this text already exists' });
        }

        // Create a new question
        const newQuestion = new Question({
            text,
            options,
            keywords: keywords || [], // Set an empty array if keywords are not provided
            correctAnswerIndex,
        });

        // Save the question to the database
        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: 'Failed to add question' });
    }
});

// DELETE /questions/:questionId - Delete a question by ID
router.delete('/:questionId', async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.questionId);
        if (!deletedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ error: 'Failed to delete question' });
    }
});

// PUT /questions/:questionId - Update a question by ID
router.put('/:questionId', async (req, res) => {
    const { text, options, keywords, correctAnswerIndex } = req.body;

    // Validate the incoming data
    if (!text || !options || typeof correctAnswerIndex !== 'number') {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.questionId, 
            { text, options, keywords, correctAnswerIndex }, 
            { new: true }
        );
        
        if (!updatedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ error: 'Failed to update question' });
    }
});

module.exports = router;
