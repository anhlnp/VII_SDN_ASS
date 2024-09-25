const express = require('express');
const Question = require('../modles/Question');
const router = express.Router();

// GET /questions
router.get('/', async (req, res) => {
    const questions = await Question.find();
    res.json(questions);
});

// DELETE /questions/:questionId
router.delete('/:questionId', async (req, res) => {
    await Question.findByIdAndDelete(req.params.questionId);
    res.status(204).send();
});

module.exports = router;
