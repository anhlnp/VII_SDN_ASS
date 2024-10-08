const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, // thêm unique: true
    description: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'questions' }]
  });
  
  module.exports = mongoose.model('quizzes', quizSchema);
