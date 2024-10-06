const express = require('express');
const Question = require('../modles/Question'); // Ensure this is the correct path
const router = express.Router();

// GET /questions - Fetch all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
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
        // Create a new question
        const newQuestion = new Question({
            text,
            options,
            keywords: keywords || [], // Set an empty array if keywords are not provided
            correctAnswerIndex
        });

        // Save the question to the database
        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add question' });
    }
});

// DELETE /questions/:questionId - Delete a question by ID
router.delete('/:questionId', async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.questionId);
        res.status(204).send();
    } catch (error) {
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
        
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update question' });
    }
});


module.exports = router;
